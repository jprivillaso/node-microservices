import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      redirect: 'Home',
      children: [
        {
          path: 'Home',
          component: Home
        }
      ]
    }
  ]
});
