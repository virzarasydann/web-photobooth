<script setup>
import { computed } from 'vue'
import AppButton from '@/components/common/button/AppButton.vue'
import { container } from '@/utils/container.js'
import { useAmbilData } from '@/utils/ambilData.js'
import CtaSkeleton from './CtaSkeleton.vue'

const { data, loading, error, muat } = useAmbilData(
  '/data/cta.json',
)

const kosong = computed(() => !data.value?.judul)
</script>

<template>
  <section class="py-14 md:py-20">
    <div :class="container">
      <div
        class="relative overflow-hidden rounded-[1.75rem] bg-[#2D5141] px-6 py-10 md:px-12 md:py-14"
      >
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#3a6551] opacity-60 blur-2xl"
        ></div>

        <CtaSkeleton v-if="loading" />

        <!-- Latar gelap, jadi pesan error ditulis di sini -->
        <div
          v-else-if="error || kosong"
          class="relative py-6 text-center"
        >
          <p class="mb-4 text-[#c9dbd1]">
            {{ error || 'Data belum tersedia.' }}
          </p>
          <button
            type="button"
            class="cursor-pointer rounded-full bg-[#FCC046] px-5 py-2 text-[0.85rem] font-bold text-[#153A2B]"
            @click="muat"
          >
            Coba lagi
          </button>
        </div>

        <div
          v-else
          class="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="max-w-[36rem]">
            <span
              class="mb-5 inline-flex items-center gap-2 rounded-full bg-[#153A2B] px-4 py-1.5 text-[0.78rem] font-medium text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              {{ data.label }}
            </span>

            <h2
              class="mb-3 text-[clamp(1.8rem,4vw,2.75rem)] leading-[1.1] font-extrabold text-white"
            >
              {{ data.judul }}
            </h2>

            <p
              class="text-[0.98rem] leading-relaxed text-[#c9dbd1]"
            >
              {{ data.deskripsi }}
            </p>
          </div>

          <div
            class="flex shrink-0 flex-wrap items-center gap-3"
          >
            <AppButton
              v-for="tombol in data.tombol"
              :key="tombol.teks"
              :variant="tombol.varian"
              :to="tombol.link"
            >
              {{ tombol.teks }}
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
