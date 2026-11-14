<script setup>
import { container } from '@/utils/container.js'
import AppButton from '../button/AppButton.vue'
import BrandLogo from '@/components/common/Layout/Landing-Page-Public/BrandLogo.vue'
import ButtonStart from '../button/ButtonStart.vue'
import MenuMobile from './MenuMobile.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Menu yang scroll ke section di halaman landing
const menuSection = [
  { id: 'cara-kerja-section', label: 'Cara Kerja' },
  { id: 'galeri', label: 'Galeri' },
]

// Class yang sama untuk semua item menu
const kelasMenu =
  'block rounded-[50rem] px-2 py-[0.35rem] text-[0.9rem] tracking-[0.3px] no-underline hover:bg-white/15'
const kelasAktif = 'bg-white font-semibold text-[#153A2B]'

const menuAktif = ref('beranda')

let sedangScrollOtomatis = false

function cekPosisiScroll() {
  if (route.path !== '/' || sedangScrollOtomatis) return

  const batas = window.innerHeight * 0.4
  const caraKerja = document.getElementById(
    'cara-kerja-section',
  )
  const galeri = document.getElementById('galeri')

  if (
    galeri &&
    galeri.getBoundingClientRect().top <= batas
  ) {
    menuAktif.value = 'galeri'
  } else if (
    caraKerja &&
    caraKerja.getBoundingClientRect().top <= batas
  ) {
    menuAktif.value = 'cara-kerja-section'
  } else {
    menuAktif.value = 'beranda'
  }
}

onMounted(() => {
  window.addEventListener('scroll', cekPosisiScroll)
  cekPosisiScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', cekPosisiScroll)
})

watch(
  () => route.path,
  () => {
    menuAktif.value = 'beranda'
    setTimeout(cekPosisiScroll, 200)
  },
)

function kunciSebentar() {
  sedangScrollOtomatis = true
  setTimeout(() => {
    sedangScrollOtomatis = false
    cekPosisiScroll()
  }, 1000)
}

function goToBeranda() {
  menuAktif.value = 'beranda'
  if (route.path === '/') {
    kunciSebentar()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.replaceState(null, '', '/')
  } else {
    router.push('/')
  }
}

async function goToSection(id) {
  let el = document.getElementById(id)

  if (!el) {
    await router.push('/')
    for (let i = 0; i < 20 && !el; i++) {
      await new Promise((resolve) =>
        setTimeout(resolve, 50),
      )
      el = document.getElementById(id)
    }
  }

  if (el) {
    menuAktif.value = id
    kunciSebentar()
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    history.replaceState(null, '', `/#${id}`)
  } else {
    console.warn(`Elemen dengan id="${id}" tidak ditemukan`)
  }
}

// Menu dari sidebar mobile menjalankan fungsi yang sama
// dengan menu di navbar laptop
function klikMenuMobile(id) {
  if (id === 'beranda') {
    goToBeranda()
  } else if (id === 'paket') {
    router.push('/paket-view')
  } else {
    goToSection(id)
  }
}
</script>

<template>
  <header
    class="border-b border-[#E6F0EB] bg-white md:hidden"
  >
    <div
      :class="[
        container,
        'flex items-center justify-between py-3',
      ]"
    >
      <RouterLink
        to="/"
        class="no-underline"
        aria-label="Sleepy Ruben - Beranda"
      >
        <BrandLogo size="sm" />
      </RouterLink>

      <div class="flex items-center gap-2">
        <ButtonStart size="sm" />
        <MenuMobile
          :menu-aktif="menuAktif"
          @pilih="klikMenuMobile"
        />
      </div>
    </div>
  </header>

  <div
    class="sticky top-0 z-50 hidden bg-white/60 backdrop-blur-md md:block"
  >
    <header :class="[container, 'py-4']">
      <div class="flex flex-wrap items-center gap-4">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="shrink-0 no-underline mx-auto mb-3 block h-12 w-auto md:mx-0"
          aria-label="Sleepy Ruben - Beranda"
        >
          <BrandLogo />
        </RouterLink>

        <nav
          class="relative order-last flex min-h-[50px] basis-full items-center rounded-[50rem] bg-[#2f5440] py-2 text-white min-[62rem]:order-none min-[62rem]:grow min-[62rem]:basis-auto"
          aria-label="Navigasi utama"
        >
          <ul
            class="m-0 flex w-full list-none flex-row justify-center gap-6 p-0"
          >
            <li>
              <RouterLink
                to="/"
                :class="[
                  kelasMenu,
                  route.path === '/' &&
                  menuAktif === 'beranda'
                    ? kelasAktif
                    : 'text-white',
                ]"
                @click.prevent="goToBeranda"
              >
                Beranda
              </RouterLink>
            </li>

            <li v-for="menu in menuSection" :key="menu.id">
              <a
                :href="`/#${menu.id}`"
                :class="[
                  kelasMenu,
                  menuAktif === menu.id
                    ? kelasAktif
                    : 'text-white',
                ]"
                @click.prevent="goToSection(menu.id)"
              >
                {{ menu.label }}
              </a>
            </li>

            <li>
              <RouterLink
                to="/paket-view"
                :class="kelasMenu"
                class="[&.router-link-exact-active]:bg-white [&.router-link-exact-active]:font-semibold [&.router-link-exact-active]:text-[#153A2B]"
              >
                Paket
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div
          class="ml-auto flex shrink-0 items-center gap-3 min-[62rem]:ml-0"
        >
          <AppButton variant="outline" to="/login">
            Masuk
          </AppButton>
          <AppButton variant="soft" to="/register">
            Daftar
          </AppButton>
          <ButtonStart />
        </div>
      </div>
    </header>
  </div>
</template>

<style>
@media (min-width: 768px) {
  html {
    scroll-padding-top: 6rem;
  }
}
</style>
