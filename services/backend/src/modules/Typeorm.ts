import { User } from "../entities/UserEntity";
import { Role } from "../entities/RoleEntity";
import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { Season } from "../entities/SeasonEntity";

const startTypeorm = (): Promise<Connection> => {
  /*
    Start Depencency Injection Container
  */
  useContainer(Container);

  const username = process.env.DB_USERNAME || "postgres";
  // TODO Change to database url via env
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: username,
    password: "",
    database: "tutorvirtual",
    synchronize: true,
    entities: [User, Role, Season],
  });
};

export default startTypeorm;
