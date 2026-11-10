import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePhotoboothAudioStore = defineStore('photoboothAudio', () => {
  const soundEnabled = ref(true)

  function toggleSound() {
    soundEnabled.value = !soundEnabled.value
  }

  return {
    soundEnabled,
    toggleSound
  }
})

