<template>
  <Teleport to="body">
    <div v-if="isOpen && tipe === 'konfirmasi'"
      class="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4" @click.self="isOpen = false">
      <div class="relative w-full max-w-lg bg-white rounded-3xl p-8 text-center">
        <button @click="isOpen = false"
          class="absolute top-6 right-6 w-10 h-10 rounded-full border border-gray-200 text-gray-500 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 class="mt-8 text-2xl md:text-3xl font-bold text-[#1C2B22]">{{ title }}</h2>

        <p class="mt-3 text-gray-600">
          <slot></slot>
        </p>

        <img v-if="gambar" :src="gambar" alt="Foto" class="mt-6 mx-auto max-h-64 rounded-2xl" />

        <div class="mt-8 grid grid-cols-2 gap-4">
          <button @click="isOpen = false"
            class="py-3 rounded-xl border border-gray-300 font-semibold text-[#1C2B22] cursor-pointer hover:bg-gray-50 transition">
            Batal
          </button>
          <button @click="$emit('konfirmasi')" :class="warnaTombol"
            class="py-3 rounded-xl font-semibold cursor-pointer transition">
            {{ tombolKonfirmasi }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>

  <div v-if="isOpen && tipe === 'biasa'" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="isOpen = false">
    <div class="bg-[#FFFFFF] max-w-2xl min-h-96 border-3 border-[#2F523E] rounded-2xl flex flex-col w-full">
      <div class="modal-header">
        <h1>{{ title }}</h1>
        <button type="button" @click="isOpen = false" class="cursor-pointer bg-[#2F523E] w-11 p-2 rounded-2xl">
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
          <input class="cursor-pointer text-white bg-[#2F523E] w-28 p-2 rounded-2xl" type='button' value="Submit"
            @click="isOpen = false" />
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
  tipe: {
    type: String,
    default: 'biasa',
  },
  gambar: {
    type: String,
    default: '',
  },
  tombolKonfirmasi: {
    type: String,
    default: 'Ya',
  },
  warnaTombol: {
    type: String,
    default: 'bg-[#2F523E] text-white',
  },
})

defineEmits(['konfirmasi'])
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
  color: white
}
</style>