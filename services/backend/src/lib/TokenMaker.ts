import jwt from "jsonwebtoken";
import { logger } from "../utils/logger";
import { AUTH_TOKEN_EXPIRY_DAYS } from "../constants";

interface ITokenPayload {
  userId: string;
}

/**
 * Utility class to build and verify JWTs.
 */
export class TokenMaker {
  public static buildLoginToken(userId: string) {
    const secret = this.getTokenSecret();
    const token = jwt.sign({ userId }, secret, {
      expiresIn: `${AUTH_TOKEN_EXPIRY_DAYS}d`,
    });
    return token;
  }

  /**
   * Returns the payload if verification is succesfull, otherwise returns null.
   */
  public static verify(token: string) {
    const secret = this.getTokenSecret();
    let payload = null;
    try {
      payload = jwt.verify(token, secret) as ITokenPayload;
    } catch (err) {
      logger.error("An error ocurred while verifying a JWT");
      logger.error(err);
      payload = null;
    }
    return payload;
  }

  private static getTokenSecret(): string {
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    if (!TOKEN_SECRET) {
      throw new Error(
        "env(TOKEN_SECRET) is not defined. Cant build login token!"
      );
    }
    return TOKEN_SECRET;
  }
}
