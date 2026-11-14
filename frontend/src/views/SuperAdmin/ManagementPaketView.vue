<template>
  <FetchJSON
    v-model="dataPaket"
    src="DataSource/paket/deskripsi-paket.json"
    v-slot="{ isLoading, loadError, reload }"
  >
    <div class="px-4 pb-8 md:px-6">
      <section class="mt-3">
        <div
          class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"
        >
          <h1
            class="text-2xl font-bold text-[#2F523E] md:text-3xl"
          >
            Manajemen Paket
          </h1>

          <div
            class="flex w-full flex-col gap-2 md:w-auto md:items-end"
          >
            <button
              type="button"
              @click="openAddModal"
              :disabled="
                isLoading ||
                loadError ||
                pakets.length >= MAX_PAKET
              "
              class="bg-[#2F523E] w-full md:w-40 p-2 rounded-2xl rounded-b-2xl cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Tambah Paket
            </button>
            <p
              v-if="pakets.length >= MAX_PAKET"
              class="text-center text-sm font-semibold text-gray-500 md:text-right"
            >
              Maksimal 3 paket tercapai.
            </p>
          </div>
        </div>

        <p class="mt-2 text-gray-600">
          Kelola deskripsi paket photobooth untuk User,
          Admin, dan Event.
        </p>
      </section>

      <section class="w-full mt-10 min-w-0">
        <div
          class="rounded-2xl overflow-x-auto border border-gray-200 shadow-sm"
        >
          <p v-if="isLoading" role="status" class="sr-only">
            Memuat data paket...
          </p>
          <table class="w-full">
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
              <!-- skeleton: 3 baris tiruan selama data dimuat -->
              <template v-if="isLoading">
                <tr
                  v-for="n in 3"
                  :key="n"
                  aria-hidden="true"
                >
                  <td data-label="No">
                    <SkeletonBox
                      class="h-4 w-6 rounded-full"
                    />
                  </td>
                  <td data-label="Nama Paket">
                    <SkeletonBox
                      class="h-4 w-28 rounded-full"
                    />
                  </td>
                  <td data-label="Deskripsi">
                    <SkeletonBox
                      class="h-4 w-48 max-w-full rounded-full"
                    />
                  </td>
                  <td data-label="Status">
                    <SkeletonBox
                      class="h-6 w-24 rounded-full"
                    />
                  </td>
                  <td data-label="Aksi">
                    <SkeletonBox
                      class="h-7 w-16 rounded-2xl"
                    />
                  </td>
                </tr>
              </template>

              <!-- gagal memuat -->
              <tr v-else-if="loadError" role="alert">
                <td
                  colspan="5"
                  class="px-4 py-8 text-center text-red-600"
                >
                  {{ loadError }}
                  <button
                    type="button"
                    @click="reload"
                    class="ml-2 cursor-pointer underline"
                  >
                    Coba lagi
                  </button>
                </td>
              </tr>

              <!-- data kosong -->
              <tr v-else-if="pakets.length === 0">
                <td
                  colspan="5"
                  class="px-4 py-8 text-center text-gray-500"
                >
                  Tidak ada data paket.
                </td>
              </tr>

              <!-- data paket -->
              <template v-else>
                <tr
                  v-for="(paket, index) in pakets"
                  :key="paket.id"
                >
                  <td
                    data-label="No"
                    class="table-data-number"
                  >
                    {{ String(index + 1).padStart(2, '0') }}
                  </td>
                  <td
                    data-label="Nama Paket"
                    class="table-data-name"
                  >
                    {{ paket.name }}
                  </td>
                  <td
                    data-label="Deskripsi"
                    class="text-gray-600"
                  >
                    {{ paket.description }}
                  </td>
                  <td
                    data-label="Status"
                    class="table-data-name"
                  >
                    <div class="flex items-center">
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
                    </div>
                  </td>
                  <td data-label="Aksi">
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
              </template>
            </tbody>
          </table>
        </div>
      </section>

      <BaseModal
        v-model:isOpen="isModalOpen"
        :title="
          modalMode === 'add'
            ? 'Tambah Paket'
            : 'Edit Paket'
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

          <div class="flex flex-col gap-2 w-full mb-4">
            <label for="paket">Nama Paket:</label>
            <input
              class="border-2 rounded-2xl border-[#2F523E] w-full p-2 outline-none focus:border-[#183b28]"
              type="text"
              id="paket"
              name="paket"
              v-model="formData.name"
            />
          </div>

          <div class="flex flex-col gap-2 w-full">
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
  </FetchJSON>
</template>

<script setup>
import '@/assets/role/style.css'
import { ref, reactive, watch } from 'vue'
import FetchJSON from '@/components/common/FetchJson/FetchJson.vue'
import SkeletonBox from '@/components/common/SkeletonBox.vue'
import BaseModal from '@/components/BaseModal.vue'

const MAX_PAKET = 3

// data dari FetchJSON masuk ke dataPaket (v-model di atas)
const dataPaket = ref(null)

// isi tabel setelah data selesai dimuat
const pakets = ref([])
watch(dataPaket, (isi) => {
  pakets.value = isi
})
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
    errorMessage.value =
      'Nama dan deskripsi tidak boleh kosong.'
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
  white-space: nowrap;
}
.table-data-number {
  font-weight: bold;
  color: #183b28;
}
.table-data-name {
  color: #2f523e;
  font-weight: bold;
}

/* Layar di bawah 1024px: tabel berubah jadi kartu,
   satu kartu untuk satu paket. Nama kolomnya diambil
   dari atribut data-label di setiap <td>. */
@media (max-width: 1023px) {
  thead {
    display: none;
  }
  table,
  tbody,
  tr,
  td {
    display: block;
  }
  tr {
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  tr:last-child {
    border-bottom: none;
  }
  td {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.4rem 1rem;
    border-bottom: none;
    text-align: right;
  }
  td::before {
    content: attr(data-label);
    flex-shrink: 0;
    font-size: 0.75rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
  }
  /* baris "memuat", "error", dan "kosong" tidak punya label */
  td[colspan] {
    display: block;
    text-align: center;
  }
  td[colspan]::before {
    content: none;
  }
}
</style>
