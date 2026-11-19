<template>
  <!-- halaman galeri -->
  <section class="min-h-full bg-[#F7F8F6] text-[#183b28] px-4 py-5 sm:p-6 md:p-8">
    <!-- info offline -->
    <p v-if="sedangOffline" role="status"
      class="mb-4 p-3 rounded-xl bg-yellow-100 text-yellow-800 border border-yellow-200 text-sm font-semibold">
      Kamu sedang offline. Hapus, unduh, dan cetak foto tidak bisa dilakukan sampai koneksi kembali.
    </p>

    <!-- judul -->
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div class="flex flex-wrap items-center gap-2 sm:gap-3">
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2F523E]">Galeri Photobooth</h1>
          <span class="rounded-full bg-[#E6ECE8] px-2.5 py-0.5 text-xs font-semibold text-[#2F523E] sm:text-sm">
            {{ daftarFoto.length }} Sesi
          </span>
        </div>
        <p class="mt-1.5 text-sm text-gray-500">
          Koleksi sesi foto tersimpan. Klik foto untuk melihat ukuran penuh.
        </p>
      </div>

      <!-- tombol atas -->
      <div class="flex gap-2 sm:gap-3">
        <!-- hapus semua -->
        <button type="button" @click="bukaKonfirmasiBersihkan" :disabled="daftarFoto.length === 0"
          class="flex-1 sm:flex-none inline-flex h-10 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 cursor-pointer transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
            stroke="currentColor" class="h-4 w-4" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          Bersihkan
        </button>

        <RouterLink to="/member"
          class="flex-1 sm:flex-none inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2F523E] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#183b28]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
            stroke="currentColor" class="h-4 w-4" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
          </svg>
          Ambil Foto Baru
        </RouterLink>
      </div>
    </div>

    <!-- loading -->
    <div v-if="sedangMemuat" class="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-start">
      <div v-for="nomor in 8" :key="nomor">
        <SkeletonBox class="w-full aspect-[3/4] rounded-2xl sm:rounded-3xl" />
        <SkeletonBox class="mt-3 mx-auto h-4 w-3/4 rounded-full" />
        <SkeletonBox class="mt-2 mx-auto h-3 w-1/2 rounded-full" />
      </div>
    </div>

    <!-- gagal muat -->
    <StatusData v-else-if="pesanGagalMuat !== ''" :error="pesanGagalMuat" @ulangi="muatUlangGaleri" />

    <!-- berhasil muat -->
    <div v-else>
      <!-- API gagal -->
      <div v-if="apiGagal" role="alert"
        class="mt-6 flex flex-col gap-3 rounded-xl border border-yellow-200 bg-yellow-100 p-3 text-sm font-semibold text-yellow-800 sm:flex-row sm:items-center">
        <p class="flex-1">Foto dari server gagal dimuat, sementara ditampilkan gambar template.</p>
        <button type="button" @click="muatUlangFotoApi"
          class="inline-flex h-9 items-center justify-center rounded-full bg-[#2F523E] px-4 text-white cursor-pointer transition hover:bg-[#183b28]">
          Coba lagi
        </button>
      </div>

      <!-- filter -->
      <div class="mt-6 flex flex-wrap gap-2 border-b border-gray-200 pb-5">
        <button type="button" @click="pilihFilter(0)"
          :class="filterSlot === 0 ? 'bg-[#2F523E] text-white border-[#2F523E]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F523E] hover:text-[#2F523E]'"
          class="inline-flex h-9 items-center rounded-full border px-4 text-sm font-semibold cursor-pointer transition">
          Semua ({{ daftarFoto.length }})
        </button>

        <button v-for="slot in daftarJumlahSlot" :key="slot" type="button" @click="pilihFilter(slot)"
          :class="filterSlot === slot ? 'bg-[#2F523E] text-white border-[#2F523E]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2F523E] hover:text-[#2F523E]'"
          class="inline-flex h-9 items-center rounded-full border px-4 text-sm font-semibold cursor-pointer transition">
          {{ slot }}-Foto ({{ hitungFoto(slot) }})
        </button>
      </div>

      <!-- daftar foto -->
      <div class="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-start">
        <FotoCard v-for="foto in tampilkanFoto" :key="foto.id" :gambar="ambilGambar(foto)" :judul="ambilNama(foto)"
          :tanggal="ubahFormatTanggal(foto.createdAt)" :jumlahSlot="ambilTemplate(foto).slot" @lihat="bukaDetail(foto)"
          @hapus="bukaKonfirmasiHapus(foto)" @gambar-gagal="gantiKeGambarTemplate($event, foto)" />
      </div>

      <!-- foto kosong -->
      <p v-if="tampilkanFoto.length === 0" class="py-16 text-center text-gray-500">
        Belum ada sesi foto di galeri.
      </p>
    </div>
  </section>

  <!-- tampil di atas sidebar -->
  <Teleport to="body">
    <!-- pesan -->
    <div v-if="pesanSukses !== '' || pesanError !== ''" class="fixed top-4 left-4 right-4 z-[80] mx-auto max-w-md">
      <div v-if="pesanSukses !== ''" role="status"
        class="flex items-start gap-3 p-3 rounded-xl bg-green-100 text-green-700 border border-green-200 text-sm font-semibold shadow-lg">
        <p class="flex-1">{{ pesanSukses }}</p>
        <button type="button" @click="tutupPesan" aria-label="Tutup pesan" class="cursor-pointer">✕</button>
      </div>

      <div v-if="pesanError !== ''" role="alert"
        class="flex items-start gap-3 p-3 rounded-xl bg-red-100 text-red-700 border border-red-200 text-sm font-semibold shadow-lg">
        <p class="flex-1">{{ pesanError }}</p>
        <button type="button" @click="tutupPesan" aria-label="Tutup pesan" class="cursor-pointer">✕</button>
      </div>
    </div>

    <!-- detail foto -->
    <div v-if="popupDetailTerbuka && fotoDetail" @click.self="tutupDetail" role="dialog" aria-modal="true"
      :aria-label="'Detail foto ' + ambilNama(fotoDetail)"
      class="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm overflow-y-auto p-4 sm:p-6">
      <!-- tombol tutup -->
      <button type="button" @click="tutupDetail" aria-label="Tutup detail foto"
        class="fixed top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor"
          class="w-5 h-5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      <div @click.self="tutupDetail"
        class="min-h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 pt-14 pb-6">
        <img :src="ambilGambar(fotoDetail)" :alt="'Foto sesi ' + ambilNama(fotoDetail)"
          @error="gantiKeGambarTemplate($event, fotoDetail)"
          class="w-auto max-w-full max-h-[50vh] md:max-h-[60vh] lg:max-w-md lg:max-h-[80vh] rounded-2xl sm:rounded-3xl shadow-2xl object-contain" />

        <!-- info foto -->
        <div class="w-full max-w-sm md:w-80">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">{{ ambilNama(fotoDetail) }}</h2>
          <p class="mt-2 text-gray-300">{{ ubahFormatTanggal(fotoDetail.createdAt) }}</p>

          <!-- tombol aksi -->
          <div class="mt-6 md:mt-8 flex flex-col gap-3">
            <button type="button" @click="bukaModalUnduh"
              class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FCC046] text-[#1C2B22] font-semibold cursor-pointer hover:bg-[#f0b336] transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                stroke="currentColor" class="w-5 h-5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Unduh Foto HD
            </button>

            <button type="button" @click="bukaModalCetak"
              class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3F4246] text-white font-semibold cursor-pointer hover:bg-[#4B4F54] transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                stroke="currentColor" class="w-5 h-5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
              </svg>
              Cetak Fisik
            </button>

            <button type="button" @click="hapusDariDetail"
              class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3A2526] text-red-400 font-semibold cursor-pointer hover:bg-[#4A2C2D] transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                stroke="currentColor" class="w-5 h-5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Hapus Foto
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- popup cetak -->
  <BaseModal v-model:isOpen="popupCetakTerbuka" tipe="konfirmasi" title="Cetak Foto Fisik?" tombolKonfirmasi="Ya, Cetak"
    warnaTombol="bg-[#2F523E] text-white hover:bg-[#233F2F]" @konfirmasi="cetakFoto">
    Cetak foto <span v-if="fotoDetail" class="font-bold text-[#1C2B22]">{{ ambilNama(fotoDetail) }}</span>
    sekarang ke printer photobooth?
  </BaseModal>

  <!-- popup hapus -->
  <BaseModal v-model:isOpen="popupHapusTerbuka" tipe="konfirmasi"
    :title="hapusSemua ? 'Hapus Semua Sesi Foto?' : 'Hapus Sesi Foto?'" :gambar="gambarPopupHapus"
    tombolKonfirmasi="Ya, Hapus" warnaTombol="bg-red-700 text-white hover:bg-red-800" @konfirmasi="hapusFoto">
    <span v-if="hapusSemua">
      Yakin menghapus semua <span class="font-bold text-[#1C2B22]">{{ daftarFoto.length }} sesi foto</span>?
    </span>
    <span v-else-if="fotoYangDihapus">
      Yakin menghapus foto <span class="font-bold text-[#1C2B22]">{{ ambilNama(fotoYangDihapus) }}</span>?
    </span>
    Tindakan ini tidak dapat dibatalkan.
  </BaseModal>

  <!-- popup unduh -->
  <BaseModal v-model:isOpen="popupUnduhTerbuka" tipe="konfirmasi" title="Unduh Foto HD?"
    :tombolKonfirmasi="sedangMengunduh ? 'Mengunduh...' : 'Unduh Foto'"
    warnaTombol="bg-[#FCC046] text-[#1C2B22] hover:bg-[#F0B336]" @konfirmasi="unduhFoto">
    Simpan file resolusi tinggi <span v-if="fotoDetail" class="font-bold text-[#1C2B22]">{{
      ambilNama(fotoDetail) }}</span>
    langsung ke perangkat Anda.
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import FotoCard from '@/components/common/card/FotoCard.vue'
import SkeletonBox from '@/components/common/SkeletonBox.vue'
import StatusData from '@/components/common/StatusData.vue'
import { useAmbilData } from '@/utils/ambilData.js'
import { ubahFormatTanggal } from '@/utils/formatTanggal.js'

// ambil data
const ambilDataFoto = useAmbilData('/DataSource/photo.json')
const ambilDataTemplate = useAmbilData('/DataSource/template-photo.json')

// API publik
const ambilDataApi = useAmbilData('https://jsonplaceholder.typicode.com/photos?_limit=12')

// akun login
const idAkunLogin = 1

// hasil fetch
const daftarFoto = ref([])
const daftarTemplate = ref([])
const daftarFotoApi = ref([])

// foto milik akun
watch(ambilDataFoto.data, function (dataBaru) {
  const hasil = []

  if (Array.isArray(dataBaru)) {
    for (const foto of dataBaru) {
      if (foto.userId === idAkunLogin) {
        hasil.push(foto)
      }
    }
  }

  daftarFoto.value = hasil
})

// data template
watch(ambilDataTemplate.data, function (dataBaru) {
  if (Array.isArray(dataBaru)) {
    daftarTemplate.value = dataBaru
  } else {
    daftarTemplate.value = []
  }
})

// data API
watch(ambilDataApi.data, function (dataBaru) {
  if (Array.isArray(dataBaru)) {
    daftarFotoApi.value = dataBaru
  } else {
    daftarFotoApi.value = []
  }
})

// cek loading
const sedangMemuat = computed(function () {
  if (
    ambilDataFoto.loading.value === true ||
    ambilDataTemplate.loading.value === true ||
    ambilDataApi.loading.value === true
  ) {
    return true
  }
  return false
})

// cek API gagal
const apiGagal = computed(function () {
  if (ambilDataApi.error.value !== '') {
    return true
  }
  return false
})

// pesan gagal muat
const pesanGagalMuat = computed(function () {
  if (ambilDataFoto.error.value !== '') {
    return ambilDataFoto.error.value
  }
  if (ambilDataTemplate.error.value !== '') {
    return ambilDataTemplate.error.value
  }
  return ''
})

// coba lagi semua
function muatUlangGaleri() {
  ambilDataFoto.muat()
  ambilDataTemplate.muat()
  ambilDataApi.muat()
}

// coba lagi API
function muatUlangFotoApi() {
  ambilDataApi.muat()
}

// state

// filter (0 = semua)
const filterSlot = ref(0)

// detail
const popupDetailTerbuka = ref(false)
const fotoDetail = ref(null)

// hapus
const popupHapusTerbuka = ref(false)
const fotoYangDihapus = ref(null)
const hapusSemua = ref(false)

// cetak & unduh
const popupCetakTerbuka = ref(false)
const popupUnduhTerbuka = ref(false)
const sedangMengunduh = ref(false)

// pesan
const pesanSukses = ref('')
const pesanError = ref('')

// koneksi
const sedangOffline = ref(false)

// pesan sukses
function tampilkanSukses(pesan) {
  pesanError.value = ''
  pesanSukses.value = pesan
}

// pesan error
function tampilkanError(pesan) {
  pesanSukses.value = ''
  pesanError.value = pesan
}

// tutup pesan
function tutupPesan() {
  pesanSukses.value = ''
  pesanError.value = ''
}

// offline
function saatOffline() {
  sedangOffline.value = true
}

// online
function saatOnline() {
  sedangOffline.value = false
}

// tombol Escape
function saatTombolKeyboard(event) {
  if (event.key !== 'Escape') {
    return
  }

  //  BaseModal yang tutup
  if (popupHapusTerbuka.value === true || popupCetakTerbuka.value === true || popupUnduhTerbuka.value === true) {
    return
  }

  if (popupDetailTerbuka.value === true) {
    tutupDetail()
    return
  }

  tutupPesan()
}

// mulai pantau
onMounted(function () {
  if (navigator.onLine === false) {
    sedangOffline.value = true
  }
  window.addEventListener('offline', saatOffline)
  window.addEventListener('online', saatOnline)

  // true = jalan duluan
  window.addEventListener('keydown', saatTombolKeyboard, true)
})

// stop pantau
onUnmounted(function () {
  window.removeEventListener('offline', saatOffline)
  window.removeEventListener('online', saatOnline)
  window.removeEventListener('keydown', saatTombolKeyboard, true)
})

// fungsi bantu

// cari template
function ambilTemplate(foto) {
  for (const template of daftarTemplate.value) {
    if (template.id === foto.templateId) {
      return template
    }
  }

 // template pertama
  if (daftarTemplate.value.length > 0) {
    return daftarTemplate.value[0]
  }

  // data cadangan
  return { name: 'Template tidak ditemukan', backgroundUrl: '', slot: 0 }
}

// cari data API
function ambilFotoApi(foto) {
  for (const fotoApi of daftarFotoApi.value) {
    if (fotoApi.id === foto.id) {
      return fotoApi
    }
  }
  return null
}

// link gambar
function ambilGambar(foto) {
  const fotoApi = ambilFotoApi(foto)

  if (fotoApi !== null) {
    // url API mati, pakai Picsum
    return 'https://picsum.photos/seed/photobooth-' + fotoApi.id + '/600/800'
  }

  // cadangan template
  return ambilTemplate(foto).backgroundUrl
}

// judul foto
function ambilNama(foto) {
  const fotoApi = ambilFotoApi(foto)

  if (fotoApi !== null) {
    return fotoApi.title
  }

  return ambilTemplate(foto).name
}

// ganti gambar rusak
function gantiKeGambarTemplate(event, foto) {
  const gambarTemplate = ambilTemplate(foto).backgroundUrl

  // cegah ulang terus
  if (event.target.src.endsWith(gambarTemplate) === false) {
    event.target.src = gambarTemplate
  }
}

// arsip foto

// daftar slot
const daftarJumlahSlot = computed(function () {
  const hasil = []

  for (const foto of daftarFoto.value) {
    const slot = ambilTemplate(foto).slot
    if (!hasil.includes(slot)) {
      hasil.push(slot)
    }
  }

  hasil.sort(function (a, b) {
    return a - b
  })

  return hasil
})

// hitung per slot
function hitungFoto(slot) {
  let jumlah = 0

  for (const foto of daftarFoto.value) {
    if (ambilTemplate(foto).slot === slot) {
      jumlah = jumlah + 1
    }
  }

  return jumlah
}

// foto tampil
const tampilkanFoto = computed(function () {
  const hasil = []

  for (const foto of daftarFoto.value) {
    if (filterSlot.value === 0 || ambilTemplate(foto).slot === filterSlot.value) {
      hasil.push(foto)
    }
  }

  hasil.sort(function (a, b) {
    if (a.createdAt < b.createdAt) {
      return 1
    } else {
      return -1
    }
  })

  return hasil
})

// pilih filter
function pilihFilter(slot) {
  filterSlot.value = slot
}

// buka detail
function bukaDetail(foto) {
  fotoDetail.value = foto
  popupDetailTerbuka.value = true
}

// tutup detail
function tutupDetail() {
  popupDetailTerbuka.value = false
}

// buka unduh
function bukaModalUnduh() {
  popupUnduhTerbuka.value = true
}

// buka cetak
function bukaModalCetak() {
  popupCetakTerbuka.value = true
}

// hapus foto

// gambar popup hapus
const gambarPopupHapus = computed(function () {
  if (hapusSemua.value === true || fotoYangDihapus.value === null || popupDetailTerbuka.value === true) {
    return ''
  }
  return ambilGambar(fotoYangDihapus.value)
})

// buka hapus
function bukaKonfirmasiHapus(foto) {
  hapusSemua.value = false
  fotoYangDihapus.value = foto
  tutupPesan()
  popupHapusTerbuka.value = true
}

// buka hapus semua
function bukaKonfirmasiBersihkan() {
  hapusSemua.value = true
  tutupPesan()
  popupHapusTerbuka.value = true
}

// hapus dari detail
function hapusDariDetail() {
  bukaKonfirmasiHapus(fotoDetail.value)
}

// proses hapus
function hapusFoto() {
  // gagal: offline
  if (navigator.onLine === false) {
    popupHapusTerbuka.value = false
    tampilkanError('Foto gagal dihapus karena tidak ada koneksi internet. Periksa koneksi lalu coba lagi.')
    return
  }

  // gagal: foto tidak ditemukan
  if (hapusSemua.value === false && fotoYangDihapus.value === null) {
    popupHapusTerbuka.value = false
    tampilkanError('Foto yang ingin dihapus tidak ditemukan. Muat ulang halaman lalu coba lagi.')
    return
  }

  if (hapusSemua.value === true) {
    daftarFoto.value = []
    tampilkanSukses('Semua sesi foto berhasil dihapus.')
  } else {
    // sisa foto
    const sisaFoto = []

    for (const foto of daftarFoto.value) {
      if (foto.id !== fotoYangDihapus.value.id) {
        sisaFoto.push(foto)
      }
    }

    daftarFoto.value = sisaFoto
    tampilkanSukses('Sesi foto berhasil dihapus.')
  }

  // reset filter
  if (filterSlot.value !== 0 && hitungFoto(filterSlot.value) === 0) {
    filterSlot.value = 0
  }

  popupHapusTerbuka.value = false
  popupDetailTerbuka.value = false
}

// cetak foto

function cetakFoto() {
  popupCetakTerbuka.value = false

  // gagal: offline
  if (navigator.onLine === false) {
    tampilkanError('Foto gagal dicetak karena tidak ada koneksi internet. Periksa koneksi lalu coba lagi.')
    return
  }

  const linkGambar = ambilGambar(fotoDetail.value)
  const jendela = window.open('', '_blank')

  // gagal: pop-up diblokir
  if (jendela === null) {
    tampilkanError('Jendela cetak diblokir oleh browser. Izinkan pop-up untuk situs ini lalu coba lagi.')
    return
  }

  // cek gambar
  const gambar = new Image()

  // print
  gambar.onload = function () {
    jendela.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cetak Foto</title>
          <style>
            @page { margin: 0; size: auto; }
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
            img { max-height: 96vh; width: auto; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${linkGambar}" onload="window.print(); window.close();" />
        </body>
      </html>
    `)
    jendela.document.close()
  }

  // gagal: gambar error
  gambar.onerror = function () {
    jendela.close()
    tampilkanError('Foto gagal dimuat sehingga tidak bisa dicetak. Coba lagi beberapa saat lagi.')
  }

  gambar.src = linkGambar
}

// unduh foto

async function unduhFoto() {
  // cegah klik dobel
  if (sedangMengunduh.value === true) {
    return
  }

  // gagal: offline
  if (navigator.onLine === false) {
    popupUnduhTerbuka.value = false
    tampilkanError('Foto gagal diunduh karena tidak ada koneksi internet. Periksa koneksi lalu coba lagi.')
    return
  }

  sedangMengunduh.value = true

  try {
    const linkGambar = ambilGambar(fotoDetail.value)
    const response = await fetch(linkGambar)

    // gagal: file error
    if (response.ok === false) {
      throw new Error('File foto tidak bisa diambil')
    }

    const fileGambar = await response.blob()

    // jenis file
    const ekstensi = fileGambar.type.split('/')[1]

    // download
    const link = document.createElement('a')
    link.href = URL.createObjectURL(fileGambar)
    link.download = 'foto-photobooth-' + fotoDetail.value.id + '.' + ekstensi
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    tampilkanSukses('Foto berhasil diunduh.')
  } catch {
    // gagal: error lain
    tampilkanError('Foto gagal diunduh. Periksa koneksi lalu coba lagi.')
  } finally {
    // selesai
    sedangMengunduh.value = false
    popupUnduhTerbuka.value = false
  }
}
</script>