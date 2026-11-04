import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
import LandingLayout from '@/layouts/Landing/LandingLayout.vue'
import Test from '../components/test.vue'
import AuthenticatedRoleLayout from '@/layouts/AuthenticatedRoleLayout.vue'
import RoleView from '../views/SuperAdmin/RoleView.vue'
// 1. IMPORT KOMPONEN MANAJEMEN AKUN DI SINI
import ManajemenAkunView from '../views/SuperAdmin/ManajemenAkunView.vue'
import GalleryPhotoView from '../views/SuperAdmin/GalleryPhotoView.vue'
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
        { path: 'role', component: RoleView },
        
        // 2. TAMBAHKAN ROUTE MANAJEMEN AKUN DI DALAM CHILDREN
        { 
          path: 'manajemen-akun', 
          name: 'manajemen-akun', 
          component: ManajemenAkunView 
        },

        { 
          path: 'galeri-foto', 
          name: 'galeri-foto', 
          component: GalleryPhotoView 
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