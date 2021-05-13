import { User } from "../entities/UserEntity";
import { Role } from "../entities/RoleEntity";
import { Course } from "../entities/CourseEntity";
import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { Season } from "../entities/SeasonEntity";
import { __prod__ } from "../constants";
import { logger } from "../utils/logger";
import { Ally } from "../entities/AllyEntity";
import { Student } from "../entities/StudentEntity";
import { Grade } from "../entities/GradeEntity";
import { TutorCourse } from "../entities/TutorCourseEntity";
import { SupervisorCourse } from "../entities/SupervisorCourseEntity";

const startTypeorm = (): Promise<Connection> => {
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

  return createConnection({
    url: databaseURL,
    type: "postgres",
    synchronize: !__prod__,
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
    ],
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
