import { User } from "../entities/UserEntity";
import { Role } from "../entities/RoleEntity";
import { Course } from "../entities/CourseEntity";
import {
  Connection,
  createConnection,
  useContainer,
  ConnectionOptions,
} from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { Season } from "../entities/SeasonEntity";
import { __prod__ } from "../constants";
import { logger } from "../utils/logger";
import { Ally } from "../entities/AllyEntity";
import { Student } from "../entities/StudentEntity";
import { Grade } from "../entities/GradeEntity";
import { TutorCourse } from "../entities/TutorCourseEntity";
import { SupervisorCourse } from "../entities/SupervisorCourseEntity";
import { StudentCourse } from "../entities/StudentCourseEntity";

const startTypeorm = async (): Promise<Connection> => {
  /*
    Start Depencency Injection Container
  */
  useContainer(Container);

  let databaseURL = process.env.DATABASE_URL;
  if (!__prod__ && databaseURL === undefined) {
    databaseURL = "postgres";
  }
  logger.info(`Connecting to '${databaseURL}' db.`);

  if (__prod__ && databaseURL === undefined) {
    logger.error("No database URL found when running in production!!!");
    throw new Error("No database URL SPECIFIED!");
  }

  const opts: ConnectionOptions = {
    url: databaseURL,
    type: "postgres",
    synchronize: false,
    ssl: __prod__,
    entities: [
      User,
      Role,
      Season,
      Course,
      Ally,
      Student,
      Grade,
      TutorCourse,
      SupervisorCourse,
      StudentCourse,
    ],
    migrations: ["./dist/migrations/**/*.js"],
    cli: {
      migrationsDir: "./src/migrations/",
    },
    extra: __prod__
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : undefined,
  };
  if (opts.dropSchema && __prod__) {
    logger.error("WARNING: ATTEMPTING TO DROP SCHEMA IN PRODUCTION");
    throw new Error("Tried to drop schema in production");
  }
  return createConnection(opts);
};

export default startTypeorm;
