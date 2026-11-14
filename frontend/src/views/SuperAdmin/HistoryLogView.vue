<template>
    <section class="mt-3 ml-3">
        <h1 class="text-3xl font-bold text-[#2F523E]">
            Manajemen Riwayat
        </h1>
        <div class="flex justify-between">
            <p>
                Pantau inputan pengguna ke AI dan respon AI yang ditampilkan ke pengguna
            </p>
        </div>

        <div data-section="wrapper-card-component" class="flex flex-row gap-3 mt-3">
            <CardComponent variant="white" title="TOTAL LOG" description="Total percakapan dengan AI"
                :number="daftarLog.length">
                <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                </template>
            </CardComponent>

            <CardComponent variant="white" title="PENGGUNA" description="Pengguna yang pernah chat AI"
                :number="jumlahPengguna">
                <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </template>
            </CardComponent>
        </div>
    </section>

    <section class="max-w-7xl mx-14 mt-6">
        <div class="rounded-tl-lg rounded-tr-lg overflow-hidden border border-gray-200 shadow-sm">
            <table class="w-full">
                <thead class="bg-[#DCE7E8]">
                    <tr>
                        <th>NO</th>
                        <th>PENGGUNA</th>
                        <th>INPUT KE AI</th>
                        <th>RESPON AI</th>
                        <th>WAKTU</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
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
                    <tr v-if="daftarLog.length === 0">
                        <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                            Belum ada riwayat percakapan dengan AI.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import CardComponent from '../../components/common/card/CardComponent.vue'
import dataLog from '@/config/DataSource/log-ai.json'
import dataUser from '@/config/DataSource/user.json'

// data dummy dulu, nanti diganti data dari Chat AI (FR-016 & FR-017)
const daftarLog = ref(dataLog)

// urutkan: yang terbaru di atas
const daftarLogTerbaru = computed(function () {
    const hasil = []

    for (const log of daftarLog.value) {
        hasil.push(log)
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

// hitung ada berapa pengguna berbeda yang pernah chat AI
const jumlahPengguna = computed(function () {
    const daftarId = []

    for (const log of daftarLog.value) {
        if (!daftarId.includes(log.userId)) {
            daftarId.push(log.userId)
        }
    }

    return daftarId.length
})

// cari nama pengguna dari user.json berdasarkan userId
function ambilNamaPengguna(userId) {
    for (const user of dataUser) {
        if (user.id === userId) {
            return user.name
        }
    }
    return 'Pengguna tidak dikenal'
}

// ubah "2026-11-05 10:12" jadi "5 Nov 2026, 10:12"
function ubahFormatTanggal(tanggal) {
    const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

    const tanggalDanJam = tanggal.split(' ')
    const bagian = tanggalDanJam[0].split('-')

    const tahun = bagian[0]
    const bulan = namaBulan[Number(bagian[1]) - 1]
    const hari = Number(bagian[2])
    const jam = tanggalDanJam[1]

    return hari + ' ' + bulan + ' ' + tahun + ', ' + jam
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
}

.table-data-time {
    color: #6b7280;
    white-space: nowrap;
}
</style>