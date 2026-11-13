
<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  }
})

const data = ref(null)
const isLoading = ref(false)
const loadError = ref('')

const model = defineModel({
  default: null,
})

async function load() {
  isLoading.value = true
  loadError.value = ''
  try {
    
    const res = await fetch(
      `${import.meta.env.VITE_DATASOURCE_BASE_URL}${props.src}`,
    )
    if (!res.ok) {
      throw new Error(`gagal memuat ${props.src}`)
    }

    
    data.value = await res.json()
    model.value = data.value
  } catch {
    loadError.value = `Data  ${props.src} tidak bisa dimuat. Periksa file-nya lalu coba lagi.`
  } finally {
    isLoading.value = false
  }
}

function reload() {
  return load()
}

watch(
  () => props.src,
  () => {
    load()
  },
)

onMounted(() => {
  
    load()
  
})
</script>

<template>
  <slot
    
    :is-loading="isLoading"
    :load-error="loadError"
    :reload="reload"
  />
</template>
