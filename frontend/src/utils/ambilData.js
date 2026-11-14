import { ref, onMounted } from 'vue'

// Mengambil data JSON dari folder public.

export function useAmbilData(url) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref('')

  async function muat() {
    loading.value = true
    error.value = ''

    try {
      await new Promise((selesai) =>
        setTimeout(selesai, 1000),
      )
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Respons server tidak berhasil')
      }
      data.value = await response.json()
    } catch {
      error.value =
        'Data gagal dimuat. Periksa koneksi lalu coba lagi.'
    } finally {
      loading.value = false
    }
  }

  onMounted(muat)

  return { data, loading, error, muat }
}
