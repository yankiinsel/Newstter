import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';

Vue.use(Router);

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
}];

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes,
});

export default router;
