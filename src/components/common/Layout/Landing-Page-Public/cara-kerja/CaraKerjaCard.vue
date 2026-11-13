<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import IkonSvg from '@/components/common/IkonSvg.vue'

const props = defineProps([
  'nomor',
  'judul',
  'deskripsi',
  'ikon',
  'warnaIkon',
  'warnaTeksIkon',
  'fitur',
  'gelap',
])

// Warna kartu terang dan kartu gelap
const temaTerang = {
  kartu: 'bg-[#FFF8EC]',
  nomor: 'text-[#CD692C]',
  judul: 'text-[#153A2B]',
  deskripsi: 'text-[#4a574f]',
  garis: 'border-[#153A2B]/30',
  fitur: 'text-[#7E3300]',
}

const temaGelap = {
  kartu: 'bg-[#2D5141]',
  nomor: 'text-[#FCC046]',
  judul: 'text-white',
  deskripsi: 'text-[#d3e3da]',
  garis: 'border-white/30',
  fitur: 'text-[#FCC046] no-underline hover:underline',
}

const tema = computed(() =>
  props.gelap ? temaGelap : temaTerang,
)
</script>

<template>
  <article
    :class="[
      tema.kartu,
      'flex h-full flex-col rounded-2xl border-2 border-[#153A2B] p-6 shadow-[5px_5px_0_#153A2B] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#153A2B]',
    ]"
  >
    <div class="mb-5 flex items-start justify-between">
      <div
        class="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#153A2B]"
        :style="{
          backgroundColor: warnaIkon,
          color: warnaTeksIkon,
        }"
      >
        <IkonSvg
          :nama="ikon"
          :tebal="1.8"
          class="h-7 w-7"
        />
      </div>
      <span
        :class="[
          tema.nomor,
          'text-[2.5rem] leading-none font-extrabold',
        ]"
      >
        {{ nomor }}
      </span>
    </div>

    <h3
      :class="[tema.judul, 'mb-2 text-[1.2rem] font-bold']"
    >
      {{ judul }}
    </h3>
    <p
      :class="[
        tema.deskripsi,
        'mb-5 text-[0.9rem] leading-relaxed',
      ]"
    >
      {{ deskripsi }}
    </p>

    <div
      :class="[
        tema.garis,
        'mt-auto border-t-2 border-dashed pt-4',
      ]"
    >
      <component
        :is="fitur.link ? RouterLink : 'span'"
        :to="fitur.link"
        :class="[
          tema.fitur,
          'inline-flex items-center gap-2 text-[0.85rem] font-bold',
        ]"
      >
        <IkonSvg :nama="fitur.ikon" class="h-4 w-4" />
        {{ fitur.teks }}
      </component>
    </div>
  </article>
</template>
