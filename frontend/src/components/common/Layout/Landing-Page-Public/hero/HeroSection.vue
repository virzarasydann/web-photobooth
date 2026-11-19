<script setup>
import { ref, computed } from 'vue'
import { container } from '@/utils/container.js'
import { useAmbilData } from '@/utils/ambilData.js'
import StatusData from '@/components/common/StatusData.vue'
import SkeletonBox from '@/components/common/SkeletonBox.vue'
// import AppButton from '@/components/common/button/AppButton.vue'
import HeroSkeleton from './HeroSkeleton.vue'

const { data, loading, error, muat } = useAmbilData(
  '/data/hero.json',
)

const kosong = computed(() => !data.value?.judulAwal)

// Skeleton gambar tampil sampai banner selesai dimuat
const gambarSiap = ref(false)
</script>

<template>
  <main
    class="flex flex-1 items-center pt-8 pb-6 md:pt-16 md:pb-8"
  >
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
            <span
              class="relative inline-block text-[#7E3300]"
            >
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
