<template>
  <section class="bg-white rounded-2xl  max-h-max">
    <div class="mx-3.5 pb-2">
      <div class="mt-2 flex items-center">
        <h1 class="font-semibold text-2xl ">
          PILIH TEMPLATE DESAIN
        </h1>
      </div>

      <div
        class="mt-3 bg-[#2F523E] text-center p-2 rounded-2xl cursor-pointer"
        data-section="button-modal"
      >
        <button
          type="button"
          @click="isOpenModal = true"
          class="cursor-pointer text-[#FFFFFF] font-semibold"
        >
          Tekan untuk menampilkan seluruh template
        </button>
      </div>

      <ListTemplateModal
        v-model:is-open="isOpenModal"
        ref="ListTemplateModalRef"
      ></ListTemplateModal>
    </div>
    <div class="flex justify-center">
      <img
        :src="ListTemplateModalRef.TemplateImage"
        alt=""
        srcset=""
        class="max-h-screen"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ListTemplateModal from './ListTemplateModal.vue'

const isOpenModal = ref(false)
const ListTemplateModalRef = ref('')
</script>
