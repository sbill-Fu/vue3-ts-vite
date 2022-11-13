/**
 * axios二次封装
 */
import axios, { AxiosRequestConfig, Method } from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
import router from '../router'
import storage from './storage'
import { Params } from '@/api'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'
const TIMEOUT_ERROR = '网络超时'
const CODE = {
    SUCCESS: 200,
    PARAM_ERROR: 10001, // 参数错误
    USER_ACCOUNT_ERROR: 20001, // 账号或密码错误
    USER_LOGIN_ERROR: 30001, // 用户未登录
    BUSINESS_ERROR: 40001, // 业务请求失败
    AUTH_ERROR: 50001, // 认证失败或TOKEN过期
}

// 创建axios实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req) => {
    const headers = req.headers;
    const { token = "" } = storage.getItem('userInfo') || {};
    if (!headers.Authorization) headers.Authorization = 'Bearer ' + token;
    return req;
})

// 响应拦截
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data;
    if (code === 200) {
        return res;
    } else if (code === CODE.AUTH_ERROR) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
}, (err: Error) => {
    if (err.message.includes('timeout')) {
        ElMessage.error(TIMEOUT_ERROR)
    } else {
        ElMessage.error(err.message)
    }
})
interface RequestOptions extends AxiosRequestConfig{
    mock?: boolean;
    [key: string]: any;
}
interface RequestFunction {
    <T = any>(options: RequestOptions): Promise<T>;
    [key: string]: any;
}
export interface MyResponseType<T = any> {
    code: number;
    msg: string;
    data: T;
  }
/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
let request: RequestFunction = async <T = any>(options: RequestOptions) => {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    let isMock = config.mock;
    if (typeof options.mock != 'undefined') {
        isMock = options.mock;
    }
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    // service.request 返回值是 AxiosResponse (含有 header config 之类的属性)，data 是接口返回的值，data.data 是接口返回值里的data
    // 通过双层泛型来指定 AxiosResponse.data 的类型是什么(MyResponseType)，具体自己需要定义返回数据结构的类型是什么(T)
    const data = await service.request<MyResponseType<T>>(options)
    return data.data.data
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
    request[item] = (url: string, data: Params, options: Params) => {
        return request({
            url,
            data,
            method: item as Method,
            ...options
        })
    }
})

export default request;
