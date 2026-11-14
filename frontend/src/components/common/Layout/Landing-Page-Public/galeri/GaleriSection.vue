<script setup>
import { ref, computed } from 'vue'
import { container } from '@/utils/container.js'
import { useAmbilData } from '@/utils/ambilData.js'
import StatusData from '@/components/common/StatusData.vue'
import GaleriCard from './GaleriCard.vue'
import GaleriSkeleton from './GaleriSkeleton.vue'

const { data, loading, error, muat } = useAmbilData(
  '/data/galeri.json',
)

const tabAktif = ref('all')

const kosong = computed(() => !data.value?.frame?.length)

// Frame yang tampil mengikuti tab yang dipilih
const frameTampil = computed(() => {
  if (tabAktif.value === 'all') return data.value.frame
  return data.value.frame.filter(
    (item) => item.kategori === tabAktif.value,
  )
})
</script>

<template>
  <section
    id="galeri"
    class="relative pt-20 pb-14 md:pt-35 md:pb-20"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 -top-48 h-[40rem] bg-[radial-gradient(ellipse_96%_18rem_at_50%_6rem,#FCC046,transparent)] opacity-55"
    ></div>

    <div :class="container">
      <div class="relative">
        <div
          aria-hidden="true"
          class="absolute inset-x-8 -top-6 bottom-0 rounded-[1.75rem] bg-[#FCC046] shadow-[0_6px_14px_rgba(0,0,0,0.12)] md:inset-x-16 md:-top-8"
        ></div>

        <div
          aria-hidden="true"
          class="absolute inset-x-4 -top-3 bottom-0 rounded-[1.75rem] bg-[#CD692C] shadow-[0_6px_14px_rgba(0,0,0,0.12)] md:inset-x-8 md:-top-4"
        ></div>

        <div
          class="relative rounded-[1.75rem] border border-[#d5e2db] bg-[#E6F0EB] p-6 shadow-[0_6px_14px_rgba(0,0,0,0.12)] md:p-10"
        >
          <GaleriSkeleton v-if="loading" />

          <StatusData
            v-else-if="error || kosong"
            :error="error"
            :kosong="kosong"
            @ulangi="muat"
          />

          <template v-else>
            <div
              class="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
            >
              <div class="max-w-[34rem]">
                <p
                  class="mb-2 text-[0.8rem] font-semibold tracking-[0.15em] text-[#7E3300] uppercase"
                >
                  {{ data.label }}
                </p>
                <h2
                  class="mb-3 text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.1] font-extrabold text-[#153A2B]"
                >
                  {{ data.judul }}
                </h2>
                <p
                  class="text-[0.95rem] leading-relaxed text-[#5b6b64]"
                >
                  {{ data.deskripsi }}
                </p>
              </div>

              <div
                class="flex flex-wrap items-center gap-2 md:justify-end"
              >
                <button
                  v-for="tab in data.tab"
                  :key="tab.value"
                  type="button"
                  class="cursor-pointer rounded-full px-4 py-2 text-[0.82rem] font-medium transition-colors duration-200"
                  :class="
                    tabAktif === tab.value
                      ? 'bg-[#2D5141] text-white'
                      : 'border border-[#c3d3cb] bg-white text-[#153A2B] hover:bg-[#f4faf6]'
                  "
                  @click="tabAktif = tab.value"
                >
                  {{ tab.label }}
                </button>
              </div>
            </div>

            <StatusData v-if="!frameTampil.length" kosong />

            <div
              v-else
              class="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[62rem]:grid-cols-4"
            >
              <GaleriCard
                v-for="item in frameTampil"
                :key="item.judul"
                :gambar="item.gambar"
                :judul="item.judul"
                :deskripsi="item.deskripsi"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
