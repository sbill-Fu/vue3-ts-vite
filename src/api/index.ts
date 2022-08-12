/**
 * api管理
 */
export interface Params {
    [key: string]: any;
}
import { IUserList } from '@/types/user';
import request from '../utils/request'
export default {
    login(params: Params) {
        return request({
            url: '/users/login',
            method: 'post',
            data: params,
        })
    },
    noticeCount(params?: Params) {
        return request({
            url: '/leave/count',
            method: 'get',
            data: {}
        })
    },
    getMenuList(params: Params) {
        return request({
            url: '/menu/list',
            method: 'get',
            data: params
        })
    },
    getPermissionList(): any {
        return request({
            url: '/users/getPermissionList',
            method: 'get',
            data: {}
        })
    },
    getUserList(params: Params) {
        return request<IUserList>({
            url: '/users/list',
            method: 'get',
            data: params
        })
    },
    getAllUserList() {
        return request({
            url: '/users/all/list',
            method: 'get',
            data: {}
        })
    },
    userDel(params: Params): any {
        return request({
            url: '/users/delete',
            method: 'post',
            data: params
        })
    },
    getRoleAllList(): any {
        return request({
            url: '/roles/allList',
            method: 'get',
            data: {}
        })
    },
    getRoleList(params: Params) {
        return request({
            url: '/roles/list',
            method: 'get',
            data: params
        })
    },
    getDeptList(params?: Params): any {
        return request({
            url: '/dept/list',
            method: 'get',
            data: params
        })
    },
    deptOperate(params: Params) {
        return request({
            url: '/dept/operate',
            method: 'post',
            data: params
        })
    },
    userSubmit(params: Params) {
        return request({
            url: '/users/operate',
            method: 'post',
            data: params
        })
    },
    menuSubmit(params: Params) {
        return request({
            url: '/menu/operate',
            method: 'post',
            data: params
        })
    },
    roleOperate(params: Params) {
        return request({
            url: '/roles/operate',
            method: 'post',
            data: params
        })
    },
    updatePermission(params: Params) {
        return request({
            url: '/roles/update/permission',
            method: 'post',
            data: params
        })
    },
    getApplyList(params: Params) {
        return request({
            url: '/leave/list',
            method: 'get',
            data: params
        })
    },
    leaveOperate(params: Params) {
        return request({
            url: '/leave/operate',
            method: 'post',
            data: params
        })
    },
    leaveApprove(params: Params) {
        return request({
            url: '/leave/approve',
            method: 'post',
            data: params
        })
    }
}