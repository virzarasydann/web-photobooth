<script setup>
import { computed } from 'vue'
import { container } from '@/utils/container.js'
import { useAmbilData } from '@/utils/ambilData.js'
import StatusData from '@/components/common/StatusData.vue'
import KategoriPaketView from './KategoriPaketView.vue'
import PaketCardView from './PaketCardView.vue'
import DaftarPaketSkeleton from './DaftarPaketSkeleton.vue'

// Section ini memakai dua file JSON:
// 1. paket-halaman.json : judul, deskripsi, dan kategori
// 2. deskripsi-paket.json : isi kartu (file yang sama
//    dengan yang diedit admin di Manajemen Paket)
const {
  data: dataHalaman,
  loading: memuatHalaman,
  error: errorHalaman,
  muat: muatHalaman,
} = useAmbilData('/DataSource/paket/paket-halaman.json')

const {
  data: dataPaket,
  loading: memuatPaket,
  error: errorPaket,
  muat: muatPaket,
} = useAmbilData('/DataSource/paket/deskripsi-paket.json')

// skeleton tampil selama salah satu masih dimuat
const loading = computed(
  () => memuatHalaman.value || memuatPaket.value,
)
const error = computed(
  () => errorHalaman.value || errorPaket.value,
)
const kosong = computed(() => !dataPaket.value?.length)

// tombol "Coba lagi" memuat ulang keduanya
function muatUlang() {
  muatHalaman()
  muatPaket()
}
</script>

<template>
  <section class="pt-10 pb-14 md:pt-14 md:pb-20">
    <div :class="container">
      <DaftarPaketSkeleton v-if="loading" />

      <StatusData
        v-else-if="error || kosong"
        :error="error"
        :kosong="kosong"
        @ulangi="muatUlang"
      />

      <template v-else>
        <div class="mx-auto max-w-[42rem] text-center">
          <h1
            class="mb-4 text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] font-extrabold text-[#153A2B]"
          >
            {{ dataHalaman.judul }}
          </h1>
          <p
            class="mx-auto max-w-[32rem] text-[0.95rem] leading-relaxed text-[#5b6b64]"
          >
            {{ dataHalaman.deskripsi }}
          </p>
        </div>

        <KategoriPaketView :daftar="dataHalaman.kategori" />

        <div
          class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch"
        >
          <PaketCardView
            v-for="paket in dataPaket"
            :key="paket.id"
            :populer="paket.populer"
            :ikon="paket.ikon"
            :label="paket.label"
            :nama="paket.name"
            :deskripsi="paket.description"
            :harga="paket.harga"
            :satuan="paket.satuan"
            :catatan="paket.catatan"
            :tombol="paket.tombol"
            :href="paket.href"
            :fitur="paket.fitur"
          />
        </div>
      </template>
    </div>
  </section>
</template>
