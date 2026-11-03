<script setup>
import { ref } from 'vue'
import { container } from '@/utils/container.js'

const tabs = [
  { label: 'Semua Frame', value: 'all' },
  { label: 'Klasik 4-Cut', value: 'klasik' },
  { label: 'Grid 2×2', value: 'grid' },
  { label: 'Wide Duo', value: 'wide' },
]

const tabAktif = ref('all')
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
          <div
            class="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div class="max-w-[34rem]">
              <p
                class="mb-2 text-[0.8rem] font-semibold tracking-[0.15em] text-[#7E3300] uppercase"
              >
                Inspirasi Koleksi
              </p>
              <h2
                class="mb-3 text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.1] font-extrabold text-[#153A2B]"
              >
                Pilihan Format & Gaya Foto
              </h2>
              <p
                class="text-[0.95rem] leading-relaxed text-[#5b6b64]"
              >
                Eksplorasi ragam layout foto strip: dari
                format vertikal 4-kotak klasik sampai grid
                2×2 modern minimalis.
              </p>
            </div>

            <div
              class="flex flex-wrap items-center gap-2 md:justify-end"
            >
              <button
                v-for="tab in tabs"
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

          <div
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[62rem]:grid-cols-4"
          >
            <figure
              v-show="
                tabAktif === 'all' || tabAktif === 'klasik'
              "
              class="group h-full overflow-hidden rounded-[1.25rem] border border-[#dce8e2] bg-white p-2 shadow-[0_2px_10px_rgba(21,58,43,0.04)]"
            >
              <img
                src="@/assets/img/img-public-page-V2/img-ilustration-party.png"
                alt="Midnight Party"
                class="h-64 w-full rounded-[0.9rem] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <figcaption class="px-2 pt-3 pb-2">
                <h3
                  class="text-[0.98rem] font-bold text-[#153A2B]"
                >
                  Midnight Party
                </h3>
                <p
                  class="mt-0.5 text-[0.82rem] text-[#5b6b64]"
                >
                  Frame Noir • Grain +40
                </p>
              </figcaption>
            </figure>

            <figure
              v-show="
                tabAktif === 'all' || tabAktif === 'klasik'
              "
              class="group h-full overflow-hidden rounded-[1.25rem] border border-[#dce8e2] bg-white p-2 shadow-[0_2px_10px_rgba(21,58,43,0.04)]"
            >
              <img
                src="@/assets/img/img-public-page-V2/img-ilustration-partner.png"
                alt="Classic Monochrome"
                class="h-64 w-full rounded-[0.9rem] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <figcaption class="px-2 pt-3 pb-2">
                <h3
                  class="text-[0.98rem] font-bold text-[#153A2B]"
                >
                  Classic Monochrome
                </h3>
                <p
                  class="mt-0.5 text-[0.82rem] text-[#5b6b64]"
                >
                  Frame Putih Salju • B&W Film
                </p>
              </figcaption>
            </figure>

            <figure
              v-show="
                tabAktif === 'all' || tabAktif === 'grid'
              "
              class="group h-full overflow-hidden rounded-[1.25rem] border border-[#dce8e2] bg-white p-2 shadow-[0_2px_10px_rgba(21,58,43,0.04)]"
            >
              <img
                src="@/assets/img/img-public-page-V2/img-ilustratrion-bestfreind.png"
                alt="Sunburst Mustard"
                class="h-64 w-full rounded-[0.9rem] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <figcaption class="px-2 pt-3 pb-2">
                <h3
                  class="text-[0.98rem] font-bold text-[#153A2B]"
                >
                  Sunburst Mustard
                </h3>
                <p
                  class="mt-0.5 text-[0.82rem] text-[#5b6b64]"
                >
                  Frame Mustard • Golden Hour
                </p>
              </figcaption>
            </figure>

            <figure
              v-show="
                tabAktif === 'all' || tabAktif === 'wide'
              "
              class="group h-full overflow-hidden rounded-[1.25rem] border border-[#dce8e2] bg-white p-2 shadow-[0_2px_10px_rgba(21,58,43,0.04)]"
            >
              <img
                src="@/assets/img/img-public-page-V2/img-ilustration-pet.png"
                alt="Pet & Companion"
                class="h-64 w-full rounded-[0.9rem] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <figcaption class="px-2 pt-3 pb-2">
                <h3
                  class="text-[0.98rem] font-bold text-[#153A2B]"
                >
                  Pet & Companion
                </h3>
                <p
                  class="mt-0.5 text-[0.82rem] text-[#5b6b64]"
                >
                  Forest Green Frame • Warm Tungsten
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
