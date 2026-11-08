import { createRouter, createWebHistory } from 'vue-router'
import LandingLayout from '@/layouts/Landing/LandingLayout.vue'
import Test from '../components/test.vue'
import AuthenticatedRoleLayout from '@/layouts/AuthenticatedRoleLayout.vue'
import RoleView from '../views/SuperAdmin/RoleView.vue'
import ManajemenAkunView from '../views/SuperAdmin/ManajemenAkunView.vue'
import HistoryLogView from '../views/SuperAdmin/HistoryLogView.vue'
import PhotoboothGuest from '@/views/Guest/PhotoboothGuest.vue'
import PhotoboothMember from '@/views/Member/PhotoboothMember.vue'
import EditorView from '@/views/EditorView.vue'
import GaleriView from '@/views/Member/GaleriView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingLayout,
    },
    {
      path: '/paket-view',
      name: 'paketview',
      component: () => import('../views/PaketView.vue'),
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
        {
          path: 'member',
          name: 'photobooth-member',
          component: PhotoboothMember,
        },
        {
          path: 'user',
          name: 'photobooth-user',
          redirect: '/member',
        },
        {
          path: 'admin',
          name: 'photobooth-admin',
          component: PhotoboothMember,
        },
        {
          path: 'superadmin',
          name: 'photobooth-superadmin',
          component: ManajemenAkunView,
        },
        {
          path: 'galeri',
          name: 'galeri-foto',
          component: () =>
            import('@/views/Member/GaleriView.vue'),
        },
        { path: 'role', component: RoleView },
        {
          path: 'manajemen-akun',
          name: 'manajemen-akun',
          component: ManajemenAkunView
        },
        {
          path: 'riwayat',
          name: 'riwayat-log-ai',
          component: HistoryLogView,
          
        },

        {
          path: 'galeri',
          name: 'galeri-foto',
          component: GaleriView,
        },


      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import('../views/Auth/RegisterView.vue'),
    },
    {
      path: '/capture',
      name: 'capture',
      component: () => import('../views/CaptureView.vue'),
    },
  ],
})

export default router
