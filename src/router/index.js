import Vue from 'vue';
import Router from 'vue-router';
import PublicLayout from '@/layouts/PublicLayout.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import GeneralPage from '@/pages/public/GeneralPage.vue';
import UserDashboard from '@/pages/user/UserDashboard.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: PublicLayout,
        children: [
          {
            path: '',
            component: GeneralPage,
          },
        ],
      },
      {
        path: '/dashboard',
        component: DashboardLayout,
        children: [
          {
            path: '',
            component: UserDashboard,
          },
        ],
      },
    ],
});

export default router;
