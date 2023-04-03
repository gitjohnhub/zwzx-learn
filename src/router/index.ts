import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Bangban',
      component: () => import('@/components/BangbanView.vue')
    },
    {
      path: '/Zidongshengcheng',
      name: 'Zidongshengcheng',
      component: () => import('@/components/ChildView/ZidongshengchengView.vue'),
      children:[
        {
          path:"zcxza",
          name:"Zhangchengxiuzhengan",
          component:() => import('@/components/ChildView/ZcxzaView.vue'),
        },
      ]
    },
    {
      path: '/Content',
      name: 'Content',
      component: () => import('@/components/ContentView.vue'),
      children:[
        {
          path:"/",
          name:"Dianzizhizhao",
          component:() => import('@/components/ChildView/DianzizhizhaoView.vue'),
        },
        {
          path:"Dianzizhizhao",
          name:"Dianzizhizhao",
          component:() => import('@/components/ChildView/DianzizhizhaoView.vue'),
        },
        {
          path:"Shipinxinban",
          name:"Shipinxinban",
          component:() => import('@/components/ChildView/ShipinxinbanView.vue'),
        }
      ]
    },
    {
      path: '/Shuiwu',
      name: 'Shuiwu',
      component: () => import('@/components/ShuiwuView.vue')
    },
    {
      path: '/Weijianwei',
      name: 'Weijianwei',
      component: () => import('@/components/WeijianweiView.vue')
    },
    {
      path: '/Minzhen',
      name: 'Minzhen',
      component: () => import('@/components/MinzhenView.vue')
    },

  ]
})

export default router
