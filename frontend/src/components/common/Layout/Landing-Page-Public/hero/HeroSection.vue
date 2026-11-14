<script setup>
import { ref, computed } from 'vue'
import { container } from '@/utils/container.js'
import { useAmbilData } from '@/utils/ambilData.js'
import StatusData from '@/components/common/StatusData.vue'
import SkeletonBox from '@/components/common/SkeletonBox.vue'
import AppButton from '@/components/common/button/AppButton.vue'
import HeroSkeleton from './HeroSkeleton.vue'

const { data, loading, error, muat } = useAmbilData(
  '/data/hero.json',
)

const kosong = computed(() => !data.value?.judulAwal)

// Skeleton gambar tampil sampai banner selesai dimuat
const gambarSiap = ref(false)
</script>

<template>
  <main class="flex flex-1 items-center pt-8 pb-6 md:pt-16 md:pb-8">
    <div :class="[container, 'w-full']">
      <HeroSkeleton v-if="loading" />

      <StatusData
        v-else-if="error || kosong"
        :error="error"
        :kosong="kosong"
        @ulangi="muat"
      />

      <div
        v-else
        class="grid grid-cols-1 items-center gap-6 md:grid-cols-2 min-[62rem]:gap-12"
      >
        <!-- Teks hero -->
        <div class="text-center md:text-start">
          <h1
            class="mb-4 text-[clamp(2.4rem,6vw,4rem)] leading-[1.06] font-extrabold tracking-[-0.02em] text-[#153A2B]"
          >
            {{ data.judulAwal }}
            <span class="relative inline-block text-[#7E3300]">
              {{ data.judulSorot }}
              <svg
                viewBox="0 0 220 12"
                preserveAspectRatio="none"
                aria-hidden="true"
                class="absolute -bottom-1 left-0 h-2.5 w-full text-[#7E3300]"
              >
                <path
                  d="M3 8 Q 15 2 27 8 T 51 8 T 75 8 T 99 8 T 123 8 T 147 8 T 171 8 T 195 8 T 217 8"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            {{ data.judulAkhir }}
          </h1>

          <p
            class="mx-auto mt-4 mb-8 max-w-[22rem] text-base leading-[1.35] text-[#111] md:mx-0"
          >
            {{ data.deskripsi }}
          </p>

          <div
            class="flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <AppButton
              v-for="tombol in data.tombol"
              :key="tombol.teks"
              :variant="tombol.varian"
              :to="tombol.link"
            >
              <!-- Ikon kamera hanya untuk tombol yang meminta -->
              <svg
                v-if="tombol.ikon === 'kamera'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-[1.15rem] w-[1.15rem]"
                aria-hidden="true"
              >
                <path
                  d="M9.4 4.5c.2-.5.7-.8 1.2-.8h2.8c.5 0 .9.3 1.2.8l.6 1.1H18a3 3 0 0 1 3 3V16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8.6a3 3 0 0 1 3-3h2.8l.6-1.1ZM12 9.2A3.3 3.3 0 1 0 12 15.8 3.3 3.3 0 0 0 12 9.2Z"
                />
              </svg>
              {{ tombol.teks }}
            </AppButton>
          </div>
        </div>

        <!-- Banner -->
        <div class="text-center">
          <SkeletonBox
            v-if="!gambarSiap"
            class="mx-auto h-72 w-full max-w-[28rem] rounded-[1.25rem] md:h-[28rem]"
          />
          <img
            v-show="gambarSiap"
            :src="data.gambar"
            :alt="data.altGambar"
            class="inline h-auto max-h-[480px] w-auto max-w-full align-middle"
            @load="gambarSiap = true"
            @error="gambarSiap = true"
          />
        </div>
      </div>
    </div>
  </main>
</template>
