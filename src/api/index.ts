/**
 * api管理
 */
import { POST } from '../utils/request';
export default {
  /*
   * 用户管理模块
   */
  login(params: any) {
    return POST('/users/login', params);
  },
  addUser(params: any) {
    return POST('/users/addUser', params);
  },

  getDutyData(params?: any) {
    return POST('/getDutyData', params);
  },
  addDutyData(params?: any) {
    return POST('/addDutyData', params);
  },
  updateDutyData(params?: any) {
    return POST('/updateDutyData', params);
  },
};
