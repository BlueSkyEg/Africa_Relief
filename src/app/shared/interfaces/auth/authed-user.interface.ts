import { IUser } from "./user.interface";

export interface IAuthedUser {
  user: IUser,
  accessToken: string
}
