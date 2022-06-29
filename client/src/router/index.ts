import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home/Home.page.vue';
import Profile from '@/views/Profile/Profile.page.vue';
import { authGuard } from '../auth/authGuard';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/deductions',
    name: 'Deductions',
    component: () => import('@/views/Deductions/Deductions.page.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: '/deductions/validation/:id',
    name: 'Deductions Validation',
    component: () => import('@/views/Deductions/Validation.page.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
