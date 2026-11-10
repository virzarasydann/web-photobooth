<script setup>
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const ready = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })
})

const inputClass =
  'w-full rounded-[0.9rem] border-2 border-transparent bg-[#d9d9d9] px-4 py-3 text-[0.9rem] text-[#111] outline-none transition-all duration-200 placeholder:text-[#7a7a7a] focus:border-[#fcc453] focus:bg-white focus:shadow-[0_0_0_4px_rgba(252,196,83,0.35)]'
const inputErrorClass = '!border-[#8b1e0f]'

function validate() {
  errors.username = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.username.trim()) {
    errors.username = 'Username wajib diisi.'
  } else if (form.username.trim().length < 3) {
    errors.username = 'Username minimal 3 karakter.'
  }

  if (!form.email.trim()) {
    errors.email = 'Alamat email wajib diisi.'
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  ) {
    errors.email = 'Format email tidak valid.'
  }

  if (!form.password) {
    errors.password = 'Kata sandi wajib diisi.'
  } else if (form.password.length < 6) {
    errors.password = 'Kata sandi minimal 6 karakter.'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword =
      'Konfirmasi kata sandi wajib diisi.'
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword =
      'Konfirmasi kata sandi tidak sama.'
  }

  return !Object.values(errors).some(Boolean)
}

async function submit() {
  if (!validate()) return
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  loading.value = false
  router.push('/login')
}
</script>

<template>
  <div
    class="grid min-h-svh grid-cols-1 font-['Poppins',sans-serif] md:grid-cols-2"
  >
    <section
      class="relative flex flex-col justify-center bg-[#cccccc] px-8 pt-16 pb-10 text-center transition-all duration-700 ease-out md:px-12 md:py-16 md:text-start min-[75rem]:px-20"
      :class="
        ready
          ? 'translate-y-0 opacity-100'
          : '-translate-y-3 opacity-0'
      "
    >
      <RouterLink
        to="/"
        class="absolute top-5 left-6 text-[0.8rem] font-medium text-[#2f5440] no-underline transition-opacity duration-200 hover:opacity-70"
      >
        &larr; Beranda
      </RouterLink>

      <div class="mx-auto w-full max-w-[26rem] md:mx-0">
        <p
          class="mb-4 text-[0.95rem] font-medium text-[#2f5440] md:mb-6 md:text-[1.05rem]"
        >
          Ruang Kenangan Anda
        </p>
        <h1
          class="m-0 text-[clamp(2rem,5vw,3rem)] leading-[1.15] font-bold text-black"
        >
          Simpan Setiap
          <span
            class="mt-1 block font-['Pacifico',cursive] font-normal"
          >
            Cerita Ajaib.
          </span>
        </h1>
        <p
          class="mx-auto mt-4 max-w-[20rem] text-[0.9rem] leading-[1.5] font-medium text-[#2f5440] md:mx-0 md:mt-6 md:text-[1rem]"
        >
          Masuk untuk akses template lebih luas, mengatur
          sesi dan banyak hal.
        </p>
      </div>
    </section>

    <section
      class="flex flex-col justify-center bg-[#2F523E] px-8 py-10 text-white transition-all duration-700 ease-out md:px-12 md:py-12 min-[75rem]:px-20"
      :class="
        ready
          ? 'translate-y-0 opacity-100'
          : 'translate-y-3 opacity-0'
      "
    >
      <form
        class="mx-auto w-full max-w-[24rem] md:mx-0"
        novalidate
        @submit.prevent="submit"
      >
        <p
          class="mb-2 text-[0.95rem] font-medium md:text-[1.05rem]"
        >
          Halo, Pengguna Baru
        </p>
        <h2
          class="m-0 text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.2] font-medium"
        >
          Daftar Ke
          <span
            class="font-['Pacifico',cursive] font-normal whitespace-nowrap"
          >
            Dunia Anda
          </span>
        </h2>
        <p
          class="mt-2 mb-5 max-w-[16rem] text-[0.8rem] leading-[1.4]"
        >
          Buat akun anda untuk mulai menyimpan setiap
          cerita.
        </p>

        <label
          for="username"
          class="mb-1 block text-[0.8rem] font-medium"
        >
          Username
        </label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          autocomplete="username"
          placeholder="Masukkan Username"
          :class="[
            inputClass,
            errors.username && inputErrorClass,
          ]"
          @input="errors.username = ''"
        />
        <p
          class="mt-1 mb-1 min-h-[1.1rem] text-[0.75rem] font-medium text-[#fff1c2]"
          role="alert"
        >
          {{ errors.username }}
        </p>

        <label
          for="email"
          class="mb-1 block text-[0.8rem] font-medium"
        >
          Alamat Email
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          placeholder="Masukkan Alamat Email"
          :class="[
            inputClass,
            errors.email && inputErrorClass,
          ]"
          @input="errors.email = ''"
        />
        <p
          class="mt-1 mb-1 min-h-[1.1rem] text-[0.75rem] font-medium text-[#fff1c2]"
          role="alert"
        >
          {{ errors.email }}
        </p>

        <label
          for="password"
          class="mb-1 block text-[0.8rem] font-medium"
        >
          Kata Sandi
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            placeholder="Masukkan Kata Sandi"
            :class="[
              inputClass,
              'pr-16',
              errors.password && inputErrorClass,
            ]"
            @input="errors.password = ''"
          />
          <button
            type="button"
            class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-md px-2 py-1 text-[0.75rem] font-medium text-[#555] transition-colors duration-200 hover:text-black"
            :aria-label="
              showPassword
                ? 'Sembunyikan kata sandi'
                : 'Tampilkan kata sandi'
            "
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Tutup' : 'Lihat' }}
          </button>
        </div>
        <p
          class="mt-1 mb-1 min-h-[1.1rem] text-[0.75rem] font-medium text-[#fff1c2]"
          role="alert"
        >
          {{ errors.password }}
        </p>

        <label
          for="confirmPassword"
          class="mb-1 block text-[0.8rem] font-medium"
        >
          Konfirmasi Kata Sandi
        </label>
        <div class="relative">
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            :type="showConfirm ? 'text' : 'password'"
            autocomplete="new-password"
            placeholder="Ulangi Kata Sandi"
            :class="[
              inputClass,
              'pr-16',
              errors.confirmPassword && inputErrorClass,
            ]"
            @input="errors.confirmPassword = ''"
          />
          <button
            type="button"
            class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-md px-2 py-1 text-[0.75rem] font-medium text-[#555] transition-colors duration-200 hover:text-black"
            :aria-label="
              showConfirm
                ? 'Sembunyikan konfirmasi kata sandi'
                : 'Tampilkan konfirmasi kata sandi'
            "
            @click="showConfirm = !showConfirm"
          >
            {{ showConfirm ? 'Tutup' : 'Lihat' }}
          </button>
        </div>
        <p
          class="mt-1 mb-1 min-h-[1.1rem] text-[0.75rem] font-medium text-[#fff1c2]"
          role="alert"
        >
          {{ errors.confirmPassword }}
        </p>

        <div class="mt-3 text-center">
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex h-12 min-w-[11rem] cursor-pointer items-center justify-center rounded-[0.9rem] border-0 bg-[#fcc453] px-8 text-[0.95rem] font-medium text-black shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all duration-200 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.25)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {{
              loading ? 'Memproses...' : 'Daftar Sekarang'
            }}
          </button>
        </div>

        <p class="mt-5 mb-0 text-center text-[0.75rem]">
          Sudah memiliki akun?
          <RouterLink
            to="/login"
            class="font-semibold text-white underline-offset-2 transition-opacity duration-200 hover:underline hover:opacity-80"
          >
            Masuk
          </RouterLink>
        </p>
      </form>
    </section>
  </div>
</template>
