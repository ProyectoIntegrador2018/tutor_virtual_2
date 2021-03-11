import { User } from "../entities/UserEntity";
import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

const startTypeorm = (): Promise<Connection> => {
  /*
    Start Depencency Injection Container
  */
  useContainer(Container);

  // TODO Change to database url via env
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "tutorvirtual",
    synchronize: true,
    entities: [User],
  });
};

export default startTypeorm;
