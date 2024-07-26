import { User } from "../modules/user/models/user";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}


