<template>
  <section class="mt-3 ml-3">
    <h1 class="text-3xl font-bold text-[#2F523E]">
      Manajemen Peran
    </h1>
    <div class="flex justify-between">
      <p>
        Kelola hak akses dan peran User, Admin untuk
        Photobooth
      </p>
    </div>

    <div data-section="wrapper-card-component" class="flex flex-row gap-3">
      <CardComponent variant="white" title="TOTAL ROLE" description="Total role yang ada" :number="roles.length">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </template>
      </CardComponent>

      <CardComponent variant="white" title="ROLE AKTIF" description="Dapat login & sesi photobooth"  :number="roles.filter((object)=>{ return object.status == 'Aktif'}).length">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </template>
      </CardComponent>
    </div>
  </section>

  <section class="max-w-7xl mx-14">
    <div class="flex justify-end mb-3">
      <button
        type="button"
        @click="isModalOpen = true"
        class="bg-[#DCE7E8] w-32 p-2 mr-3 rounded-t-2xl rounded-b-2xl cursor-pointer"
      >
        Tambah
      </button>
    </div>

    <div
      class="rounded-tl-lg rounded-tr-lg overflow-hidden border border-gray-200 shadow-sm"
    >
      <table class="w-full">
        <thead class="bg-[#DCE7E8]">
          <tr>
            <th>NO</th>
            <th>NAMA ROLE</th>
            <th>STATUS ROLE</th>
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
            <td class="table-data-name">
              <div class="wrapper-toggle inline-block w-20 ">
                <input type="checkbox" class="">
                
              </div>
              {{ role.status }}
            </td>
            <td>
              <button
                class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 cursor-pointer"
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
    </div>
  </section>

  <BaseModal
    v-model:isOpen="isModalOpen"
    title="Tambah Role"
  >
    <form action="" method="post" @submit.prevent>
      <div class="form-group gap-4 w-full">
        <label for="role">Nama Role:</label>
        <input
          class="border-2 rounded-2xl min-h-13 border-[#2F523E] p-2 w-full"
          type="text"
          id="role"
          name="role"
          v-model="newRoleName"
        />
      </div>
    </form>

    <template #footer>
      <input
        class="cursor-pointer bg-[#2F523E] w-28 p-2 rounded-2xl"
        type="button"
        value="Submit"
        @click="handleAddRole"
      />
    </template>
  </BaseModal>
</template>

<script setup>
import '@/assets/role/style.css'
import { ref } from 'vue'
import RoleJson from '../../config/DataSource/role.json'
import BaseModal from '@/components/BaseModal.vue'
import CardComponent from '../../components/common/card/CardComponent.vue'
const roles = ref(RoleJson)
const isModalOpen = ref(false)
const newRoleName = ref('')

const handleAddRole = () => {
  if (newRoleName.value.trim() !== '') {
    roles.value.push({
      id: Date.now(),
      name: newRoleName.value,
    })
    newRoleName.value = ''
    isModalOpen.value = false
  }
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
}
label {
  font-weight: bolder;
}
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
