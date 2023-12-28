import Vue from 'vue';
import Router from 'vue-router';
import PublicLayout from '@/layouts/PublicLayout.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import GeneralPage from '@/pages/public/GeneralPage.vue';
import UserDashboard from '@/pages/user/UserDashboard.vue';
import { createWebHistory } from 'vue-router';

Vue.use(Router);
const routerHistory = createWebHistory('/vue2-notes/');

const router = new Router({
  history: routerHistory,
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
