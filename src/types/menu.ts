export interface IMenu {
  menuName: string;
  icon: string;
  menuType: number;
  menuCode: string;
  path: string;
  component: string;
  menuState: number;
  createTime: string;
  children: IMenu[];
  parentId?: (number | null)[];
  _id: number;
}
