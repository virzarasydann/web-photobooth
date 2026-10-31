import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LandingView from '../views/LandingView.vue'
// import AboutView from '../views/AboutView.vue'
import LandingLayout from '@/layouts/Landing/LandingLayout.vue'
import Test from '../components/test.vue'
import AuthenticatedRoleLayout from '@/layouts/AuthenticatedRoleLayout.vue'
import RoleView from '../views/SuperAdmin/RoleView.vue'
import PhotoboothGuest from '@/views/Guest/PhotoboothGuest.vue'
import EditorView from '@/views/EditorView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingLayout,
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
        import('../views/Auth/LoginView.vue'),
    },

    {
      path: '/photobooth/guest',
      name: 'photobooth-guest',
      component: PhotoboothGuest,
    },
    {
      path: '/editor',
      name: 'editor-view',
      component: EditorView,
    },

    {
      path: '/',
      component: AuthenticatedRoleLayout,
      children: [
        { path: 'role', component: RoleView },

        // Tambahkan route lain di sini
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import('../views/Auth/RegisterView.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },

    {
      path: '/capture',
      name: 'capture',
      component: () =>
        import('../views/CaptureView.vue'),
    },
  ],
})

export default router
