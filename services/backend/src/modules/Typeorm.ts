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
    ssl: process.env.NODE_ENV === "production",
    entities: [User, Role, Season, Course],
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });
};

export default startTypeorm;
