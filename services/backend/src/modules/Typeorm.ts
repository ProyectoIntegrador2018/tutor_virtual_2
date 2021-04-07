import { User } from "../entities/UserEntity";
import { Role } from "../entities/RoleEntity";
import { Course } from "../entities/CourseEntity";
import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { Season } from "../entities/SeasonEntity";

const startTypeorm = (): Promise<Connection> => {
  /*
    Start Depencency Injection Container
  */
  useContainer(Container);

  const databaseURL = process.env.DATABASE_URL;

  return createConnection({
    url: databaseURL,
    type: "postgres",
    synchronize: true,
    entities: [User, Role, Season, Course],
  });
};

export default startTypeorm;
