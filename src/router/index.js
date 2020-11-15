import Vue from 'vue';
import VueRouter from 'vue-router';
import CarsIndex from "../views/CarsIndex.vue";
import CarsShow from "../views/CarsShow.vue";
import CarsNew from "../views/CarsNew.vue";
import CarsEdit from "../views/CarsEdit.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import ImagesEdit from "../views/ImagesEdit.vue";
import BidsIndex from "../views/BidsIndex";

Vue.use(VueRouter);

const routes = [
  { path: "/cars", name: "cars-index", component: CarsIndex},
  { path: "/cars/new", name: "cars-new", component: CarsNew},
  { path: "/cars/:id", name: "cars-show", component: CarsShow},
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/cars/:id/edit", name: "cars-edit", component: CarsEdit},
  { path: "/images/:id/edit", name: "images-edit", component: ImagesEdit },
  { path: "/bids", name: "bids-index", component: BidsIndex },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
