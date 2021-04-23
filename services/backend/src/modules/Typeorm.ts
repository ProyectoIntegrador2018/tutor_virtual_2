import { User } from "../entities/UserEntity";
import { Role } from "../entities/RoleEntity";
import { Course } from "../entities/CourseEntity";
import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { Season } from "../entities/SeasonEntity";
import { __prod__ } from "../constants";
import { logger } from "../utils/logger";

const startTypeorm = (): Promise<Connection> => {
  /*
    Start Depencency Injection Container
  */
  useContainer(Container);

  let databaseURL = process.env.DATABASE_URL;
  if (!__prod__ && databaseURL === undefined) {
    logger.info('Connecting to default db "postgres"');
    databaseURL = "postgres";
  }

  if (__prod__ && databaseURL === undefined) {
    logger.error("No database URL found when running in production!!!");
    throw new Error("No database URL SPECIFIED!");
  }

  return createConnection({
    url: databaseURL,
    type: "postgres",
    synchronize: true,
    ssl: __prod__,
    entities: [User, Role, Season, Course],
    extra: __prod__
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : undefined,
  });
};

export default startTypeorm;
