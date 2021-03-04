import winston, { format } from "winston";
import { __prod__, __test__ } from "../constants";

const humanErrorsFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} [${level}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
    }`;
  })
);

const humanFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} [${level}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
    }`;
  })
);

class Logger {
  private errorLogger: winston.Logger;
  private infoLogger: winston.Logger;
  private debugLogger: winston.Logger;
  private static logger?: Logger;

  public static getInstance() {
    if (Logger.logger) {
      return Logger.logger;
    }
    Logger.logger = new Logger();
    return Logger.logger;
  }

  public error(msg: string | Error) {
    if (msg instanceof Error) {
      msg = `${msg.message}\n${msg.stack}`;
    }
    this.errorLogger.error(msg);
  }

  public info(msg: string) {
    this.infoLogger.info(msg);
  }

  public debug(msg: string) {
    if (!__prod__) {
      this.debugLogger.debug(msg);
    }
  }

  private constructor() {
    this.errorLogger = winston.createLogger({
      level: "error",
      transports: [
        new winston.transports.Console({
          format: humanErrorsFormat,
        }),
      ],
      silent: __test__,
    });

    this.infoLogger = winston.createLogger({
      level: "info",
      transports: [
        new winston.transports.Console({
          format: humanFormat,
        }),
      ],
      silent: __test__,
    });

    this.debugLogger = winston.createLogger({
      level: "info",
      format: humanFormat,
      transports: [new winston.transports.Console()],
      silent: __test__,
    });

    if (__prod__) {
      this.errorLogger.add(
        new winston.transports.File({
          filename: "errors.log",
          level: "error",
          format: format.json(),
        })
      );
      this.infoLogger.add(
        new winston.transports.File({
          filename: "info.log",
          level: "info",
          format: format.json(),
        })
      );
    }
  }
}
const logger = Logger.getInstance();

export { logger };
