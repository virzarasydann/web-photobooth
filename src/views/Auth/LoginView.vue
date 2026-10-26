<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const ready = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })
})

const inputClass =
  'w-full rounded-[0.9rem] border-2 border-transparent bg-[#d9d9d9] px-4 py-3 text-[0.9rem] text-[#111] outline-none transition-all duration-200 placeholder:text-[#7a7a7a] focus:border-[#fcc453] focus:bg-white focus:shadow-[0_0_0_4px_rgba(252,196,83,0.35)]'

async function submit() {
  error.value = ''
  if (!username.value.trim() || !password.value) {
    error.value = 'Username dan password wajib diisi.'
    return
  }
  loading.value = true

  await new Promise((resolve) => setTimeout(resolve, 800))
  loading.value = false
  router.push('/')
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
      class="flex flex-col justify-center bg-[#2F523E] px-8 py-10 text-white transition-all duration-700 ease-out md:px-12 md:py-16 min-[75rem]:px-20"
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
          Selamat Datang Kembali
        </p>
        <h2
          class="m-0 text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.2] font-medium"
        >
          Masuk Ke
          <span
            class="font-['Pacifico',cursive] font-normal whitespace-nowrap"
          >
            Dunia Anda
          </span>
        </h2>
        <p
          class="mt-2 mb-6 max-w-[16rem] text-[0.8rem] leading-[1.4]"
        >
          Masukkan detail akun anda untuk melanjutkan
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
          v-model="username"
          type="text"
          autocomplete="username"
          placeholder="Masukkan Username"
          :class="inputClass"
        />

        <label
          for="password"
          class="mt-4 mb-1 block text-[0.8rem] font-medium"
        >
          Password
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="Masukkan Password"
            :class="[inputClass, 'pr-16']"
          />
          <button
            type="button"
            class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-md px-2 py-1 text-[0.75rem] font-medium text-[#555] transition-colors duration-200 hover:text-black"
            :aria-label="
              showPassword
                ? 'Sembunyikan password'
                : 'Tampilkan password'
            "
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Tutup' : 'Lihat' }}
          </button>
        </div>

        <p
          class="mt-3 min-h-[1.25rem] text-[0.8rem] font-medium text-white transition-opacity duration-200"
          :class="error ? 'opacity-100' : 'opacity-0'"
          role="alert"
        >
          {{ error }}
        </p>

        <div class="mt-3 text-center">
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex h-12 min-w-[11rem] cursor-pointer items-center justify-center rounded-[0.9rem] border-0 bg-[#fcc453] px-8 text-[0.95rem] font-medium text-black shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all duration-200 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.25)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {{
              loading ? 'Memproses...' : 'Masuk Sekarang'
            }}
          </button>
        </div>

        <p class="mt-6 mb-0 text-center text-[0.75rem]">
          Belum memiliki akun?
          <RouterLink
            to="/register"
            class="font-semibold text-white underline-offset-2 transition-opacity duration-200 hover:underline hover:opacity-80"
          >
            Daftar gratis
          </RouterLink>
        </p>
      </form>
    </section>
  </div>
</template>
