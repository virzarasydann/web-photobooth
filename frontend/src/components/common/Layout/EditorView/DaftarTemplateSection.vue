<script setup>
import { computed, watch } from 'vue'
import FetchJson from '@/components/common/FetchJson/FetchJson.vue'
import StatusData from '@/components/common/StatusData.vue'
import KartuEditor from './KartuEditor.vue'
import TabelTemplate from './TabelTemplate.vue'
import DaftarTemplateSkeleton from './DaftarTemplateSkeleton.vue'

const props = defineProps({
  // Naik setiap kali ada template baru disimpan,
  // supaya daftar dimuat ulang dari file JSON
  versi: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['preview', 'hapus'])

// Daftar template, isinya diisi oleh FetchJson
// (null = belum selesai dimuat)
const templates = defineModel({ default: null })

const alamatData = computed(() => {
  const alamat = 'DataSource/template-photo.json'
  return props.versi ? `${alamat}?v=${props.versi}` : alamat
})

const judul = computed(() => {
  if (!templates.value) return 'Daftar Template'
  return `Daftar Template (${templates.value.length})`
})

// Template lama belum punya status, jadi dianggap Aktif
watch(templates, (isi) => {
  if (!isi) return
  for (const item of isi) {
    if (!item.status) item.status = 'Aktif'
  }
})
</script>

<template>
  <KartuEditor
    tag="section"
    aria-labelledby="judul-daftar-template"
    class="bg-white p-5"
  >
    <h2
      id="judul-daftar-template"
      class="mb-4 border-b-2 border-[#153A2B]/15 pb-2 font-bold"
    >
      {{ judul }}
    </h2>

    <FetchJson
      v-model="templates"
      :src="alamatData"
      v-slot="{ isLoading, loadError, reload }"
    >
      <DaftarTemplateSkeleton
        v-if="isLoading || (!templates && !loadError)"
      />
      <StatusData
        v-else-if="loadError"
        :error="loadError"
        @ulangi="reload"
      />
      <TabelTemplate
        v-else
        :templates="templates"
        @preview="emit('preview', $event)"
        @hapus="emit('hapus', $event)"
      />
    </FetchJson>
  </KartuEditor>
</template>
