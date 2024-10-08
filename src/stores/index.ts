import { defineStore } from 'pinia';
import storage from '@/utils/storage';
import api from '@/api';
const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#dd6236', '#4a9d9c']

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: storage.getItem('userInfo') ?? '',
    usersList: [],
    checkoperators:[],
    userColors:[],
    systemBackColor:'',
    systemFrontColor:'',

  }),

  actions: {
    saveUserInfo(userInfo: any) {
      this.userInfo = userInfo;
      console.log(this.userInfo);
      storage.setItem('userInfo', userInfo);
    },
    logout() {
      this.userInfo = {};
      storage.clearAll();
    },
    async getUsers() {
      return await api.getUsers().then((res: any) => {
        console.log('users=====>', res);
        this.usersList = res.rows
        this.checkoperators = res.rows.map((userInfo) => {
          return { value: userInfo.userName };
        });
        this.userColors = res.rows.map((userInfo, index) => {
          return {
            username: userInfo.userName,
            color: colors[index],
          };
        });
      });
    },
  },
});
