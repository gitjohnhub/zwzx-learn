import { createRouter, createWebHistory } from 'vue-router'
import useAuthUser from '@/auth/useAuthUser'
const user = useAuthUser()
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
        {
          path:"Guquanbiangeng",
          name:"Guquanbiangeng",
          component:() => import('@/components/ChildView/GuquanbiangengView.vue'),
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
      meta:{
        requiresAuth:true
      },
      component: () => import('@/components/BangbanDataView.vue')
    },
    {
      path: '/Leave',
      name: 'Leave',
      meta:{
        requiresAuth:true
      },
      component: () => import('@/components/LeaveView.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/components/LoginView.vue')
    },

  ]
})

router.beforeEach((to, from) => {
  // const user = JSON.parse(localStorage.getItem('user'))
  if (to.meta.requiresAuth == true) {
    if (user.user.value== ""){
      console.log('kong')
      return {name:'Login'}
    }else{
      console.log(user.user.value )
      return true
    }
  } else {
    return true
  }
  },
)

export default router
