<script setup>
import { computed } from 'vue'
import { container } from '@/utils/container.js'
import { useAmbilData } from '@/utils/ambilData.js'
import StatusData from '@/components/common/StatusData.vue'
import KualitasCetakSkeleton from './KualitasCetakSkeleton.vue'

const { data, loading, error, muat } = useAmbilData(
  '/DataSource/paket/kualitas-cetak.json',
)

const kosong = computed(() => !data.value?.poin?.length)
</script>

<template>
  <section class="pb-14 md:pb-20">
    <div :class="container">
      <div
        class="overflow-hidden rounded-[1.75rem] border border-[#dce8e2] bg-[url(@/assets/img/bg-paket-wave.png)] bg-cover bg-center bg-no-repeat px-6 py-10 md:px-12 md:py-14"
      >
        <KualitasCetakSkeleton v-if="loading" />

        <StatusData
          v-else-if="error || kosong"
          :error="error"
          :kosong="kosong"
          @ulangi="muat"
        />

        <div
          v-else
          class="grid grid-cols-1 items-center gap-10 min-[62rem]:grid-cols-2 min-[62rem]:gap-12"
        >
          <div>
            <span
              class="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E6F0EB] px-4 py-1.5 text-[0.78rem] font-medium text-[#153A2B]"
            >
              {{ data.label }}
            </span>
            <h2
              class="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] font-extrabold text-[#153A2B]"
            >
              {{ data.judul }}
            </h2>
            <p
              class="text-[0.95rem] leading-relaxed text-[#5b6b64]"
            >
              {{ data.deskripsi }}
            </p>

            <div
              class="mt-6 grid grid-cols-1 gap-4 min-[36rem]:grid-cols-2"
            >
              <div
                v-for="poin in data.poin"
                :key="poin.judul"
                class="rounded-xl border border-[#dce8e2] bg-[#F3FAF6] p-4"
              >
                <h3
                  class="mb-1 text-[0.95rem] font-bold text-[#153A2B]"
                >
                  {{ poin.judul }}
                </h3>
                <p
                  class="text-[0.82rem] leading-relaxed text-[#5b6b64]"
                >
                  {{ poin.deskripsi }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <figure
              class="w-[70%] max-w-[18rem] -rotate-5 rounded-2xl border border-[#153A2B] bg-white p-3 shadow-[0_10px_24px_rgba(21,58,43,0.15)]"
            >
              <img
                src="@/assets/img/ilustration-animation-1.png"
                :alt="data.altGambar"
                class="h-64 w-full rounded-xl object-cover"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
