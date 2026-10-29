<template>
  <section class="mt-3 ml-3">
    <h1 class="text-3xl font-bold text-[#2F523E]">
      Riwayat Interaksi AI
    </h1>
    <p>
      Pantau log input dari user dan respon yang diberikan oleh AI Photobooth.
    </p>
  </section>
  
  <section class="rounded-tl-lg rounded-tr-lg overflow-hidden border border-gray-200 shadow-sm mt-5 mx-3">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="bg-[#DCE7E8] text-[#183b28]">
          <tr>
            <th class="py-3 px-4">NO</th>
            <th class="py-3 px-4">PENGGUNA</th>
            <th class="py-3 px-4 w-1/3">INPUT PROMPT</th>
            <th class="py-3 px-4 w-1/3">RESPON AI</th>
            <th class="py-3 px-4">WAKTU</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(log, index) in historyLogs" :key="log.id" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4 font-bold text-[#183b28]">{{ String(index + 1).padStart(2, '0') }}</td>
            <td class="py-3 px-4 font-semibold text-[#2f523e]">{{ log.user }}</td>
            <td class="py-3 px-4 text-gray-600 truncate max-w-xs">"{{ log.prompt }}"</td>
            <td class="py-3 px-4 text-gray-600 truncate max-w-xs">{{ log.response }}</td>
            <td class="py-3 px-4 text-gray-500 whitespace-nowrap">{{ log.timestamp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const historyLogs = ref([
  { id: 1, user: 'chandra@gmail.com', prompt: 'Bikinkan pantun lucu buat gaya foto', response: 'Jalan-jalan beli semangka, gaya merdeka!', timestamp: '14 Okt 2026 10:20' },
  { id: 2, user: 'daffa@gmail.com', prompt: 'Gaya foto keren buat cowok', response: 'Coba gaya candid menghadap samping.', timestamp: '14 Okt 2026 11:05' },
])
</script>