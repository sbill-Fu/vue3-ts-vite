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
    } else if (code === 500001) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
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
