import { User } from "src/entities/UserEntity";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Role, UserRoleName } from "../../entities/RoleEntity";

@Service()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  public async findOrCreate(roleName: UserRoleName): Promise<Role> {
    let role = await this.roleRepository.findOne({ name: roleName });
    if (!role) {
      const roleData = this.roleRepository.create({
        name: roleName,
      });
      role = await this.roleRepository.save(roleData);
    }
    return role;
  }

  public async findByUser(user: User): Promise<Role> {
    return await this.roleRepository
      .createQueryBuilder("role")
      .leftJoinAndSelect("role.user", "user")
      .where("user.id = :id", { id: user.id })
      .getOneOrFail();
  }
}
