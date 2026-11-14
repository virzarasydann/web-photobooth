<script setup>
import { computed } from 'vue'
import { container } from '@/utils/container.js'
import { useAmbilData } from '@/utils/ambilData.js'
import StatusData from '@/components/common/StatusData.vue'
import CaraKerjaCard from './CaraKerjaCard.vue'
import CaraKerjaSkeleton from './CaraKerjaSkeleton.vue'

const { data, loading, error, muat } = useAmbilData(
  '/data/cara-kerja.json',
)

const kosong = computed(() => !data.value?.langkah?.length)
</script>

<template>
  <section id="cara-kerja-section" class="py-14 md:py-20">
    <div :class="container">
      <CaraKerjaSkeleton v-if="loading" />

      <StatusData
        v-else-if="error || kosong"
        :error="error"
        :kosong="kosong"
        @ulangi="muat"
      />

      <template v-else>
        <div
          class="mx-auto mb-12 max-w-[42rem] text-center"
        >
          <p
            class="mb-2 text-[0.86rem] font-bold tracking-[0.15em] text-[#BE523C] uppercase"
          >
            {{ data.label }}
          </p>
          <h2
            class="text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] font-extrabold text-[#153A2B]"
          >
            {{ data.judul }}
          </h2>
          <p
            class="mt-3 text-[0.95rem] leading-relaxed font-semibold text-[#4D534F]"
          >
            {{ data.deskripsi }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 gap-8 min-[62rem]:grid-cols-2 min-[62rem]:items-stretch min-[62rem]:gap-6"
        >
          <div
            class="order-2 grid grid-cols-1 gap-5 sm:grid-cols-2 min-[62rem]:order-1"
          >
            <CaraKerjaCard
              v-for="langkah in data.langkah"
              :key="langkah.nomor"
              :nomor="langkah.nomor"
              :judul="langkah.judul"
              :deskripsi="langkah.deskripsi"
              :ikon="langkah.ikon"
              :warna-ikon="langkah.warnaIkon"
              :warna-teks-ikon="langkah.warnaTeksIkon"
              :fitur="langkah.fitur"
              :gelap="langkah.gelap"
            />
          </div>

          <div
            class="order-1 flex items-center justify-center min-[62rem]:relative min-[62rem]:order-2"
          >
            <img
              src="@/assets/img/banner-2.png"
              alt="Ilustrasi cara kerja Sleepy Ruben"
              class="h-auto max-h-[28rem] w-auto max-w-full rounded-[1.25rem] object-contain min-[62rem]:absolute min-[62rem]:inset-0 min-[62rem]:h-full min-[62rem]:max-h-none min-[62rem]:w-full"
            />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
