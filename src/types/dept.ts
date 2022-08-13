export interface IDept {
  children?: IDept[];
  createTime: string;
  deptName: string;
  parentId: (number | null)[];
  updateTime: string;
  userId: string;
  userName: string;
  _id: string;
  userEmail?: string;
  user?: string;
}

export interface IUser {
  userEmail: string;
  userId: number;
  userName: string;
  _id: string;
}