<template>
    <div class="min-h-screen flex bg-[#F7F8F6] text-[#183b28]">
        <!-- sidebar -->
        <aside class="hidden md:flex w-64 shrink-0 flex-col p-6">
            <!-- logo -->
            <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl bg-[#2F523E] flex items-center justify-center">
                    <!-- ikon kamera -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                        stroke="white" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                    </svg>
                </div>
                <div>
                    <p class="text-xl font-bold">PhotoBooth</p>
                    <p class="text-sm text-gray-500">Studio Foto </p>
                </div>
            </div>

            <!-- menu -->
            <p class="mt-10 mb-3 text-xs font-semibold tracking-widest text-gray-500">MENU</p>

            <RouterLink to="/photobooth/guest"
                class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                </svg>
                Booth Kamera
            </RouterLink>

            <!-- menu yang sedang aktif (halaman ini) -->
            <div
                class="flex items-center gap-3 px-4 py-3 mt-2 rounded-2xl bg-white border border-gray-200 shadow-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                    stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                Galeri Foto
            </div>

            <!-- kartu user di bawah -->
            <div class="mt-auto flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div class="w-10 h-10 rounded-full bg-[#2F523E] text-white font-bold flex items-center justify-center">
                    AL
                </div>
                <div class="flex-1">
                    <p class="font-semibold">Arka Levi</p>
                    <p class="text-xs text-gray-500">Member</p>
                </div>
                <RouterLink to="/login" class="text-gray-400 hover:text-[#2F523E]">
                    <!-- ikon keluar -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </RouterLink>
            </div>
        </aside>


        <!-- Isi halaman -->
        <main class="flex-1 p-6 md:p-8">
            <!-- judul + tombol di kanan -->
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <div class="flex items-center gap-3">
                        <h1 class="text-3xl md:text-4xl font-bold text-[#2F523E]">Galeri Photobooth</h1>
                        <span class="px-3 py-1 rounded-full bg-[#E6ECE8] text-sm font-semibold">
                            {{ daftarFoto.length }} Sesi
                        </span>
                    </div>
                    <p class="mt-2 text-gray-500">Koleksi sesi foto tersimpan. Klik foto untuk melihat ukuran penuh.</p>
                </div>

                <div class="flex gap-3">
                    <!-- tombol Bersihkan = hapus semua -->
                    <button type="button" @click="bukaKonfirmasiBersihkan" :disabled="daftarFoto.length === 0"
                        class="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 font-semibold cursor-pointer hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Bersihkan
                    </button>

                    <RouterLink to="/photobooth/guest"
                        class="flex items-center gap-2 px-5 py-2 rounded-full bg-[#2F523E] text-white font-semibold hover:bg-[#183b28] transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                        </svg>
                        Ambil Foto Baru
                    </RouterLink>
                </div>
            </div>

            <!-- tombol filter jumlah foto -->
            <div class="flex flex-wrap gap-3 mt-6 pb-6 border-b border-gray-200">
                <!-- tombol Semua -->
                <button type="button" @click="pilihFilter(0)"
                    :class="filterSlot === 0 ? 'bg-[#2F523E] text-white border-[#2F523E]' : 'bg-white border-gray-200'"
                    class="px-5 py-2 rounded-full border font-semibold cursor-pointer transition">
                    Semua ({{ daftarFoto.length }})
                </button>

                <!-- tombol per jumlah foto, contoh: "4-Foto (2)" -->
                <button v-for="slot in daftarJumlahSlot" :key="slot" type="button" @click="pilihFilter(slot)"
                    :class="filterSlot === slot ? 'bg-[#2F523E] text-white border-[#2F523E]' : 'bg-white border-gray-200'"
                    class="px-5 py-2 rounded-full border font-semibold cursor-pointer transition">
                    {{ slot }}-Foto ({{ hitungFoto(slot) }})
                </button>
            </div>

            <!-- pesan berhasil hapus -->
            <div v-if="successMessage"
                class="mt-6 p-3 bg-green-100 text-green-700 border border-green-200 rounded-xl text-sm font-semibold text-center">
                {{ successMessage }}
            </div>


            <!-- Daftar foto -->
            <!-- stop agar klik tombol ini tidak ikut membuka detail -->
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                <div v-for="foto in tampilkanFoto" :key="foto.id">
                    <!-- kotak gambar template -->
                    <div @click="bukaDetail(foto)"
                        class="relative rounded-3xl overflow-hidden bg-[#E6ECE8] cursor-pointer hover:shadow-lg transition">
                        <img :src="ambilTemplate(foto).backgroundUrl" :alt="ambilTemplate(foto).name" class="w-full" />

                        <!-- label jumlah foto di pojok kanan atas -->
                        <span
                            class="absolute top-4 right-4 px-3 py-1 rounded-full bg-white text-sm font-semibold shadow">
                            {{ ambilTemplate(foto).slot }} Foto
                        </span>

                        <!-- tombol hapus di pojok kiri atas -->
                        <!-- .stop supaya klik tombol ini tidak ikut membuka detail -->
                        <button type="button" @click.stop="bukaKonfirmasiHapus(foto)"
                            class="absolute top-4 left-4 w-9 h-9 rounded-full bg-white text-red-500 flex items-center justify-center shadow cursor-pointer hover:bg-red-50 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>

                    <!-- nama template dan tanggal -->
                    <p class="mt-3 text-center font-bold">{{ ambilTemplate(foto).name }}</p>
                    <p class="text-center text-sm text-gray-500">{{ ubahFormatTanggal(foto.createdAt) }}</p>
                </div>
            </div>

            <!-- jika tidak ada foto -->
            <p v-if="tampilkanFoto.length === 0" class="py-16 text-center text-gray-500">
                Belum ada sesi foto di galeri.
            </p>
        </main>

        <!-- tombol bantuan di pojok kanan bawah -->
        <button type="button"
            class="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-full bg-[#2F523E] text-white font-semibold shadow-lg cursor-pointer hover:bg-[#183b28] transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            Bantuan
        </button>
    </div>

    <!-- popup detail foto -->
    <BaseModal v-model:isOpen="popupDetailTerbuka" title="Detail Foto">
        <div v-if="fotoDetail" class="flex flex-col items-center gap-3 py-2">
            <img :src="ambilTemplate(fotoDetail).backgroundUrl" :alt="ambilTemplate(fotoDetail).name"
                class="max-h-[60vh] rounded-2xl bg-[#E6ECE8]" />
            <p class="font-bold">{{ ambilTemplate(fotoDetail).name }}</p>
            <p class="text-sm text-gray-500">
                {{ ambilTemplate(fotoDetail).slot }} Foto · {{ ubahFormatTanggal(fotoDetail.createdAt) }}
            </p>
        </div>

        <template #footer>
            <button type="button" @click="hapusDariDetail"
                class="bg-red-500 text-white font-semibold hover:bg-red-600 transition px-4 py-2 rounded-2xl cursor-pointer">
                Hapus
            </button>
        </template>
    </BaseModal>

    <!-- popup konfirmasi hapus foto -->
    <BaseModal v-model:isOpen="popupHapusTerbuka" title="Hapus Foto">
        <div class="py-6 text-center">
            <!-- pesan beda untuk hapus 1 foto atau hapus semua -->
            <p v-if="hapusSemua" class="text-lg font-semibold">
                Yakin mau menghapus semua {{ daftarFoto.length }} sesi foto?
            </p>
            <p v-else-if="fotoYangDihapus" class="text-lg font-semibold">
                Yakin mau menghapus sesi foto "{{ ambilTemplate(fotoYangDihapus).name }}"?
            </p>
            <p class="text-sm text-red-500 mt-2">Foto yang sudah dihapus tidak bisa di undo.</p>
        </div>

        <template #footer>
            <div class="flex gap-2">
                <button type="button" @click="batalHapus"
                    class="bg-[#DCE7E8] text-[#183b28] font-semibold px-4 py-2 rounded-2xl cursor-pointer hover:bg-[#c4d4d6] transition">
                    Batal
                </button>
                <button type="button" @click="hapusFoto"
                    class="bg-red-500 text-white font-semibold px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-600 transition">
                    Ya, Hapus
                </button>
            </div>
        </template>
    </BaseModal>
</template>

<script setup>
// ambil fungsi ref dan computed dari Vue
import { ref, computed } from 'vue'

// ambil komponen popup 
import BaseModal from '@/components/BaseModal.vue'

// ambil data foto 
import dataFoto from '@/config/DataSource/photo.json'

// ambil data template 
import dataTemplate from '@/config/DataSource/template-photo.json'

// semua sesi foto
const daftarFoto = ref(dataFoto)

// filter yang dipilih: 0 = Semua, 4 = 4-Foto, 6 = 6-Foto, dst.
const filterSlot = ref(0)

// untuk popup detail
const popupDetailTerbuka = ref(false)
const fotoDetail = ref(null)

// untuk popup hapus
const popupHapusTerbuka = ref(false)
const fotoYangDihapus = ref(null)
const hapusSemua = ref(false) // true kalau tombol "Bersihkan" yang diklik

// pesan setelah berhasil hapus
const successMessage = ref('')



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
    const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

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
        if (filterSlot.value === 0 || ambilTemplate(foto).slot === filterSlot.value) {
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
    popupDetailTerbuka.value = false
    bukaKonfirmasiHapus(fotoDetail.value)
}

// tombol Batal: tutup popup tanpa menghapus apa pun
function batalHapus() {
    popupHapusTerbuka.value = false
}

// hapus foto (1 sesi atau semua)
function hapusFoto() {
    if (hapusSemua.value === true) {
        // hapus semua foto
        daftarFoto.value = []
        successMessage.value = 'Semua sesi foto berhasil dihapus.'
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
    if (filterSlot.value !== 0 && hitungFoto(filterSlot.value) === 0) {
        filterSlot.value = 0
    }

    // tutup popup
    popupHapusTerbuka.value = false
}
</script>