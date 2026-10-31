<template>
  <div
    data-section="list-template-modal"
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-50 p-4 flex items-center justify-center gap-6"
    @click.self="isOpen = false"
  >
    <div
      class="bg-[#FFFFFF] w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-[#2F523E] rounded-2xl p-6 flex flex-col gap-4 "
    >
      <div
        class="flex items-center justify-between border-b border-gray-200 pb-3"
      >
        <h3 class="font-bold text-lg text-[#2F523E]">
          Pilih Template
        </h3>
        <p
          v-if="clickSuccess"
          class="text-[#2F523E] font-semibold"
        >
          Template Berhasil Dipilih
        </p>
       
        <button
          type="button"
          @click="isOpen = false"
          class="text-gray-500 hover:text-red-600 font-medium text-sm px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          ✕ Tutup
        </button>
      </div>

      <div
        class="flex flex-row flex-wrap gap-4 items-center"
      >
        <button
          type="button"
          class="group bg-[#FFFFFF] border-2 border-[#DCE7E8] rounded-2xl w-[calc(33.333%-0.8rem)] cursor-pointer p-2 hover:border-[#2F523E] transition-colors"
          v-for="item in TemplateJson"
          :key="item.id"
          @click="onClick(item.backgroundUrl)"
        >
          <div class="flex flex-col px-2 py-1">
            <div
              class="bg-[#DCE7E8] w-fit mx-auto group-hover:bg-[#2F523E] group-hover:text-white transition-colors rounded-lg px-3 mt-1"
            >
              <p class="text-xs font-medium">
                {{ item.slot }} Foto
              </p>
            </div>
            <div class="mt-2">
              <p class="font-semibold text-sm">
                {{ item.name }}
              </p>
            </div>
            <div>
              <p class="text-xs font-light text-gray-600">
                {{ item.description }}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div
      class="bg-white w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl p-6 flex flex-row flex-wrap gap-4 justify-center items-center"
    >
      <img
        v-if="TemplateImage"
        :src="TemplateImage"
        alt="Preview Template"
        class="max-w-full h-auto rounded-lg"
      />
      <p v-else class="text-gray-400 text-sm">
        Pilih template untuk melihat preview
      </p>
    </div>
  </div>
</template>

<script setup>
import Json from '@/config/DataSource/template-photo.json'
import { ref } from 'vue'

const TemplateJson = ref(Json)
const TemplateImage = ref('')
const clickSuccess = ref(false)
const isOpen = defineModel('isOpen', {
  type: Boolean,
  default: false,
})
defineExpose({TemplateImage})


let timer = null 

const onClick = async (backgroundUrl) => {
  TemplateImage.value = backgroundUrl

  
  clickSuccess.value = false

  
  if (timer) clearTimeout(timer)

  
  await new Promise((resolve) => setTimeout(resolve, 100))

  
  clickSuccess.value = true


  timer = setTimeout(() => {
    clickSuccess.value = false
  }, 2500)
}
</script>
