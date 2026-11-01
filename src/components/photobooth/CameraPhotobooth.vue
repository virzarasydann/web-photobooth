<template>
  <div class="min-h-screen  bg-[#DCE7E8] p-6">
    <!-- <h1>Photo Studio</h1> -->
    <section
      data-section="parent-wrapper"
      class="flex gap-6 w-full flex-col md:flex-row "
    >
      <LiveCamera @onCapture="parsingVariable"  class=" w-full md:w-3/6 h-fit"></LiveCamera>
      <TemplatePhoto :captured="captured"  class="w-full md:w-3/6"></TemplatePhoto>
    </section>
  </div>
</template>

<script setup>
import { ref} from 'vue'
const captured = ref([])

const parsingVariable = ({url}) => {
  captured.value.push(url)
  

}
import LiveCamera from './LiveCamera.vue'
import TemplatePhoto from './TemplatePhoto.vue'
</script>
