import { Router } from 'vue-router';


export interface IMenuList {
    action: string;
    component: string;
    path: string;
    children?: IMenuList[];
    menuName: string;
}

export interface IRoute extends Partial<Router> {
    [key: string]: any
}
/**
 * 工具函数封装
 */
export default {
    random(num = 1): number {
        return Math.ceil(Math.random() * num)
    },
    formateDate(date: Date, rule?: string) {
        let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, date.getFullYear().toString())
        }
        const o = {
            // 'y+': date.getFullYear(),
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                const val = o[k as keyof typeof o] + '';
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
            }
        }
        return fmt;
    },
    generateRoute(menuList: IMenuList[]) {
        let routes: IRoute[] = []
        const deepList = (list: IMenuList[]) => {
            while (list.length) {
                let item = list.pop()
                if (item?.action || (item?.component && !item.children)) {
                    routes.push({
                        name: item.component,
                        path: item.path,
                        meta: {
                            title: item.menuName
                        },
                        component: item.component
                    })
                }
                if (item?.children && !item.action) {
                    deepList(item.children)
                }
            }
        }
        deepList(menuList)
        return routes;
    }
}