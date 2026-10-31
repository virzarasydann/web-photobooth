<template>
  <div class="min-h-screen  bg-[#DCE7E8] p-6">
    <!-- <h1>Photo Studio</h1> -->
    <section
      data-section="parent-wrapper"
      class="flex gap-6 max-w-7xl flex-col md:flex-row "
    >
      <LiveCamera class=" w-full md:w-3/6 h-fit"></LiveCamera>
      <TemplatePhoto class="w-3/6"></TemplatePhoto>
    </section>
  </div>
</template>

<script setup>
import LiveCamera from './LiveCamera.vue'
import TemplatePhoto from './TemplatePhoto.vue'
</script>
