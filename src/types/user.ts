import { IPager } from "./page";

export interface IRole {
  _id: string | number;
  id: string | number;
  roleName: string;
}

export interface IUser {
  userId: number | string;
  userName: string;
  userEmail: string;
  mobile: string;
  job: string;
  roleList: IRole[];
  state: number;
  deptId: string;
  action?: string;
}

export interface IUserList {
  list: IUser[];
  page: IPager;
}

