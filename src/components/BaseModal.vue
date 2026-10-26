<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="isOpen = false"
  >
    <div
      class="bg-[#FFFFFF] max-w-2xl min-h-96 border-3 border-[#2F523E] rounded-2xl flex flex-col w-full"
    >
      <div class="modal-header">
        <h1>{{ title }}</h1>
        <button
          type="button"
          @click="isOpen = false"
          class="cursor-pointer bg-[#2F523E] w-11 p-2 rounded-2xl"
        >
          X
        </button>
      </div>
      <hr />
      <div class="modal-body w-xl mx-auto flex-1">
        <slot></slot>
      </div>
      <hr />
      <div class="modal-footer">
        <slot name="footer">
          <input
            class="cursor-pointer text-white bg-[#2F523E] w-28 p-2 rounded-2xl"
            type='button'
            value="Submit"
            @click="isOpen = false"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = defineModel('isOpen', {
  type: Boolean,
  default: false,
})

defineProps({
  title: {
    type: String,
    default: 'Modal',
  },
})
</script>

<style scoped>
.modal-body {
  margin-top: 10px;
}
.modal-header button[type='button'] {
  font-weight: bolder;
  color: white;
}
.modal-header h1 {
  font-weight: bolder;
  font-size: x-large;
}
.modal-footer input[type='button'] {
  font-weight: bolder;
  color: white;
}

button[type='button'] {
  font-weight: bolder;
  color: white;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  margin: 10px;
}
.modal-footer {
  display: flex;
  justify-content: end;
  margin-right: 10px;
  margin: 10px;
  color:white
}


</style>
