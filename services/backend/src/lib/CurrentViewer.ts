import { Request } from "express";
import { Service, Container } from "typedi";
import { User } from "../entities/UserEntity";
import { UserService } from "../services/UserService";
import { TokenMaker } from "./TokenMaker";
import { ICurrentViewer } from "./ICurrentViewer";
import { logger } from "../utils/logger";
import { AUTH_COOKIE_NAME } from "../constants";

interface ICurrentViewerArgs {
  userId: string | null;
}

/**
 * CurrentViewer represents the current user making the request.
 */
@Service()
export class CurrentViewer implements ICurrentViewer {
  private user: User | null;
  private hasTriedToFetchUser: boolean;
  private userId: string | null;
  private userService: UserService;

  public static buildFromBearerToken(req: Request) {
    const cookieValue = req.cookies[AUTH_COOKIE_NAME] as string | undefined;
    if (!cookieValue) {
      return this.publicViewer();
    }
    const token = cookieValue.split("Bearer ")[1];
    const payload = TokenMaker.verify(token);
    if (!payload) {
      return this.publicViewer();
    }
    return new CurrentViewer({ userId: payload.userId });
  }

  public async isLoggedIn() {
    const user = await this.getUser();
    return user !== null;
  }

  public async getUser() {
    if (!this.userId) {
      return null;
    }
    if (this.hasTriedToFetchUser) {
      return this.user;
    }
    try {
      this.hasTriedToFetchUser = true;
      const user = await this.userService.findOne({ id: this.userId });
      if (user) {
        this.user = user;
      }
      return this.user;
    } catch (err) {
      logger.error("An error ocurred while trying to fetch the CurrentViewer");
      logger.error(err);
      return null;
    }
  }

  private static publicViewer() {
    return new CurrentViewer({
      userId: null,
    });
  }

  private constructor(args: ICurrentViewerArgs) {
    this.userService = Container.get(UserService);
    this.userId = args.userId;
    this.user = null;
    this.hasTriedToFetchUser = false;
  }
}
