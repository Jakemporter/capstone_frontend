import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CarsIndex from "../views/CarsIndex.vue";
import CarsShow from "../views/CarsShow.vue";
import CarsNew from "../views/CarsNew.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: "/cars", name: "cars-index", component: CarsIndex},
  { path: "/cars/new", name: "cars-new", component: CarsNew},
  { path: "/cars/:id", name: "cars-show", component: CarsShow},
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
