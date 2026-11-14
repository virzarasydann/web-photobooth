<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { container } from '@/utils/container.js'
import { useAmbilData } from '@/utils/ambilData.js'
import FooterSkeleton from './FooterSkeleton.vue'

const { data, loading, error, muat } = useAmbilData(
  '/data/footer.json',
)

const kosong = computed(() => !data.value?.menu?.item?.length)

function scrollKe(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const linkClass =
  'text-[#E3EDE7] no-underline transition-colors duration-200 hover:text-[#FCC046]'

const headingClass =
  'mb-4 text-[0.8rem] font-semibold tracking-[0.12em] text-[#FCC046] uppercase'
</script>

<template>
  <footer
    class="relative rounded-t-[2rem] bg-[#153A2B] text-white max-md:pb-2"
  >
    <div :class="[container, 'pt-12 pb-6']">
      <FooterSkeleton v-if="loading" />

      <!-- Latar gelap, jadi pesan error ditulis di sini -->
      <div
        v-else-if="error || kosong"
        class="py-8 text-center"
      >
        <p class="mb-4 text-[#C9DBD1]">
          {{ error || 'Data footer belum tersedia.' }}
        </p>
        <button
          type="button"
          class="cursor-pointer rounded-full bg-[#FCC046] px-5 py-2 text-[0.85rem] font-bold text-[#153A2B]"
          @click="muat"
        >
          Coba lagi
        </button>
      </div>

      <template v-else>
        <div
          class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.6fr_1fr_1fr] md:gap-12"
        >
          <!-- Logo + deskripsi -->
          <div class="col-span-2 md:col-span-1">
            <img
              src="@/assets/img/logo.png"
              alt="Logo Photobooth"
              class="mb-4 block h-12 w-auto"
            />
            <p
              class="max-w-[24rem] text-[0.9rem] leading-[1.7] text-[#C9DBD1]"
            >
              {{ data.deskripsi }}
            </p>
          </div>

          <!-- Menu -->
          <div>
            <h3 :class="headingClass">{{ data.menu.judul }}</h3>
            <ul
              class="m-0 flex list-none flex-col gap-3 p-0 text-[0.9rem]"
            >
              <li v-for="item in data.menu.item" :key="item.teks">
                <!-- Menu yang scroll ke section -->
                <a
                  v-if="item.scroll"
                  :href="'#' + item.scroll"
                  :class="linkClass"
                  @click.prevent="scrollKe(item.scroll)"
                >
                  {{ item.teks }}
                </a>
                <!-- Menu yang pindah halaman -->
                <RouterLink
                  v-else
                  :to="item.link"
                  :class="linkClass"
                >
                  {{ item.teks }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Kontak -->
          <div>
            <h3 :class="headingClass">{{ data.kontak.judul }}</h3>
            <ul
              class="m-0 flex list-none flex-col gap-3 p-0 text-[0.9rem] text-[#E3EDE7]"
            >
              <li v-for="item in data.kontak.item" :key="item.teks">
                <a
                  v-if="item.href"
                  :href="item.href"
                  :class="linkClass"
                >
                  {{ item.teks }}
                </a>
                <template v-else>{{ item.teks }}</template>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-10 border-t border-white/15 pt-5 text-center text-[0.8rem] text-[#9DB8AA]"
        >
          {{ data.hakCipta }}
        </div>
      </template>
    </div>
  </footer>
</template>
