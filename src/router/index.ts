import { createRouter, createWebHistory } from 'vue-router';
import useAuthUser from '@/auth/useAuthUser';
const user = useAuthUser();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Bangban',
      component: () => import('@/components/BangbanView.vue'),
    },
    {
      path: '/Zidongshengcheng',
      name: 'Zidongshengcheng',
      component: () => import('@/components/ChildView/ZidongshengchengView.vue'),
      redirect: '/Zidongshengcheng/zcxza',
      children: [
        {
          path: 'zcxza',
          name: 'Zhangchengxiuzhengan',
          component: () => import('@/components/ChildView/ZcxzaView.vue'),
        },
        {
          path: 'gudongjueding',
          name: 'Gudongjueding',
          component: () => import('@/components/ChildView/GudongjuedingView.vue'),
        },
        {
          path: 'Guquanbiangeng',
          name: 'Guquanbiangeng',
          component: () => import('@/components/ChildView/GuquanbiangengView.vue'),
        },

      ],
    },
    {
      path: '/Yangbiao',
      name: 'Yangbiao',
      component: () => import('@/components/YangbiaoView.vue'),
    },
    {
      path: '/PdfViewer',
      name: 'PdfViewer',
      component: () => import('@/components/PdfViewer.vue'),
    },
    {
      path: '/Fanben',
      name: 'Fanben',
      component: () => import('@/components/FanbenView.vue'),
      children: [
        {
          path: 'PdfView',
          name: 'PdfView',
          component: () => import('@/components/ChildView/PdfView.vue'),
        },
        {
          path: 'Shipinxinban',
          name: 'Shipinxinban',
          component: () => import('@/components/ChildView/ShipinxinbanView.vue'),
          redirect:'/Fanben/Shipinxinban/Step-1',
          children: [
            {
              path: 'Step-1',
              name: 'Shipin-Step-1',
              component: () => import('@/components/ChildView/Shipinxinban/Step-1.vue'),
            },
            {
              path: 'Step-2',
              name: 'Shipin-Step-2',
              component: () => import('@/components/ChildView/Shipinxinban/Step-2.vue'),
            }
          ],
        },
      ],
    },
    {
      path: '/Content',
      name: 'Content',
      component: () => import('@/components/ContentView.vue'),
    },
    {
      path: '/shipinxiazai',
      name: 'Shipinxiazai',
      component: () => import('@/components/ChildView/ShipinView.vue'),
    },
    {
      path: '/Shuiwu',
      name: 'Shuiwu',
      component: () => import('@/components/ShuiwuView.vue'),
    },
    {
      path: '/Weijianwei',
      name: 'Weijianwei',
      component: () => import('@/components/WeijianweiView.vue'),
    },
    {
      path: '/Minzhen',
      name: 'Minzhen',
      component: () => import('@/components/MinzhenView.vue'),
    },
    {
      path: '/BangbanData',
      name: 'BangbanData',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/components/BangbanDataView.vue'),
    },
    {
      path: '/Leave',
      name: 'Leave',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/components/LeaveView.vue'),
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/components/LoginView.vue'),
    },
  ],
});

router.beforeEach((to, from) => {
  // const user = JSON.parse(localStorage.getItem('user'))
  if (to.meta.requiresAuth == true) {
    console.log('from =>', from);
    if (user.user.value == '') {
      console.log('kong');
      return { name: 'Login' };
    } else {
      console.log(user.user.value);
      return true;
    }
  } else {
    return true;
  }
});

export default router;
