import Vue from 'vue';
import Router from 'vue-router';
import Map from '@/components/Map';

Vue.use(Router);

const routes = [{
  path: '/',
  name: 'Map',
  component: Map,
}];

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes,
});

export default router;
