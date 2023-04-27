import * as VueRouter from 'vue-router';
import CoinDetail from '../components/CoinDetail.vue';

const routes: Array<VueRouter.RouteRecordRaw> = [
  {
    path: '/coin/:id',
    name: 'CoinDetail',
    component: CoinDetail,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;