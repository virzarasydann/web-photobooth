<script setup>
import { computed } from 'vue'
import IkonSvg from '@/components/common/IkonSvg.vue'

const props = defineProps(['teks'])

// Di JSON, teks yang diapit tanda ** ditampilkan tebal.
// Contoh: "**4 kali jepretan** foto" dipecah menjadi
// "", "4 kali jepretan", dan " foto".
// Potongan urutan ganjil (1, 3, ...) adalah yang tebal.
const potongan = computed(() =>
  props.teks.split('**').map((isi, urutan) => ({
    isi,
    tebal: urutan % 2 === 1,
  })),
)
</script>

<template>
  <li
    class="flex items-start gap-3 text-[0.85rem] leading-snug text-[#3f4d46]"
  >
    <span
      class="mt-0.5 flex h-[1.1rem] w-[1.1rem] shrink-0 items-center justify-center rounded-full bg-[#2D5141] text-white"
    >
      <IkonSvg
        nama="centang"
        :tebal="3.5"
        class="h-2.5 w-2.5"
      />
    </span>
    <span
      class="[&_strong]:font-bold [&_strong]:text-[#153A2B]"
    >
      <template
        v-for="(bagian, urutan) in potongan"
        :key="urutan"
      >
        <strong v-if="bagian.tebal">
          {{ bagian.isi }}
        </strong>
        <template v-else>{{ bagian.isi }}</template>
      </template>
    </span>
  </li>
</template>
