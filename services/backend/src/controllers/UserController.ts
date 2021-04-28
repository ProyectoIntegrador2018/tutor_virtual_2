import joi from "joi";
import { Service } from "typedi";
import ExcelJS from "exceljs";
import { Container } from "typeorm-typedi-extensions";
import { User } from "../entities/UserEntity";
import { Student } from "../entities/StudentEntity";
import { UserService } from "../services/UserService";
import { RoleService } from "../services/RoleService";
import { StudentService } from "../services/StudentService";
import { AllyService } from "../services/AllyService";
import { Role, UserRoleName } from "../entities/RoleEntity";
import BaseController, { IArgs } from "./BaseController";
import { ExcelFile } from "../lib/ExcelFile";
import { logger } from "../utils/logger";

@Service()
export default class UserController extends BaseController {
  userService: UserService;
  roleService: RoleService;
  studentService: StudentService;
  allyService: AllyService;

  constructor(args: IArgs) {
    super(args);
    this.userService = Container.get(UserService);
    this.roleService = Container.get(RoleService);
    this.studentService = Container.get(StudentService);
    this.allyService = Container.get(AllyService);
  }

  private async create() {
    const params = this.getParams();
    if (params.roleName === UserRoleName.SUPERADMIN) {
      logger.info("Viewer attempted to create a superadmin user!");
      return this.notAcceptable("Can't create a superadmin user!");
    }
    const role = await this.roleService.findOrCreate(params.roleName);
    const user = await this.userService.create({
      firstName: params.firstName,
      maternalName: params.maternalName,
      paternalName: params.paternalName,
      password: params.password,
      email: params.email,
      role,
    });
    logger.info(`User "${user.email}" succesfully registered!`);
    this.ok({ user });
  }

  private createParams() {
    return joi.object({
      firstName: joi.string().min(2).max(50).required(),
      paternalName: joi.string().min(2).max(50).required(),
      maternalName: joi.string().min(2).max(50).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(100).required(),
      confirmPassword: joi.any().valid(joi.ref("password")).required(),
      roleName: joi
        .string()
        .valid(...Object.keys(UserRoleName))
        .required(),
    });
  }

  private async users() {
    const params = this.getParams();
    let query = this.userService.createQueryBuilder("user");
    if (params.roleName) {
      const role = await this.roleService.findOrCreate(params.roleName);
      query = query.where("user.roleId = :roleId", { roleId: role.id });
    }
    const skip = params.page * params.pageSize;
    query = query.skip(skip);
    const take = params.pageSize;
    query = query.take(take);
    const result = await query.getMany();
    this.ok({ users: result });
  }

  private usersParams() {
    return joi.object({
      page: joi.number().min(0).required(),
      pageSize: joi.number().min(0).max(50).required(),
      roleName: joi
        .string()
        .valid(...Object.keys(UserRoleName))
        .optional(),
    });
  }

  private async handleUserAccountStatus() {
    const role = await this.cv.getRole();
    if (role !== UserRoleName.SUPERADMIN || role === null) {
      return this.forbidden(
        "Only superadmins can modify user's account status!"
      );
    }
    const params = this.getParams();

    const userRole = await this.roleService.findOrCreate(params.roleName);

    let query = this.userService.createQueryBuilder("user");
    await query
      .update(User)
      .set({
        hasAccountEnabled: params.enable,
      })
      .where("email = :email AND roleId = :roleId", {
        email: params.email,
        roleId: userRole.id,
      })
      .execute();
    const updatedUser = await this.userService.findOne({ email: params.email });
    this.ok({ user: updatedUser });
  }

  private handleUserAccountStatusParams() {
    return joi.object({
      enable: joi.boolean().required(),
      email: joi.string().email().required(),
      roleName: joi
        .string()
        .valid(...Object.keys(UserRoleName))
        .required(),
    });
  }

  private async handleSupervisorAccountStatus() {
    const role = await this.cv.getRole();
    if (role !== UserRoleName.SUPERADMIN || role === null) {
      return this.forbidden(
        "Only superadmins can modify supervisor account status!"
      );
    }
    const supervisorRole = await this.roleService.findOrCreate(
      UserRoleName.SUPERVISOR
    );
    const params = this.getParams();
    let query = this.userService.createQueryBuilder("user");
    await query
      .update(User)
      .set({
        hasAccountEnabled: params.enable,
      })
      .where("email = :email AND roleId = :roleId", {
        email: params.email,
        roleId: supervisorRole.id,
      })
      .execute();
    const updatedUser = await this.userService.findOne({ email: params.email });
    this.ok({ user: updatedUser });
  }

  private handleSupervisorAccountStatusParams() {
    return joi.object({
      enable: joi.boolean().required(),
      email: joi.string().email().required(),
    });
  }

  private async createFromExcel() {
    const excel = new ExcelFile({});
    await excel.load(this.req.file);
    const worksheets = excel.getWorksheets();
    if (worksheets.length < 2) {
      logger.info("Excel file does not have the expected format.");
      return this.notAcceptable(
        "El archivo excel no tiene el formato esperado."
      );
    }
    const userSheet = worksheets[1];
    logger.info(`Detected ${userSheet.actualRowCount - 1} user rows`);
    const userPromise: Promise<User>[] = [];
    const studentPromise: Promise<Student>[] = [];
    await userSheet.eachRow(async (row, rowNumber) => {
      // Ignore row with headers.
      if (rowNumber > 1) {
        try {
          const { student, user } = await this.parseUserExcelRow(row);
          if (student) {
            studentPromise.push(student);
          } else if (user) {
            userPromise.push(user);
          }
        } catch (err) {
          logger.error(
            "Some error happened while parsing an excel row to create a user or student"
          );
          logger.error(err);
        }
      }
    });
    logger.info(`Succesfully created ${userPromise.length} regular users`);
    logger.info(`Succesfully created ${studentPromise.length} students`);
    try {
      const students = await Promise.all(
        studentPromise.map((promise) =>
          promise.catch((err) => ({ error: true, err }))
        )
      );
      const users = await Promise.all(
        userPromise.map((promise) =>
          promise.catch((err) => ({ error: true, err }))
        )
      );
      this.ok({ users, students });
    } catch (err) {
      logger.error(
        "Some error happened while resolving student and user promised from excel creation"
      );
      logger.error("Ignoring...");
      this.serverError();
    }
  }

  private createFromExcelParams() {
    return joi.object({});
  }

  private async handleTutorAccountStatus() {
    const role = await this.cv.getRole();
    if (role !== UserRoleName.SUPERVISOR || role === null) {
      return this.forbidden(
        "Only supervisors can modify tutors account status!"
      );
    }
    const tutorRole = await this.roleService.findOrCreate(UserRoleName.TUTOR);
    const params = this.getParams();
    let query = this.userService.createQueryBuilder("user");
    await query
      .update(User)
      .set({
        hasAccountEnabled: params.enable,
      })
      .where("email = :email AND roleId = :roleId", {
        email: params.email,
        roleId: tutorRole.id,
      })
      .execute();
    const updatedUser = await this.userService.findOne({ email: params.email });
    this.ok({ user: updatedUser });
  }

  private handleTutorAccountStatusParams() {
    return joi.object({
      enable: joi.boolean().required(),
      email: joi.string().email().required(),
    });
  }

  // ========================== HELPER METHODS =================================

  private async parseUserExcelRow(row: ExcelJS.Row) {
    const columns: {
      [key: string]: string;
    } = {
      username: "A",
      password: "B",
      name: "C",
      paternalName: "D",
      maternalName: "E",
      email: "G",
      userStatus: "L",
      ally: "Y",
      country: "V",
      state: "W",
      city: "X",
    };
    const entityData: { [key: string]: string } = {};
    Object.keys(columns).forEach((key) => {
      const columnLetter = columns[key];
      let cellData = row.getCell(columnLetter).text;
      if (key === "email") {
        cellData = cellData.toLowerCase();
      }
      entityData[key] = cellData;
    });
    const roleColumn = "H";
    const role = row.getCell(roleColumn).text.toLowerCase();
    if (role === "student") {
      const student = this.createStudentFromRow(entityData);
      return {
        student,
        user: null,
      };
    } else if (role !== "designer") {
      const user = this.createUserFromRow(role, entityData);
      return {
        student: null,
        user,
      };
    }
    return {
      user: null,
      student: null,
    };
  }

  private async createStudentFromRow(entityData: { [key: string]: string }) {
    let ally = await this.allyService.findOne({ name: entityData.ally });
    if (!ally) {
      ally = await this.allyService.getDefaultAlly();
    }
    return this.studentService.create({
      name: entityData.name,
      maternal_name: entityData.maternalName,
      password: entityData.password,
      paternal_name: entityData.paternalName,
      username: entityData.username,
      email: entityData.email,
      ally: ally.id,
      country: entityData.country,
      state: entityData.state,
      city: entityData.city,
    });
  }

  private async createUserFromRow(
    role: string,
    entityData: { [key: string]: string }
  ) {
    let roleObject: Role;
    switch (role) {
      case "teacher":
        roleObject = await this.roleService.findOrCreate(UserRoleName.TUTOR);
        break;
      case "coordinador":
        roleObject = await this.roleService.findOrCreate(
          UserRoleName.SUPERVISOR
        );
        break;
      default:
        roleObject = await this.roleService.findOrCreate(UserRoleName.TUTOR);
    }
    return this.userService.create({
      username: entityData.username,
      email: entityData.email,
      firstName: entityData.name,
      paternalName: entityData.paternalName,
      maternalName: entityData.maternalName,
      password: entityData.password,
      role: roleObject,
    });
  }
}
