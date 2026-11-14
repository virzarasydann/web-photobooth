<template>
  <div
    class="min-h-screen flex bg-[#F7F8F6] text-[#183b28]"
  >
    <!-- Isi halaman -->
    <main class="flex-1 p-6 md:p-8">
      <!-- judul + tombol di kanan -->
      <div
        class="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
      >
        <div>
          <div class="flex items-center gap-3">
            <h1
              class="text-3xl md:text-4xl font-bold text-[#2F523E]"
            >
              Galeri Photobooth
            </h1>
            <span
              class="px-3 py-1 rounded-full bg-[#E6ECE8] text-sm font-semibold"
            >
              {{ daftarFoto.length }} Sesi
            </span>
          </div>
          <p class="mt-2 text-gray-500">
            Koleksi sesi foto tersimpan. Klik foto untuk
            melihat ukuran penuh.
          </p>
        </div>

        <div class="flex gap-3">
          <!-- tombol Bersihkan = hapus semua -->
          <button
            type="button"
            @click="bukaKonfirmasiBersihkan"
            :disabled="daftarFoto.length === 0"
            class="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 font-semibold cursor-pointer hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Bersihkan
          </button>

          <RouterLink
            to="/member"
            class="flex items-center gap-2 px-5 py-2 rounded-full bg-[#2F523E] text-white font-semibold hover:bg-[#183b28] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
              />
            </svg>
            Ambil Foto Baru
          </RouterLink>
        </div>
      </div>

      <!-- tombol filter jumlah foto -->
      <div
        class="flex flex-wrap gap-3 mt-6 pb-6 border-b border-gray-200"
      >
        <!-- tombol Semua -->
        <button
          type="button"
          @click="pilihFilter(0)"
          :class="
            filterSlot === 0
              ? 'bg-[#2F523E] text-white border-[#2F523E]'
              : 'bg-white border-gray-200'
          "
          class="px-5 py-2 rounded-full border font-semibold cursor-pointer transition"
        >
          Semua ({{ daftarFoto.length }})
        </button>

        <!-- tombol per jumlah foto, contoh: "4-Foto (2)" -->
        <button
          v-for="slot in daftarJumlahSlot"
          :key="slot"
          type="button"
          @click="pilihFilter(slot)"
          :class="
            filterSlot === slot
              ? 'bg-[#2F523E] text-white border-[#2F523E]'
              : 'bg-white border-gray-200'
          "
          class="px-5 py-2 rounded-full border font-semibold cursor-pointer transition"
        >
          {{ slot }}-Foto ({{ hitungFoto(slot) }})
        </button>
      </div>

      <!-- pesan berhasil hapus -->
      <div
        v-if="successMessage"
        class="mt-6 p-3 bg-green-100 text-green-700 border border-green-200 rounded-xl text-sm font-semibold text-center"
      >
        {{ successMessage }}
      </div>

      <!-- Daftar foto -->
      <!-- stop agar klik tombol ini tidak ikut membuka detail -->
      <div
        class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start"
      >
        <div v-for="foto in tampilkanFoto" :key="foto.id">
          <!-- kotak gambar template -->
          <div
            @click="bukaDetail(foto)"
            class="relative rounded-3xl overflow-hidden bg-[#E6ECE8] cursor-pointer hover:shadow-lg transition"
          >
            <div
              v-if="sedangMemuat"
              class="w-full aspect-square bg-[#DCE7E8] animate-pulse"
            ></div>
            <img
              v-else
              :src="ambilGambar(foto)"
              :alt="ambilNama(foto)"
              class="w-full"
            />

            <!-- label jumlah foto di pojok kanan atas -->
            <span
              class="absolute top-4 right-4 px-3 py-1 rounded-full bg-white text-sm font-semibold shadow"
            >
              {{ ambilTemplate(foto).slot }} Foto
            </span>

            <!-- tombol hapus di pojok kiri atas -->
            <!-- .stop supaya klik tombol ini tidak ikut membuka detail -->
            <button
              type="button"
              @click.stop="bukaKonfirmasiHapus(foto)"
              class="absolute top-4 left-4 w-9 h-9 rounded-full bg-white text-red-500 flex items-center justify-center shadow cursor-pointer hover:bg-red-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>

          <!-- nama template dan tanggal -->
          <p class="mt-3 text-center font-bold">
            {{ ambilNama(foto) }}
          </p>
          <p class="text-center text-sm text-gray-500">
            {{ ubahFormatTanggal(foto.createdAt) }}
          </p>
        </div>
      </div>

      <!-- jika tidak ada foto -->
      <p
        v-if="tampilkanFoto.length === 0"
        class="py-16 text-center text-gray-500"
      >
        Belum ada sesi foto di galeri.
      </p>
    </main>
  </div>

  <!-- dipindah ke body biar sidebar ikut ketutup -->
  <Teleport to="body">
    <!-- tampilan detail foto -->
    <div
      v-if="popupDetailTerbuka && fotoDetail"
      @click.self="tutupDetail"
      class="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 overflow-y-auto"
    >
      <!-- tombol tutup -->
      <button
        type="button"
        @click="tutupDetail"
        class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/20 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.8"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        class="flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        <!-- gambar di kiri -->
        <img
          :src="ambilGambar(fotoDetail)"
          :alt="ambilNama(fotoDetail)"
          class="max-h-[80vh] w-full max-w-sm md:max-w-md rounded-3xl shadow-2xl object-contain"
        />

        <!-- nama, tanggal, dan tombol di kanan -->
        <div class="w-full md:w-80">
          <h2
            class="text-3xl md:text-4xl font-bold text-white"
          >
            {{ ambilNama(fotoDetail) }}
          </h2>
          <p class="mt-2 text-gray-300">
            {{ ubahFormatTanggal(fotoDetail.createdAt) }}
          </p>

          <div class="mt-8 flex flex-col gap-3">
            <button
              type="button"
              @click="bukaModalUnduh"
              class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FCC046] text-[#1C2B22] font-semibold cursor-pointer hover:bg-[#f0b336] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Unduh Foto HD
            </button>

            <button
              type="button"
              @click="bukaModalCetak"
              class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3F4246] text-white font-semibold cursor-pointer hover:bg-[#4B4F54] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                />
              </svg>
              Cetak Fisik
            </button>

            <button
              type="button"
              @click="hapusDariDetail"
              class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3A2526] text-red-400 font-semibold cursor-pointer hover:bg-[#4A2C2D] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Hapus Foto
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- popup cetak -->
  <BaseModal
    v-model:isOpen="popupCetakTerbuka"
    tipe="konfirmasi"
    title="Cetak Foto Fisik?"
    :gambar="fotoDetail ? ambilGambar(fotoDetail) : ''"
    tombolKonfirmasi="Ya, Cetak"
    warnaTombol="bg-[#2F523E] text-white hover:bg-[#233F2F]"
    @konfirmasi="cetakFoto"
  >
    Cetak foto
    <span
      v-if="fotoDetail"
      class="font-bold text-[#1C2B22]"
    >
      {{ ambilNama(fotoDetail) }}
    </span>
    sekarang ke printer kiosk photobooth?
  </BaseModal>

  <!-- popup hapus -->
  <BaseModal
    v-model:isOpen="popupHapusTerbuka"
    tipe="konfirmasi"
    :title="
      hapusSemua
        ? 'Hapus Semua Sesi Foto?'
        : 'Hapus Sesi Foto?'
    "
    :gambar="
      !hapusSemua && fotoYangDihapus
        ? ambilGambar(fotoYangDihapus)
        : ''
    "
    tombolKonfirmasi="Ya, Hapus"
    warnaTombol="bg-red-700 text-white hover:bg-red-800"
    @konfirmasi="hapusFoto"
  >
    <span v-if="hapusSemua">
      Yakin menghapus semua
      <span class="font-bold text-[#1C2B22]">
        {{ daftarFoto.length }} sesi foto
      </span>
      ?
    </span>
    <span v-else-if="fotoYangDihapus">
      Yakin menghapus foto
      <span class="font-bold text-[#1C2B22]">
        {{ ambilNama(fotoYangDihapus) }}
      </span>
      ?
    </span>
    Tindakan ini tidak dapat dibatalkan.
  </BaseModal>

  <!-- popup unduh -->
  <BaseModal
    v-model:isOpen="popupUnduhTerbuka"
    tipe="konfirmasi"
    title="Unduh Foto HD?"
    :gambar="fotoDetail ? ambilGambar(fotoDetail) : ''"
    tombolKonfirmasi="Unduh Foto"
    warnaTombol="bg-[#FCC046] text-[#1C2B22] hover:bg-[#F0B336]"
    @konfirmasi="unduhFoto"
  >
    Simpan file resolusi tinggi
    <span
      v-if="fotoDetail"
      class="font-bold text-[#1C2B22]"
    >
      {{ ambilNama(fotoDetail) }}
    </span>
    langsung ke perangkat Anda.
  </BaseModal>
</template>

<script setup>
// ambil fungsi ref dan computed dari Vue
import { ref, computed, onMounted } from 'vue'

// ambil komponen popup
import BaseModal from '@/components/BaseModal.vue'

// ambil data foto
import dataFoto from '@/config/DataSource/photo.json'

// ambil data template
import dataTemplate from '@/config/DataSource/template-photo.json'

// semua sesi foto
const idAkunLogin = 1
const daftarFoto = ref(
  dataFoto.filter((foto) => foto.userId === idAkunLogin),
)

// filter yang dipilih: 0 = Semua, 4 = 4-Foto, 6 = 6-Foto, dst.
const filterSlot = ref(0)

// untuk popup detail
const popupDetailTerbuka = ref(false)
const fotoDetail = ref(null)

// untuk popup hapus
const popupHapusTerbuka = ref(false)
const fotoYangDihapus = ref(null)
const hapusSemua = ref(false) // true kalau tombol "Bersihkan" yang diklik

// untuk popup cetak dan unduh
const popupCetakTerbuka = ref(false)
const popupUnduhTerbuka = ref(false)

// pesan setelah berhasil hapus
const successMessage = ref('')

// tempat simpan gambar dari api
const daftarGambar = ref([])
const sedangMemuat = ref(true)

// ambil gambar dari api saat halaman dibuka
onMounted(async function () {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/photos?_limit=12',
    )
    daftarGambar.value = await response.json()
  } catch (error) {
    console.log('Gagal ambil gambar dari api')
  }

  sedangMemuat.value = false
})

// cari gambar yang id-nya sama dengan foto
function ambilGambar(foto) {
  for (const gambar of daftarGambar.value) {
    if (gambar.id === foto.id) {
      return gambar.url
    }
  }
  return ambilTemplate(foto).backgroundUrl
}

function ambilNama(foto) {
  for (const gambar of daftarGambar.value) {
    if (gambar.id === foto.id) {
      return gambar.title
    }
  }
  if (sedangMemuat.value) {
    return ''
  }
  return ambilTemplate(foto).name
}

//data template
function ambilTemplate(foto) {
  for (const template of dataTemplate) {
    if (template.id === foto.templateId) {
      return template
    }
  }
  // jika template tidak ketemu, pakai template pertama
  return dataTemplate[0]
}

// fitur ubah format tangal
function ubahFormatTanggal(tanggal) {
  const namaBulan = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ]

  // pecah jadi tanggal dan jam: ["2026-10-29", "19:42"]
  const tanggalDanJam = tanggal.split(' ')

  // pecah tanggalnya: ["2026", "10", "29"]
  const bagian = tanggalDanJam[0].split('-')

  const tahun = bagian[0]
  const bulan = namaBulan[Number(bagian[1]) - 1] // "10" -> 10 -> urutan ke-9 -> "Okt"
  const hari = Number(bagian[2]) // "29" -> 29
  const jam = tanggalDanJam[1]

  return hari + ' ' + bulan + ' ' + tahun + ', ' + jam
}

// Arsip foto

// daftar jumlah slot yang ada di galeri (contoh [4,6])
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

// hitung ada berapa foto dengan jumlah slot tertentu
function hitungFoto(slot) {
  let jumlah = 0

  for (const foto of daftarFoto.value) {
    if (ambilTemplate(foto).slot === slot) {
      jumlah = jumlah + 1
    }
  }

  return jumlah
}

// foto yang tampil sesuai filter, yang terbaru di depan
const tampilkanFoto = computed(function () {
  const hasil = []

  for (const foto of daftarFoto.value) {
    if (
      filterSlot.value === 0 ||
      ambilTemplate(foto).slot === filterSlot.value
    ) {
      hasil.push(foto)
    }
  }

  // urutkan: tanggal lebih baru ditaruh di depan
  hasil.sort(function (a, b) {
    if (a.createdAt < b.createdAt) {
      return 1
    } else {
      return -1
    }
  })

  return hasil
})

// klik tombol filter
function pilihFilter(slot) {
  filterSlot.value = slot
}

// buka popup ukuran penuh
function bukaDetail(foto) {
  fotoDetail.value = foto
  popupDetailTerbuka.value = true
}

// tutup tampilan detail
function tutupDetail() {
  popupDetailTerbuka.value = false
}

// klik tombol Unduh Foto HD
function bukaModalUnduh() {
  popupUnduhTerbuka.value = true
}

// klik tombol Cetak Fisik
function bukaModalCetak() {
  popupCetakTerbuka.value = true
}

// Fitur hapus foto

// klik ikon tempat sampah di 1 foto
function bukaKonfirmasiHapus(foto) {
  hapusSemua.value = false
  fotoYangDihapus.value = foto
  successMessage.value = ''
  popupHapusTerbuka.value = true
}

// klik tombol bersihkan
function bukaKonfirmasiBersihkan() {
  hapusSemua.value = true
  successMessage.value = ''
  popupHapusTerbuka.value = true
}

// tombol Hapus di dalam popup detail
function hapusDariDetail() {
  bukaKonfirmasiHapus(fotoDetail.value)
}

// hapus foto (1 sesi atau semua)
function hapusFoto() {
  if (hapusSemua.value === true) {
    // hapus semua foto
    daftarFoto.value = []
    successMessage.value =
      'Semua sesi foto berhasil dihapus.'
  } else {
    // simpan semua foto kecuali foto yang mau dihapus
    const sisaFoto = []

    for (const foto of daftarFoto.value) {
      if (foto.id !== fotoYangDihapus.value.id) {
        sisaFoto.push(foto)
      }
    }

    daftarFoto.value = sisaFoto
    successMessage.value = 'Sesi foto berhasil dihapus.'
  }

  // jika filter yang dipilih tidak ada fotonya, kembail ke semua
  if (
    filterSlot.value !== 0 &&
    hitungFoto(filterSlot.value) === 0
  ) {
    filterSlot.value = 0
  }

  // tutup popup
  popupHapusTerbuka.value = false
  popupDetailTerbuka.value = false
}

// cetak foto ke printer
function cetakFoto() {
  const linkGambar = ambilGambar(fotoDetail.value)
  const jendela = window.open('', '_blank')

  if (jendela) {
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

  // tutup popup
  popupCetakTerbuka.value = false
}

// unduh foto ke perangkat
async function unduhFoto() {
  const linkGambar = ambilGambar(fotoDetail.value)
  const response = await fetch(linkGambar)
  const fileGambar = await response.blob()

  // bikin link download lalu diklik otomatis
  const link = document.createElement('a')
  link.href = URL.createObjectURL(fileGambar)
  link.download =
    'foto-photobooth-' + fotoDetail.value.id + '.jpg'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // tutup popup
  popupUnduhTerbuka.value = false
}
</script>
