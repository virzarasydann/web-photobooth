import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingView from '../views/LandingView.vue'
import AboutView from '../views/AboutView.vue'
import Test from '../components/test.vue'
import AuthenticatedRoleLayout from '@/layouts/AuthenticatedRoleLayout.vue'
import RoleView from '../views/SuperAdmin/RoleView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () =>
        import('../components/Auth/Login.vue'),
    },
    

    {
      path: '/',
      component: AuthenticatedRoleLayout, // Layout dengan Sidebar
      children: [
        { path: 'role', component: RoleView },
        
        // Tambahkan route lain di sini
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import('../components/Auth/Register.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
