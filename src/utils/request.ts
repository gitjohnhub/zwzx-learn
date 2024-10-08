import axios from "axios";
import config from "../config/config"
import router from "../router";
import storage from "../utils/storage";
import { message } from 'ant-design-vue';

const TOKEN_INVALID = "Token认证失败，请重新登陆"
const NETWORK_ERROR = "网络请求异常，请稍后重试"
//创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL:config.baseApi,
  timeout:8000,

})

// 请求拦截
service.interceptors.request.use((req)=>{
  req.url = '/api' + req.url;
  // 排除登录接口
  if(req.url === '/api/login') {
    return req;
  }
  const headers = req.headers;
  const {token} = storage.getItem('userInfo') ?? {token:''}
  if(!headers.Authorization) headers.Authorization = 'Bearer ' + token
  return req;

})
//响应拦截
service.interceptors.response.use((res)=>{
  // TODO
  const {code,data,msg} = res.data;
  if(code === 200){
    return data
  }else if (code === 20001 || code === 50001){
    message.error(msg)
    setTimeout(() => {
      router.push('/login')
    }, 1500);
    return Promise.reject(TOKEN_INVALID)
  }else{
    message.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)

  }

})
/**
 * 请求核心参数
 *@param {*} options 请求配置
 *
 */

function request(options:any){
  options.method = options.method || 'get'
  if(options.method.toLowerCase() === 'get'){
    options.params = options.data
  }

  if(config.env === 'prod'){
    service.defaults.baseURL = config.baseApi
  }else{
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
    // console.log(config.mockApi)
    // console.log(service.defaults.baseURL)

  }
  return service(options)
}
interface RequestOptions {
  [key: string]: any;
}
// ['get','post','put','delete','patch'].forEach((item)=>{
//   request[item] = (url:string,data:any,options:RequestOptions ={})=>{
//     return request({
//       url,
//       data,
//       method:item,
//       ...options
//     })
//   }
// })
export const POST =  (url:string,data:any,options:RequestOptions ={})=>{
  return request({
    url,
    data,
    method:'post',
    ...options
  })
}
export const GET =  (url:string,data?:any,options:RequestOptions ={})=>{
  return request({
    url,
    data,
    method:'get',
    ...options
  })
}

// export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
//   return service(config).post<T>(url, data);
// };


export default request