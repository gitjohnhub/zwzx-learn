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

  getBangbanData(params?: any) {
    return POST('/getBangbanData', params);
  },
  addBangbanData(params?: any) {
    return POST('/addBangbanData', params);
  },
  updateDutyData(params?: any) {
    return POST('/updateDutyData', params);
  },
};
