// 环境配置封装
const env = import.meta.env.MODE ?? 'prod';
// const EnvConfig = {
//   development:{
//     baseApi:'/api',
//     mockApi:'https://mock.apifox.cn/m1/425700-0-default'
//   },
//   test:{
//     baseApi:'/',
//     mockApi:'https://mock.apifox.cn/m1/425700-0-default'
//   },
//   prod:{
//     baseApi:'/',
//     mockApi:''
//   }
// }
export default {
  env,
  mock:false,
  namespace:'jiading',
  baseApi:'/',
  mockApi:'https://mock.apifox.cn/m1/425700-0-default'
  // ...EnvConfig[env]
}