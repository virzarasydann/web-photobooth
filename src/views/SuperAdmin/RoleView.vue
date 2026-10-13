<template>
  <section class="mt-3 ml-3">
    <h1 class="text-3xl font-bold text-[#2F523E]">
      Manajemen Peran
    </h1>
    <p>
      Kelola hak akses dan peran User, Admin untuk
      Photobooth
    </p>
  </section>
  <section
    class="rounded-tl-lg rounded-tr-lg overflow-hidden border border-gray-200 shadow-sm mt-3"
  >
    <table class="w-full">
      <thead class="bg-[#DCE7E8]">
        <tr>
          <th>NO</th>
          <th>NAMA ROLE</th>
          <th>AKSI</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(role, index) in roles" :key="role.id">
          <td class="table-data-number">
            {{ String(index + 1).padStart(2, '0') }}
          </td>

          <td class="table-data-name">
            {{ role.name }}
          </td>

          <td>
            <button
              class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </td>
        </tr>

        <tr v-if="roles.length === 0">
          <td
            colspan="3"
            class="px-4 py-8 text-center text-gray-500"
          >
            Tidak ada data role.
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const roles = ref([
  { id: 1, name: 'Super Admin' },
  { id: 2, name: 'Admin' },

  { id: 3, name: 'User' },
  { id: 4, name: 'Guest' },
])
</script>

<style scoped>
th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
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
}
</style>
