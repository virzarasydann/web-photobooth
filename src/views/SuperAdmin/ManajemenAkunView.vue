<template>
  <section class="mt-3 ml-3">
    <h1 class="text-3xl font-bold text-[#2F523E]">Manajemen Akun</h1>
    <div class="flex justify-between">
      <p>Kelola data akun pengguna, admin, dan superadmin untuk Photobooth</p>
    </div>
  </section>
  
  <section class="max-w-7xl mx-14">
    <div class="flex justify-end mb-3">
      <button
        type="button"
        @click="openAddModal"
        class="bg-[#DCE7E8] w-32 p-2 mr-3 rounded-t-2xl rounded-b-2xl cursor-pointer font-semibold text-[#183b28] hover:bg-[#c4d4d6] transition"
      >
        Tambah
      </button>
    </div>

    <div class="rounded-tl-lg rounded-tr-lg overflow-hidden border border-gray-200 shadow-sm">
      <table class="w-full">
        <thead class="bg-[#DCE7E8]">
          <tr>
            <th>NO</th>
            <th>NAMA AKUN</th>
            <th>EMAIL</th>
            <th>ROLE</th>
            <th>STATUS</th>
            <th>AKSI</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(akun, index) in accounts" :key="akun.id">
            <td class="table-data-number">
              {{ String(index + 1).padStart(2, '0') }}
            </td>
            <td class="table-data-name">
              {{ akun.name }}
            </td>
            <td>
              {{ akun.email }}
            </td>
            <td class="font-semibold text-gray-700">
              {{ getRoleName(akun.id_role) }}
            </td>
            <td>
              <span :class="akun.isActive ? 'text-green-600' : 'text-red-500'" class="font-bold">
                {{ akun.isActive ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td>
              <div class="flex gap-2">
                <!-- Tambahkan event @click="openEditModal(akun)" pada tombol Edit -->
                <button @click="openEditModal(akun)" class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 cursor-pointer transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button @click="toggleStatus(akun.id)" :class="akun.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'" class="px-3 py-1 text-white rounded text-sm cursor-pointer transition">
                  {{ akun.isActive ? 'Nonaktifkan' : 'Aktifkan' }}
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="accounts.length === 0">
            <td colspan="6" class="px-4 py-8 text-center text-gray-500">Tidak ada data akun.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Judul Modal Berubah Dinamis berdasarkan mode (Tambah atau Edit) -->
  <BaseModal v-model:isOpen="isModalOpen" :title="modalMode === 'add' ? 'Tambah Akun' : 'Edit Akun'">
    <form action="" method="post" @submit.prevent>
      
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-semibold text-center">
        {{ errorMessage }}
      </div>

      <div class="form-group gap-4 w-full mb-4">
        <label for="nama">Nama Akun:</label>
        <input
          class="border-2 rounded-2xl min-h-13 border-[#2F523E] p-2 w-full outline-none focus:border-[#183b28]"
          type="text"
          id="nama"
          v-model="formData.name"
        />
      </div>
      <div class="form-group gap-4 w-full mb-4">
        <label for="email">Email:</label>
        <input
          class="border-2 rounded-2xl min-h-13 border-[#2F523E] p-2 w-full outline-none focus:border-[#183b28]"
          type="email"
          id="email"
          v-model="formData.email"
        />
      </div>
      <div class="form-group gap-4 w-full mb-4">
        <label for="password">Password:</label>
        <!-- Placeholder berubah jika mode edit, memberi tahu pw bisa dikosongkan -->
        <input
          class="border-2 rounded-2xl min-h-13 border-[#2F523E] p-2 w-full outline-none focus:border-[#183b28]"
          type="password"
          id="password"
          :placeholder="modalMode === 'add' ? 'Masukkan password...' : 'Kosongkan jika tidak diubah...'"
          v-model="formData.password"
        />
      </div>
      <div class="form-group gap-4 w-full">
        <label for="role">Role:</label>
        <!-- Select diberi atribut :disabled saat mode edit agar tidak bisa diubah -->
        <select 
          class="border-2 rounded-2xl min-h-13 border-[#2F523E] p-2 w-full bg-white outline-none focus:border-[#183b28] disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed" 
          id="role" 
          v-model="formData.id_role"
          :disabled="modalMode === 'edit'"
        >
          <option v-for="role in rolesData" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>
    </form>
    
    <template #footer>
      <input
        class="cursor-pointer bg-[#2F523E] text-white font-semibold hover:bg-[#183b28] transition w-28 p-2 rounded-2xl"
        type="button"
        value="Simpan"
        @click="handleSubmit"
      />
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseModal from '@/components/BaseModal.vue'

import UserJson from '@/config/DataSource/user.json'
import RoleJson from '@/config/DataSource/role.json'

const accounts = ref(UserJson)
const rolesData = ref(RoleJson)

const isModalOpen = ref(false)
const errorMessage = ref('') 

// State baru untuk menentukan apakah sedang menambah (add) atau mengedit (edit)
const modalMode = ref('add') 
// Menyimpan ID dari akun yang sedang diedit
const selectedAccountId = ref(null)

// Mengubah nama variabel newAkun menjadi formData agar lebih umum (bisa untuk add & edit)
const formData = reactive({
  name: '',
  email: '',
  password: '',
  id_role: '' 
})

const getRoleName = (idRole) => {
  const role = rolesData.value.find(r => r.id === idRole);
  return role ? role.name : 'Unknown Role';
}

const openAddModal = () => {
  modalMode.value = 'add'
  errorMessage.value = '' 
  
  // Kosongkan form
  formData.name = ''
  formData.email = ''
  formData.password = ''
  formData.id_role = rolesData.value.length > 0 ? rolesData.value[0].id : ''
  
  isModalOpen.value = true
}

const openEditModal = (akun) => {
  modalMode.value = 'edit'
  selectedAccountId.value = akun.id
  errorMessage.value = ''
  
  // Isi form dengan data yang dipilih
  formData.name = akun.name
  formData.email = akun.email
  formData.password = '' // Sengaja dikosongkan agar pw lama (hash) tidak terlihat
  formData.id_role = akun.id_role
  
  isModalOpen.value = true
}

// Fungsi ini sekarang menangani Submit untuk Tambah DAN Edit
const handleSubmit = () => {
  // Validasi Nama dan Email wajib isi
  if (!formData.name.trim() || !formData.email.trim()) {
    errorMessage.value = 'Nama dan Email tidak boleh kosong!'
    return 
  }

  // Validasi Password: Wajib saat tambah, opsional saat edit
  if (modalMode.value === 'add' && !formData.password.trim()) {
    errorMessage.value = 'Password wajib diisi saat menambah akun!'
    return
  }
  
  errorMessage.value = ''

  if (modalMode.value === 'add') {
    // Proses Tambah Data
    accounts.value.push({
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      id_role: formData.id_role,
      isActive: true
    })
  } else if (modalMode.value === 'edit') {
    // Proses Edit Data
    const index = accounts.value.findIndex(a => a.id === selectedAccountId.value)
    if (index !== -1) {
      accounts.value[index].name = formData.name
      accounts.value[index].email = formData.email
      // Jika butuh proses perubahan pw untuk dikirim ke backend, taruh di sini
      // Role sengaja tidak diupdate sesuai instruksi
    }
  }
  
  isModalOpen.value = false
}

const toggleStatus = (id) => {
  const akun = accounts.value.find(a => a.id === id)
  if (akun) {
    akun.isActive = !akun.isActive
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