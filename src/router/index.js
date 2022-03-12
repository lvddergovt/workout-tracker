import { createRouter, createWebHashHistory } from "vue-router";
import { supabase } from "../supabase/init";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import CreatePage from "../views/CreatePage.vue";
import ViewWorkout from "../views/ViewWorkout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      title: "Home",
      auth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: {
      title: "Login",
      auth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    meta: {
      title: "Register",
      auth: false
    }
  },
  {
    path: "/create",
    name: "Create",
    component: CreatePage,
    meta: {
      title: "Create",
      auth: true
    }
  },
  {
    path: "/view-workout/:workoutId",
    name: "View-Workout",
    component: ViewWorkout,
    meta: {
      title: "View Workout",
      auth: false
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

// Change document title
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const isUserLoggedIn = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (isUserLoggedIn) {
      next();
      return;
    } 
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;
