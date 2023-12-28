import Vue from 'vue';
import Router from 'vue-router';
import PublicLayout from '@/layouts/PublicLayout.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import GeneralPage from '@/pages/public/GeneralPage.vue';
import UserDashboard from '@/pages/user/UserDashboard.vue';

Vue.use(Router);
const routerHistory = createWebHistory('/vue2-notes/');

const router = new Router({
  history: routerHistory,
  routes: [
    {
      path: '/vue2-notes',
      component: PublicLayout,
      children: [
        {
          path: '',
          component: GeneralPage,
        },
      ],
    },
    {
      path: '/vue2-notes/dashboard',
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
