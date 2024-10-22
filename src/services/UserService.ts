import { injectable } from "inversify";
import { IUserService } from "./interface/IUserService";

@injectable()
export class UserService implements IUserService {
  getUser(id: string): string {
    return `User with ID ${id}`;
  }
}
