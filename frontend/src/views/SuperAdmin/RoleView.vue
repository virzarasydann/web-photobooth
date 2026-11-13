<template>
  <div class="md:ml-3">
    <section class="mt-3">
      <div
        class="flex flex-col gap-3 md:flex-row items-center md:justify-between"
      >
        <h1 class="md:text-3xl font-bold text-[#2F523E]">
          Manajemen Role & Hak Akses
        </h1>

        <div
          class="w-full md:w-auto flex justify-center md:justify-end"
        >
          <button
            type="button"
            @click="openAddModal"
            class="bg-[#2F523E] w-40 p-2 rounded-2xl rounded-b-2xl cursor-pointer text-white"
          >
            + Tambah Role
          </button>
        </div>
      </div>

      <!-- <div class="flex justify-between">
      <p>
        Kelola hak akses dan peran User, Admin untuk
        Photobooth
      </p>
    </div> -->

      <div
        data-section="wrapper-card-component"
        class="flex flex-col md:flex-row gap-3 mt-3 items-center md:justify-start"
      >
        <CardComponent
          variant="white"
          title="TOTAL ROLE"
          description="Total role yang ada"
          :number="roles.length"
        >
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

        <CardComponent
          variant="white"
          title="ROLE AKTIF"
          description="Dapat login & sesi photobooth"
          :number="
            roles.filter((object) => {
              return object.status == 'Aktif'
            }).length
          "
        >
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

      <div class="mt-10">
        <SearchFilter
          v-model:search="searchQuery"
          v-model:status="statusFilter"
          placeholder="Cari role..."
          status-label="STATUS"
          all-label="Semua status"
          :status-options="statusOptions"
        />
      </div>
    </section>

    <section class="w-full mt-10 min-w-0">
      <FetchJson
        src="DataSource/role.json"
        v-model="roles"
        v-slot="{ isLoading, loadError, reload }"
      >
        <div
          class="rounded-2xl overflow-x-auto border border-gray-200 shadow-sm"
        >
          <table class="w-full min-w-150">
            <thead class="bg-white">
              <tr class="text-gray-500">
                <th>NO</th>
                <th>NAMA ROLE</th>
                <th>STATUS ROLE</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-if="isLoading">
                <td
                  colspan="4"
                  class="px-4 py-8 text-center color-[#DCE7E8]"
                >
                  Memuat data role...
                </td>
              </tr>
              <tr v-else-if="loadError">
                <td
                  colspan="4"
                  class="px-4 py-8 text-center"
                >
                  <p class="font-semibold color-[#DCE7E8]">
                    {{ loadError }}
                  </p>
                  <button
                    type="button"
                    @click="reload"
                    class="mt-2 cursor-pointer rounded-2xl bg-[#2F523E] px-4 py-2 text-white"
                  >
                    Muat ulang
                  </button>
                </td>
              </tr>
              <template v-else>
                <tr
                  v-for="(role, index) in filteredRoles"
                  :key="role.id"
                >
                  <td class="table-data-number">
                    {{ String(index + 1).padStart(2, '0') }}
                  </td>
                  <td class="table-data-name">
                    {{ role.name }}
                  </td>
                  <td class="table-data-name">
                    <div
                      class="wrapper-toggle inline-block w-20"
                    >
                      <input
                        class="cursor-pointer"
                        type="checkbox"
                        v-model="role.status"
                        true-value="Aktif"
                        false-value="Non Aktif"
                      />
                    </div>
                    {{ role.status }}
                  </td>
                  <td>
                    <button
                      type="button"
                      @click="openEditModal(role)"
                      class="flex max-w-fit cursor-pointer items-center gap-1 rounded-2xl border border-gray-700 bg-white px-2 py-1 text-xs text-black"
                    >
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>

                      <span class="">Edit</span>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredRoles.length === 0">
                  <td
                    colspan="4"
                    class="px-4 py-8 text-center text-gray-500"
                  >
                    Tidak ada data role.
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </FetchJson>
    </section>

    <BaseModal
      v-model:isOpen="isModalOpen"
      :title="
        modalMode === 'add' ? 'Tambah Role' : 'Edit Role'
      "
    >
      <form
        action=""
        method="post"
        @submit.prevent="handleSubmit"
      >
        <div
          v-for="f in fields"
          :key="f.inputName"
          class="flex gap-2 flex-col max-w-max md:max-w-none md:w-full"
        >
          <label :for="f.inputName">{{ f.label }}</label>
          <input
            class="border-2 rounded-2xl border-[#2F523E] w-full md:min-h-13"
            type="text"
            :id="f.inputName"
            :name="f.inputName"
            v-model="formData[f.inputName]"
          />
          <p v-if="emptyField.includes(f.inputName)">
            {{ f.label }} tidak boleh kosong.
          </p>
        </div>
      </form>

      <template #footer>
        <input
          class="cursor-pointer bg-[#2F523E] w-28 p-2 rounded-2xl"
          type="button"
          value="Simpan"
          @click="handleSubmit"
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import '@/assets/role/style.css'
import { ref, reactive, computed } from 'vue'
import FetchJson from '@/components/common/FetchJson/FetchJson.vue'
import BaseModal from '@/components/BaseModal.vue'
import CardComponent from '../../components/common/card/CardComponent.vue'

const roles = ref([])
const isModalOpen = ref(false)

const modalMode = ref('add')
const selectedRoleId = ref(null)
const fields = [{ label: 'Nama Role', inputName: 'role' }]
const emptyField = ref([])
const formData = reactive(
  Object.fromEntries(fields.map((f) => [f.inputName, ''])),
)

import SearchFilter from '@/components/common/SearchFilter/SearchFilter.vue'

const searchQuery = ref('')
const statusFilter = ref('Semua status')

const statusOptions = computed(() => [
  ...new Set(roles.value.map((r) => r.status)),
])

const filteredRoles = computed(() =>
  roles.value.filter((r) => {
    const matchSearch = r.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    const matchStatus =
      statusFilter.value === 'Semua status' ||
      r.status === statusFilter.value
    return matchSearch && matchStatus
  }),
)
const openAddModal = () => {
  modalMode.value = 'add'
  selectedRoleId.value = null
  emptyField.value = []
  for (const f of fields) formData[f.inputName] = ''
  isModalOpen.value = true
}

const openEditModal = (role) => {
  modalMode.value = 'edit'
  selectedRoleId.value = role.id
  emptyField.value = []
  formData.role = role.name
  isModalOpen.value = true
}

const handleSubmit = () => {
  emptyField.value = []
  for (const [key, value] of Object.entries(formData)) {
    
    if (!String(value ?? '').trim())
      emptyField.value.push(key)
  }
  if (emptyField.value.length > 0) return

  if (modalMode.value === 'add') {
    roles.value.push({
      id: Date.now(),
      name: formData.role.trim(),
      status: 'Aktif',
    })
  } else {
    const index = roles.value.findIndex(
      (r) => r.id === selectedRoleId.value,
    )
    if (index !== -1)
      roles.value[index].name = formData.role.trim()
  }

  formData.role = ''
  isModalOpen.value = false
}
</script>

<style scoped>
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
