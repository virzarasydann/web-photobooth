<script setup>
import { computed } from 'vue'
import { container } from '@/utils/container.js'
import { useAmbilData } from '@/utils/ambilData.js'
import StatusData from '@/components/common/StatusData.vue'
import KomparasiPaketSkeleton from './KomparasiPaketSkeleton.vue'

// Nama kolom diambil dari deskripsi-paket.json, jadi kalau
// admin mengganti nama paket, tabel ini ikut berubah.
// Isi barisnya ada di komparasi-paket.json
const {
  data,
  loading: memuatTabel,
  error: errorTabel,
  muat: muatTabel,
} = useAmbilData('/DataSource/paket/komparasi-paket.json')

const {
  data: dataPaket,
  loading: memuatPaket,
  error: errorPaket,
  muat: muatPaket,
} = useAmbilData('/DataSource/paket/deskripsi-paket.json')

const loading = computed(
  () => memuatTabel.value || memuatPaket.value,
)
const error = computed(
  () => errorTabel.value || errorPaket.value,
)
const kosong = computed(() => !data.value?.baris?.length)

function muatUlang() {
  muatTabel()
  muatPaket()
}
</script>

<template>
  <section class="pb-14 md:pb-20">
    <div :class="container">
      <KomparasiPaketSkeleton v-if="loading" />

      <StatusData
        v-else-if="error || kosong"
        :error="error"
        :kosong="kosong"
        @ulangi="muatUlang"
      />

      <template v-else>
        <div class="mx-auto mb-8 max-w-[42rem] text-center">
          <h2
            class="mb-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] font-extrabold text-[#153A2B]"
          >
            {{ data.judul }}
          </h2>
          <p class="text-[0.9rem] text-[#5b6b64]">
            {{ data.deskripsi }}
          </p>
        </div>

        <div
          class="overflow-x-auto rounded-2xl border border-[#dce8e2] bg-white"
        >
          <table
            class="w-full min-w-[42rem] border-collapse text-left text-[0.85rem]"
          >
            <thead>
              <tr class="bg-[#F3FAF6] text-[#153A2B]">
                <th class="px-5 py-4 font-semibold">
                  {{ data.judulKolom }}
                </th>
                <th
                  v-for="paket in dataPaket"
                  :key="paket.id"
                  class="px-5 py-4 text-center font-semibold"
                >
                  {{ paket.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="baris in data.baris"
                :key="baris.fitur"
                class="border-t border-[#eef2f0]"
              >
                <td
                  class="px-5 py-4 font-medium text-[#153A2B]"
                >
                  {{ baris.fitur }}
                </td>
                <td
                  v-for="(nilai, urutan) in baris.nilai"
                  :key="urutan"
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  {{ nilai }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </section>
</template>
