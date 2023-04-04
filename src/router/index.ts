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
        {
          path:"gudongjueding",
          name:"Gudongjueding",
          component:() => import('@/components/ChildView/GudongjuedingView.vue'),
        },
      ]
    },
    {
      path: '/Content',
      name: 'Content',
      component: () => import('@/components/ContentView.vue'),
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
    {
      path: '/BangbanData',
      name: 'BangbanData',
      component: () => import('@/components/BangbanDataView.vue')
    },

  ]
})

export default router
