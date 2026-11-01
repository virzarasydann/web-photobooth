<script setup>
import { container } from '@/utils/container.js'
import AppButton from '../button/AppButton.vue'
import BrandLogo from '@/components/common/Layout/Landing-Page-Public/BrandLogo.vue'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

async function goToSection(id) {
  let el = document.getElementById(id)
  if (!el) {
    await router.push('/')
    await nextTick()
    el = document.getElementById(id)
  }
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    history.replaceState(null, '', `/#${id}`)
  } else {
    console.warn(`Elemen dengan id="${id}" tidak ditemukan`)
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

      <AppButton
        variant="primary"
        size="sm"
        to="/photobooth/guest"
      >
        <!-- Ikon kamera -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-[1.05rem] w-[1.05rem]"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
          <line x1="9.69" y1="8" x2="21.17" y2="8" />
          <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
          <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
          <line x1="14.31" y1="16" x2="2.83" y2="16" />
          <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
        </svg>
        Mulai
      </AppButton>
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
          src="@/assets/img/logo.png"
          alt="Logo Photobooth"
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
                class="block rounded-[50rem] px-2 py-[0.35rem] text-[0.9rem] tracking-[0.3px] no-underline hover:bg-white/15 [&.router-link-exact-active]:bg-white [&.router-link-exact-active]:font-semibold [&.router-link-exact-active]:text-[#153A2B]"
              >
                Beranda
              </RouterLink>
            </li>

            <li>
              <a
                href="/#cara-kerja-section"
                class="block rounded-[50rem] px-2 py-[0.35rem] text-[0.9rem] tracking-[0.3px] text-white no-underline hover:bg-white/15"
                @click.prevent="
                  goToSection('cara-kerja-section')
                "
              >
                Cara Kerja
              </a>
            </li>
            <li>
              <a
                href="/#galeri"
                class="block rounded-[50rem] px-2 py-[0.35rem] text-[0.9rem] tracking-[0.3px] text-white no-underline hover:bg-white/15"
                @click.prevent="goToSection('galeri')"
              >
                Galeri
              </a>
            </li>

            <li>
              <RouterLink
                to="/paket-view"
                class="block rounded-[50rem] px-2 py-[0.35rem] text-[0.9rem] tracking-[0.3px] no-underline hover:bg-white/15 [&.router-link-exact-active]:bg-white [&.router-link-exact-active]:font-semibold [&.router-link-exact-active]:text-[#153A2B]"
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
          <AppButton
            variant="primary"
            to="/photobooth/guest"
          >
            <!-- Ikon kamera -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-[1.1rem] w-[1.1rem]"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line
                x1="14.31"
                y1="8"
                x2="20.05"
                y2="17.94"
              />
              <line x1="9.69" y1="8" x2="21.17" y2="8" />
              <line
                x1="7.38"
                y1="12"
                x2="13.12"
                y2="2.06"
              />
              <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
              <line x1="14.31" y1="16" x2="2.83" y2="16" />
              <line
                x1="16.62"
                y1="12"
                x2="10.88"
                y2="21.94"
              />
            </svg>
            Mulai
          </AppButton>
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
