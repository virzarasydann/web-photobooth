<template>
  <div class="h-screen w-screen max-h-screen overflow-hidden flex bg-[#F5F6F8] font-sans text-[#1C2B22]">
    <SideBar v-model:isMobileOpen="isMobileOpen" />

    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-[#F5F6F8]">
      <header class="lg:hidden h-12 bg-[#F5F6F8] border-b border-[#DCE7E8] px-4 flex items-center justify-between shrink-0 z-30">
        <button
          type="button"
          @click="isMobileOpen = true"
          class="p-1.5 text-[#2F523E] hover:bg-gray-100 rounded-lg cursor-pointer"
          aria-label="Buka Menu"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <BrandLogo size="sm" />

        <button
          v-if="route.path === '/member' || route.path === '/user' || route.path === '/admin'"
          type="button"
          @click="audioStore.toggleSound"
          class="w-8 h-8 rounded-full bg-white border border-[#DCE7E8] flex items-center justify-center text-[#486153] hover:text-[#2F523E] shadow-2xs cursor-pointer active:scale-95"
          :title="audioStore.soundEnabled ? 'Matikan Suara Audio' : 'Aktifkan Suara Audio'"
        >
          <svg v-if="audioStore.soundEnabled" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
          <svg v-else class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-7.5 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        </button>
        <div v-else class="w-8" />
      </header>

      <main class="flex-1 h-full min-h-0 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SideBar from '@/components/common/Navbar/SideBar.vue'
import BrandLogo from '@/components/common/Layout/Landing-Page-Public/BrandLogo.vue'
import { usePhotoboothAudioStore } from '@/stores/photoboothAudio.js'

const route = useRoute()
const isMobileOpen = ref(false)
const audioStore = usePhotoboothAudioStore()
</script>
