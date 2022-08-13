import { IPager } from '@/types/page';

export interface IAction {
  createTime: string;
  menuCode: string;
  menuName: string;
  menuState: number;
  menuType: number;
  parentId: string[];
  updateTime: string;
}

export interface IMenu {
  action?: IAction[];
  children: IMenu[];
  createTime: string;
  icon: string;
  menuName: string;
  menuState: number;
  menuType: number;
  parentId: (number | null)[];
  path: string;
  updateTime: string;
  _id: string;
}

export interface IRole {
  roleName: string;
  remark: string;
  permissionList: {
    checkedKeys: string[];
    halfCheckedKeys: string[];
  };
  updateTime: string;
  createTime: string;
  _id: string;
}

export interface IRoleList {
  list: IRole[];
  page: IPager;
}
