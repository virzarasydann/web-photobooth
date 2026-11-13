<script setup>
import {
  computed,
  nextTick,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { useRoute } from 'vue-router'
import AppButton from '../button/AppButton.vue'
import BrandLogo from '@/components/common/Layout/Landing-Page-Public/BrandLogo.vue'

// menuAktif: menu yang sedang menyala di halaman landing (dari TopBarV2)
const props = defineProps(['menuAktif'])

// pilih: memberi tahu TopBarV2 menu mana yang diklik
const emit = defineEmits(['pilih'])

const route = useRoute()
const buka = ref(false)
const tombolBuka = ref(null)
const tombolTutup = ref(null)

const daftarMenu = [
  { id: 'beranda', label: 'Beranda', href: '/' },
  {
    id: 'cara-kerja-section',
    label: 'Cara Kerja',
    href: '/#cara-kerja-section',
  },
  { id: 'galeri', label: 'Galeri', href: '/#galeri' },
  { id: 'paket', label: 'Paket', href: '/paket-view' },
]

// Menu yang menyala: di halaman Paket menu Paket,
// di landing page mengikuti posisi scroll
const idAktif = computed(() => {
  if (route.path === '/paket-view') return 'paket'
  if (route.path === '/') return props.menuAktif
  return ''
})

async function bukaSidebar() {
  buka.value = true
  await nextTick()
  tombolTutup.value?.focus()
}

function tutupSidebar() {
  buka.value = false
  tombolBuka.value?.focus()
}

// Tutup sidebar dulu, baru minta TopBarV2 pindah/scroll.
// nextTick memastikan scroll halaman sudah dibuka lagi.
async function pilihMenu(id) {
  buka.value = false
  await nextTick()
  emit('pilih', id)
}

function cekTombol(event) {
  if (event.key === 'Escape') tutupSidebar()
}

// Kalau layar dibesarkan jadi laptop, sidebar ditutup
function cekUkuranLayar() {
  if (window.innerWidth >= 768) buka.value = false
}

watch(buka, (nilai) => {
  // Saat sidebar terbuka, halaman di belakangnya tidak bisa di-scroll
  document.body.style.overflow = nilai ? 'hidden' : ''

  if (nilai) {
    window.addEventListener('keydown', cekTombol)
    window.addEventListener('resize', cekUkuranLayar)
  } else {
    window.removeEventListener('keydown', cekTombol)
    window.removeEventListener('resize', cekUkuranLayar)
  }
})

// Pindah halaman (misalnya lewat tombol Masuk) menutup sidebar
watch(
  () => route.fullPath,
  () => {
    buka.value = false
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', cekTombol)
  window.removeEventListener('resize', cekUkuranLayar)
})
</script>

<template>
  <!-- Tombol hamburger -->
  <button
    ref="tombolBuka"
    type="button"
    class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#E6F0EB] text-[#153A2B] hover:bg-[#D8E1E3]"
    aria-label="Buka menu"
    aria-controls="sidebar-mobile"
    :aria-expanded="buka"
    @click="bukaSidebar"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      class="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  </button>

  <Teleport to="body">
    <!-- Latar gelap di belakang sidebar -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out motion-reduce:transition-none"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-300 ease-in motion-reduce:transition-none"
      leave-to-class="opacity-0"
    >
      <div
        v-if="buka"
        class="fixed inset-0 z-[60] bg-[#153A2B]/50 md:hidden"
        aria-hidden="true"
        @click="tutupSidebar"
      ></div>
    </Transition>

    <!-- Sidebar yang geser dari kiri -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out motion-reduce:transition-none"
      enter-from-class="-translate-x-full"
      leave-active-class="transition-transform duration-300 ease-in motion-reduce:transition-none"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="buka"
        id="sidebar-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        class="fixed inset-y-0 left-0 z-[70] flex w-[18rem] max-w-[85vw] flex-col bg-white shadow-[0_0_24px_rgba(0,0,0,0.18)] md:hidden"
      >
        <div
          class="flex items-center justify-between border-b border-[#E6F0EB] px-4 py-3"
        >
          <BrandLogo size="sm" />
          <button
            ref="tombolTutup"
            type="button"
            class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#153A2B] hover:bg-[#E6F0EB]"
            aria-label="Tutup menu"
            @click="tutupSidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              class="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav
          class="flex-1 overflow-y-auto p-4"
          aria-label="Menu utama"
        >
          <ul class="m-0 flex list-none flex-col gap-1 p-0">
            <li v-for="menu in daftarMenu" :key="menu.id">
              <a
                :href="menu.href"
                class="block rounded-xl px-4 py-3 text-[0.95rem] no-underline"
                :class="
                  idAktif === menu.id
                    ? 'bg-[#2f5440] font-semibold text-white'
                    : 'text-[#153A2B] hover:bg-[#E6F0EB]'
                "
                @click.prevent="pilihMenu(menu.id)"
              >
                {{ menu.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div
          class="flex flex-col gap-3 border-t border-[#E6F0EB] p-4"
        >
          <AppButton
            variant="outline"
            to="/login"
            class="w-full justify-center"
          >
            Masuk
          </AppButton>
          <AppButton
            variant="soft"
            to="/register"
            class="w-full justify-center"
          >
            Daftar
          </AppButton>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
