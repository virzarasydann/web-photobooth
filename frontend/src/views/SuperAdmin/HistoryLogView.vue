<template>
    <!-- halaman riwayat -->
    <div class="px-4 py-5 md:p-0">
        <!-- judul -->
        <section class="md:mt-3 md:ml-3">
            <h1 class="text-2xl md:text-3xl font-bold text-[#2F523E]">
                Manajemen Riwayat
            </h1>
            <p class="text-sm md:text-base">
                Pantau inputan pengguna ke AI dan respon AI yang ditampilkan ke pengguna
            </p>

            <!-- kartu ringkasan -->
            <div data-section="wrapper-card-component"
                class="flex flex-col md:flex-row gap-3 mt-3 items-center md:items-stretch">
                <CardComponent variant="white" title="TOTAL LOG" description="Total percakapan dengan AI"
                    :number="daftarLog.length">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-4" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                    </template>
                </CardComponent>

                <CardComponent variant="white" title="PENGGUNA" description="Pengguna yang pernah chat AI"
                    :number="jumlahPengguna">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-4" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </template>
                </CardComponent>
            </div>
        </section>

        <!-- nama pengguna -->
        <FetchJson src="DataSource/user.json" v-model="daftarUser" v-slot="{ loadError }">
            <p v-if="loadError" role="alert"
                class="mt-6 md:mx-14 p-3 rounded-xl bg-yellow-100 text-yellow-800 border border-yellow-200 text-sm font-semibold">
                Nama pengguna gagal dimuat, sementara ditampilkan "Pengguna tidak dikenal".
            </p>
        </FetchJson>

        <!-- tabel riwayat -->
        <section class="max-w-7xl min-w-0 mt-6 md:mx-14">
            <FetchJson src="DataSource/log-ai.json" v-model="daftarLog" v-slot="{ isLoading, loadError, reload }">
                <!-- bisa digeser di HP -->
                <div class="rounded-tl-lg rounded-tr-lg overflow-x-auto border border-gray-200 shadow-sm">
                    <table class="w-full min-w-[720px]">
                        <caption class="sr-only">Riwayat percakapan pengguna dengan AI</caption>
                        <thead class="bg-[#DCE7E8]">
                            <tr>
                                <th scope="col">NO</th>
                                <th scope="col">PENGGUNA</th>
                                <th scope="col">INPUT KE AI</th>
                                <th scope="col">RESPON AI</th>
                                <th scope="col">WAKTU</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            <!-- loading -->
                            <tr v-if="isLoading">
                                <td colspan="5" class="table-pesan text-gray-500">
                                    Memuat riwayat...
                                </td>
                            </tr>

                            <!-- gagal muat -->
                            <tr v-else-if="loadError">
                                <td colspan="5" class="table-pesan">
                                    <p class="font-semibold text-red-600" role="alert">{{ loadError }}</p>
                                    <button type="button" @click="reload"
                                        class="mt-2 cursor-pointer rounded-2xl bg-[#2F523E] px-4 py-2 text-white hover:bg-[#183b28] transition">
                                        Muat ulang
                                    </button>
                                </td>
                            </tr>

                            <!-- log kosong -->
                            <tr v-else-if="daftarLog.length === 0">
                                <td colspan="5" class="table-pesan text-gray-500">
                                    Belum ada riwayat percakapan dengan AI.
                                </td>
                            </tr>

                            <!-- daftar log -->
                            <template v-else>
                                <tr v-for="(log, index) in daftarLogTerbaru" :key="log.id">
                                    <td class="table-data-number">
                                        {{ String(index + 1).padStart(2, '0') }}
                                    </td>
                                    <td class="table-data-name">
                                        {{ ambilNamaPengguna(log.userId) }}
                                    </td>
                                    <td class="table-data-text">
                                        "{{ log.prompt }}"
                                    </td>
                                    <td class="table-data-text">
                                        {{ log.response }}
                                    </td>
                                    <td class="table-data-time">
                                        {{ ubahFormatTanggal(log.createdAt) }}
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </FetchJson>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CardComponent from '@/components/common/card/CardComponent.vue'
import FetchJson from '@/components/common/FetchJson/FetchJson.vue'
import { ubahFormatTanggal } from '@/utils/formatTanggal.js'

// hasil fetch
const daftarLog = ref([])
const daftarUser = ref([])

// terbaru di atas
const daftarLogTerbaru = computed(function () {
    const hasil = []

    // cek array
    if (Array.isArray(daftarLog.value)) {
        for (const log of daftarLog.value) {
            hasil.push(log)
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

// jumlah pengguna unik
const jumlahPengguna = computed(function () {
    const daftarId = []

    for (const log of daftarLogTerbaru.value) {
        if (!daftarId.includes(log.userId)) {
            daftarId.push(log.userId)
        }
    }

    return daftarId.length
})

// cari nama pengguna
function ambilNamaPengguna(userId) {
    if (Array.isArray(daftarUser.value)) {
        for (const user of daftarUser.value) {
            if (user.id === userId) {
                return user.name
            }
        }
    }

    // gagal: user tidak ditemukan
    return 'Pengguna tidak dikenal'
}
</script>

<style scoped>
th,
td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: top;
}

th {
    font-weight: 600;
    white-space: nowrap;
}

.table-data-number {
    font-weight: bold;
    color: #183b28;
}

.table-data-name {
    color: #2f523e;
    font-weight: bold;
    white-space: nowrap;
}

.table-data-text {
    color: #4b5563;
    min-width: 220px;
}

.table-data-time {
    color: #6b7280;
    white-space: nowrap;
}

/* pesan di tengah tabel */
.table-pesan {
    padding: 2rem 1rem;
    text-align: center;
}

/* tampilan mobile*/
@media (max-width: 640px) {

    th,
    td {
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
    }

    .table-data-text {
        min-width: 180px;
    }
}
</style>