/**
 * Storage 二次封装
 */

import config from "../config/config"

export default{
  setItem(key:string,val:any){
    const storage = this.getStorage();
    storage[key] = val
    window.localStorage.setItem(config.namespace,JSON.stringify(storage))
  },
  getItem(key:string){
    return  this.getStorage()[key];

  },
  getStorage(){
    return  JSON.parse(window.localStorage.getItem(config.namespace) || "{}");
  },
  clearItem(key:any){
    const storage = this.getStorage();
    delete storage[key];
    window.localStorage.setItem(config.namespace,JSON.stringify(storage))
  },
  clearAll(){
    window.localStorage.clear()
  }
}