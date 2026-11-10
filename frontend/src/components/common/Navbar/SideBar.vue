<template>
  <div
    v-if="isMobileOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
    @click="isMobileOpen = false"
  />

  <aside
    class="fixed lg:static inset-y-0 left-0 z-50 bg-[#F5F6F8] border-r border-[#DCE7E8] flex flex-col justify-between transition-all duration-300 lg:translate-x-0 shrink-0 select-none"
    :class="[
      isMobileOpen
        ? 'translate-x-0 shadow-2xl w-64 p-3.5'
        : '-translate-x-full lg:translate-x-0',
      isCompact
        ? 'lg:w-[72px] lg:p-2.5 cursor-pointer hover:bg-[#EEF2F1]'
        : 'w-64 p-3.5',
    ]"
    :title="
      isCompact
        ? 'Klik untuk memperlebar sidebar'
        : undefined
    "
    @click="handleSidebarClick"
  >
    <div class="flex flex-col gap-3 min-h-0">
      <div
        class="flex items-center"
        :class="
          isCompact
            ? 'justify-center py-1'
            : 'justify-between px-1 py-1'
        "
      >
        <RouterLink
          to="/"
          class="no-underline flex items-center shrink-0"
        >
          <img
            v-if="isCompact"
            src="@/assets/img/logo.png"
            alt="Logo Sleepy Ruben"
            class="h-9 w-9 rounded-full object-cover shadow-2xs"
            title="Sleepy Ruben Photobooth"
          />
          <BrandLogo v-else size="sm" />
        </RouterLink>

        <button
          v-if="isFullscreen && !isCollapsed"
          type="button"
          @click.stop="isCollapsed = true"
          class="hidden lg:flex p-1.5 text-gray-400 hover:text-[#2F523E] hover:bg-white rounded-lg border border-transparent hover:border-[#DCE7E8] transition-all cursor-pointer shadow-2xs"
          title="Kecilkan Sidebar"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.75 19.5 11.25 12l7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          type="button"
          @click.stop="isMobileOpen = false"
          class="lg:hidden p-1.5 text-gray-500 hover:text-[#1C2B22] rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Tutup Menu"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav
        class="flex flex-col gap-1 overflow-y-auto pr-0.5 no-scrollbar"
        aria-label="Menu Navigasi"
      >
        <div
          v-if="!isCompact"
          class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 pt-1 pb-0.5"
        >
          Menu Utama
        </div>
        <div
          v-else
          class="h-px w-6 bg-[#DCE7E8] mx-auto my-1"
        />

        <RouterLink
          to="/member"
          @click="isMobileOpen = false"
          class="rounded-xl text-xs font-semibold transition-all flex items-center"
          :class="[
            isCompact
              ? 'justify-center w-10 h-10 mx-auto'
              : 'justify-between px-3 py-2',
            $route.path === '/member' ||
            $route.path === '/user' ||
            $route.path === '/admin'
              ? 'bg-white text-[#2F523E] font-bold shadow-xs border border-[#DCE7E8]'
              : 'text-gray-600 hover:bg-black/5 hover:text-[#1C2B22]',
          ]"
          title="Booth Kamera"
        >
          <div class="flex items-center gap-2.5">
            <svg
              class="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
            <span v-if="!isCompact">Booth Kamera</span>
          </div>
          <span
            v-if="!isCompact"
            class="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
            :class="
              $route.path === '/member' ||
              $route.path === '/admin'
                ? 'bg-[#2F523E] text-white'
                : 'bg-[#EAF2EE] text-[#2F523E]'
            "
          >
            Live
          </span>
        </RouterLink>

        <RouterLink
          to="/galeri"
          @click="isMobileOpen = false"
          class="rounded-xl text-xs font-semibold transition-all flex items-center"
          :class="[
            isCompact
              ? 'justify-center w-10 h-10 mx-auto'
              : 'gap-2.5 px-3 py-2',
            $route.path === '/galeri'
              ? 'bg-white text-[#2F523E] font-bold shadow-xs border border-[#DCE7E8]'
              : 'text-gray-600 hover:bg-black/5 hover:text-[#1C2B22]',
          ]"
          title="Galeri Foto"
        >
          <svg
            class="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span v-if="!isCompact">Galeri Foto</span>
        </RouterLink>

        <template
          v-if="
            activeRole === 'admin' ||
            activeRole === 'superadmin'
          "
        >
          <div
            v-if="!isCompact"
            class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 pt-3 pb-0.5"
          >
            Fitur Premium
          </div>
          <div
            v-else
            class="h-px w-6 bg-[#DCE7E8] mx-auto my-1"
          />

          <RouterLink
            to="/editor"
            @click="isMobileOpen = false"
            class="rounded-xl text-xs font-semibold transition-all flex items-center"
            :class="[
              isCompact
                ? 'justify-center w-10 h-10 mx-auto'
                : 'justify-between px-3 py-2',
              $route.path === '/editor'
                ? 'bg-white text-[#2F523E] font-bold shadow-xs border border-[#DCE7E8]'
                : 'text-gray-600 hover:bg-black/5 hover:text-[#1C2B22]',
            ]"
            title="Studio Editor"
          >
            <div class="flex items-center gap-2.5">
              <svg
                class="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                />
              </svg>
              <span v-if="!isCompact">Studio Editor</span>
            </div>
            <span
              v-if="!isCompact"
              class="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#FAF0E8] text-[#CD692C]"
            >
              VIP
            </span>
          </RouterLink>
        </template>

        <template v-if="activeRole === 'superadmin'">
          <div
            v-if="!isCompact"
            class="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 pt-3 pb-0.5"
          >
            Super Admin
          </div>
          <div
            v-else
            class="h-px w-6 bg-[#DCE7E8] mx-auto my-1"
          />

          <RouterLink
            to="/paket-view"
            @click="isMobileOpen = false"
            class="rounded-xl text-xs font-semibold transition-all flex items-center"
            :class="[
              isCompact
                ? 'justify-center w-10 h-10 mx-auto'
                : 'gap-2.5 px-3 py-2',
              $route.path === '/paket-view'
                ? 'bg-white text-[#2F523E] font-bold shadow-xs border border-[#DCE7E8]'
                : 'text-gray-600 hover:bg-black/5 hover:text-[#1C2B22]',
            ]"
            title="Paket Layanan"
          >
            <svg
              class="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
            <span v-if="!isCompact">Paket Layanan</span>
          </RouterLink>

          <RouterLink
            to="/manajemen-akun"
            @click="isMobileOpen = false"
            class="rounded-xl text-xs font-semibold transition-all flex items-center"
            :class="[
              isCompact
                ? 'justify-center w-10 h-10 mx-auto'
                : 'gap-2.5 px-3 py-2',
              $route.path === '/manajemen-akun'
                ? 'bg-white text-[#2F523E] font-bold shadow-xs border border-[#DCE7E8]'
                : 'text-gray-600 hover:bg-black/5 hover:text-[#1C2B22]',
            ]"
            title="Manajemen Akun"
          >
            <svg
              class="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            <span v-if="!isCompact">Manajemen Akun</span>
          </RouterLink>

          <RouterLink
            to="/role"
            @click="isMobileOpen = false"
            class="rounded-xl text-xs font-semibold transition-all flex items-center"
            :class="[
              isCompact
                ? 'justify-center w-10 h-10 mx-auto'
                : 'gap-2.5 px-3 py-2',
              $route.path === '/role'
                ? 'bg-white text-[#2F523E] font-bold shadow-xs border border-[#DCE7E8]'
                : 'text-gray-600 hover:bg-black/5 hover:text-[#1C2B22]',
            ]"
            title="Manajemen Role"
          >
            <svg
              class="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
            <span v-if="!isCompact">Manajemen Role</span>
          </RouterLink>

          <RouterLink
            to="/management-paket"
            @click="isMobileOpen = false"
            class="rounded-xl text-xs font-semibold transition-all flex items-center"
            :class="[
              isCompact
                ? 'justify-center w-10 h-10 mx-auto'
                : 'gap-2.5 px-3 py-2',
              $route.path === '/management-paket'
                ? 'bg-white text-[#2F523E] font-bold shadow-xs border border-[#DCE7E8]'
                : 'text-gray-600 hover:bg-black/5 hover:text-[#1C2B22]',
            ]"
            title="Manajemen Paket"
          >
            <svg
              class="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
            <span v-if="!isCompact">Manajemen Paket</span>
          </RouterLink>

          <RouterLink
            to="/riwayat"
            @click="isMobileOpen = false"
            class="rounded-xl text-xs font-semibold transition-all flex items-center"
            :class="[
              isCompact
                ? 'justify-center w-10 h-10 mx-auto'
                : 'gap-2.5 px-3 py-2',
              $route.path === '/riwayat'
                ? 'bg-white text-[#2F523E] font-bold shadow-xs border border-[#DCE7E8]'
                : 'text-gray-600 hover:bg-black/5 hover:text-[#1C2B22]',
            ]"
            title="Riwayat AI"
          >
            <svg
              class="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span v-if="!isCompact">Riwayat AI</span>
          </RouterLink>
        </template>
      </nav>
    </div>

    <div
      class="flex flex-col gap-2 pt-2 border-t border-[#DCE7E8] shrink-0"
    >
      <div
        v-if="!isCompact"
        class="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-[#DCE7E8] shadow-2xs"
      >
        <button
          type="button"
          @click.stop="openChatAndClose"
          class="flex items-center rounded-full bg-[#2F523E] font-semibold text-white shadow-lg transition hover:bg-[#244430] hover:shadow-xl active:scale-[0.98] cursor-pointer"
          :class="
            isCompact
              ? 'w-10 h-10 mx-auto justify-center'
              : 'w-full min-h-14 justify-center gap-3 px-5 py-3 text-lg'
          "
          title="Buka Bantuan AI"
          aria-label="Buka Bantuan AI"
        >
      
          <svg
            class="h-7 w-7 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 11.25c0 4.142-3.694 7.5-8.25 7.5a9.5 9.5 0 0 1-3.72-.748L3.75 19.5l1.498-3.745A7.067 7.067 0 0 1 3.75 11.25c0-4.142 3.694-7.5 8.25-7.5s8.25 3.358 8.25 7.5Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 11.25h.008v.008h-.008v-.008Zm3.375 0h.008v.008H12v-.008Zm3.375 0h.008v.008h-.008v-.008Z"
            />
          </svg>
          <span v-if="!isCompact">Bantuan</span>
        </button>
      </div>

      <div
        v-if="!isCompact"
        class="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-[#DCE7E8] shadow-2xs"
      >
        <div class="relative shrink-0">
          <div
            class="w-8 h-8 rounded-full bg-[#2F523E] text-white flex items-center justify-center font-bold text-xs shadow-xs"
          >
            {{ currentProfile.avatar }}
          </div>
          <span
            class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"
          />
        </div>

        <div class="flex-1 min-w-0">
          <div
            class="font-bold text-xs text-[#1C2B22] truncate"
          >
            {{ currentProfile.name }}
          </div>
          <div class="text-[10px] text-gray-500 truncate">
            {{ currentProfile.roleLabel }}
          </div>
        </div>

        <button
          type="button"
          @click.stop="logout"
          class="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
          title="Keluar ke Landing Page"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>

      <div
        v-else
        class="flex flex-col items-center gap-2 py-1"
      >
        <div
          class="relative cursor-pointer"
          :title="
            currentProfile.name +
            ' (' +
            currentProfile.roleLabel +
            ')'
          "
        >
          <div
            class="w-8 h-8 rounded-full bg-[#2F523E] text-white flex items-center justify-center font-bold text-xs shadow-xs"
          >
            {{ currentProfile.avatar }}
          </div>
          <span
            class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"
          />
        </div>

        <button
          type="button"
          @click.stop="logout"
          class="w-8 h-8 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
          title="Keluar"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import BrandLogo from '@/components/common/Layout/Landing-Page-Public/BrandLogo.vue'
const openChatAndClose = () => {
  emit('openChat')
  isMobileOpen.value = false
}
const isMobileOpen = defineModel('isMobileOpen', {
  type: Boolean,
  default: false,
})
const emit = defineEmits(['openChat'])

const router = useRouter()
const route = useRoute()

const activeRole = computed(() => {
  const path = route.path
  if (
    path.startsWith('/superadmin') ||
    path === '/role' ||
    path === '/manajemen-akun' ||
    path === '/paket-view' ||
    path === '/management-paket' ||
    path === '/riwayat'
  ) {
    return 'superadmin'
  }
  if (path.startsWith('/admin') || path === '/editor') {
    return 'admin'
  }
  return 'member'
})
const isFullscreen = ref(false)
const isCollapsed = ref(false)

const isCompact = computed(() => {
  return isFullscreen.value && isCollapsed.value
})

const handleFullscreenChange = () => {
  const active = Boolean(document.fullscreenElement)
  isFullscreen.value = active
  if (active) {
    if (window.innerWidth >= 1024) {
      isCollapsed.value = true
    }
  } else {
    isCollapsed.value = false
  }
}

const handleSidebarClick = () => {
  if (isCompact.value) {
    isCollapsed.value = false
  }
}

onMounted(() => {
  isFullscreen.value = Boolean(document.fullscreenElement)
  document.addEventListener(
    'fullscreenchange',
    handleFullscreenChange,
  )
})

onUnmounted(() => {
  document.removeEventListener(
    'fullscreenchange',
    handleFullscreenChange,
  )
})

const profiles = {
  member: {
    name: 'Ruben Sleepy',
    roleLabel: 'Member Studio',
    avatar: 'SR',
  },
  admin: {
    name: 'Admin Ruben',
    roleLabel: 'Administrator',
    avatar: 'AR',
  },
  superadmin: {
    name: 'Virza Super',
    roleLabel: 'Super Admin',
    avatar: 'VS',
  },
}

const currentProfile = computed(() => {
  return profiles[activeRole.value] || profiles.member
})

const logout = () => {
  router.push('/')
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
