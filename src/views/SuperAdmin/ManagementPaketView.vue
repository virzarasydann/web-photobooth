<template>
  <div class="md:ml-3">
    <section class="mt-3">
      <div
        class="flex flex-col gap-3 md:flex-row items-center md:justify-between"
      >
        <h1 class="md:text-3xl font-bold text-[#2F523E]">
          Manajemen Paket
        </h1>

        <div
          class="w-full md:w-auto flex flex-col items-center md:items-end gap-2"
        >
          <button
            type="button"
            @click="openAddModal"
            :disabled="pakets.length >= MAX_PAKET"
            class="bg-[#2F523E] w-40 p-2 rounded-2xl rounded-b-2xl cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Tambah Paket
          </button>
          <p
            v-if="pakets.length >= MAX_PAKET"
            class="text-sm font-semibold text-gray-500"
          >
            Maksimal 3 paket tercapai.
          </p>
        </div>
      </div>

      <p class="mt-2 text-gray-600">
        Kelola deskripsi paket photobooth untuk User, Admin, dan Event.
      </p>
    </section>

    <section class="w-full mt-10 min-w-0">
      <div
        class="rounded-2xl overflow-x-auto border border-gray-200 shadow-sm"
      >
        <table class="w-full min-w-150">
          <thead class="bg-white">
            <tr class="text-gray-500">
              <th>NO</th>
              <th>NAMA PAKET</th>
              <th>DESKRIPSI</th>
              <th>STATUS PAKET</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="(paket, index) in pakets"
              :key="paket.id"
            >
              <td class="table-data-number">
                {{ String(index + 1).padStart(2, '0') }}
              </td>
              <td class="table-data-name">
                {{ paket.name }}
              </td>
              <td class="text-gray-600">
                {{ paket.description }}
              </td>
              <td class="table-data-name">
                <div
                  class="wrapper-toggle inline-block w-20"
                >
                  <input
                    class="cursor-pointer"
                    type="checkbox"
                    v-model="paket.status"
                    true-value="Aktif"
                    false-value="Non Aktif"
                  />
                </div>
                {{ paket.status }}
              </td>
              <td>
                <button
                  type="button"
                  @click="openEditModal(paket)"
                  class="flex max-w-fit cursor-pointer items-center gap-1 rounded-2xl border border-gray-700 bg-white px-2 py-1 text-xs text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                    aria-hidden="true"
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
            <tr v-if="pakets.length === 0">
              <td
                colspan="5"
                class="px-4 py-8 text-center text-gray-500"
              >
                Tidak ada data paket.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <BaseModal
      v-model:isOpen="isModalOpen"
      :title="
        modalMode === 'add' ? 'Tambah Paket' : 'Edit Paket'
      "
    >
      <form
        action=""
        method="post"
        @submit.prevent="handleSubmit"
      >
        <div
          v-if="errorMessage"
          class="mb-4 p-3 bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-semibold text-center"
        >
          {{ errorMessage }}
        </div>

        <div
          class="flex flex-col gap-2 w-full mb-4"
        >
          <label for="paket">Nama Paket:</label>
          <input
            class="border-2 rounded-2xl border-[#2F523E] w-full p-2 outline-none focus:border-[#183b28]"
            type="text"
            id="paket"
            name="paket"
            v-model="formData.name"
          />
        </div>

        <div
          class="flex flex-col gap-2 w-full"
        >
          <label for="deskripsi">Deskripsi:</label>
          <textarea
            class="border-2 rounded-2xl border-[#2F523E] w-full p-2 min-h-24 outline-none focus:border-[#183b28]"
            id="deskripsi"
            name="deskripsi"
            v-model="formData.description"
          ></textarea>
        </div>
      </form>

      <template #footer>
        <input
          class="cursor-pointer bg-[#2F523E] text-white w-28 p-2 rounded-2xl"
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
import { ref, reactive } from 'vue'
import PaketJson from '@/config/DataSource/deskripsi-paket.json'
import BaseModal from '@/components/BaseModal.vue'

const MAX_PAKET = 3
const pakets = ref(PaketJson)
const isModalOpen = ref(false)

const modalMode = ref('add')
const selectedPaketId = ref(null)
const errorMessage = ref('')

const formData = reactive({
  name: '',
  description: '',
})

const openAddModal = () => {
  if (pakets.value.length >= MAX_PAKET) {
    errorMessage.value = 'Maksimal 3 paket tercapai.'
    return
  }
  modalMode.value = 'add'
  selectedPaketId.value = null
  formData.name = ''
  formData.description = ''
  errorMessage.value = ''
  isModalOpen.value = true
}

const openEditModal = (paket) => {
  modalMode.value = 'edit'
  selectedPaketId.value = paket.id
  formData.name = paket.name
  formData.description = paket.description
  errorMessage.value = ''
  isModalOpen.value = true
}

const handleSubmit = () => {
  if (
    formData.name.trim() === '' ||
    formData.description.trim() === ''
  ) {
    errorMessage.value = 'Nama dan deskripsi tidak boleh kosong.'
    return
  }

  if (
    modalMode.value === 'add' &&
    pakets.value.length >= MAX_PAKET
  ) {
    errorMessage.value = 'Maksimal 3 paket tercapai.'
    return
  }

  if (modalMode.value === 'add') {
    pakets.value.push({
      id: Date.now(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: 'Aktif',
    })
  } else {
    const index = pakets.value.findIndex(
      (p) => p.id === selectedPaketId.value,
    )
    if (index !== -1) {
      pakets.value[index].name = formData.name.trim()
      pakets.value[index].description =
        formData.description.trim()
    }
  }

  formData.name = ''
  formData.description = ''
  errorMessage.value = ''
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
