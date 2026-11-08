<template>
  <section
    class="fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[60] flex h-[min(34rem,calc(100dvh-1rem-env(safe-area-inset-bottom)))] min-h-0 flex-col overflow-hidden rounded-2xl border border-[#DCE7E8] bg-white shadow-2xl sm:inset-x-auto sm:right-4 sm:bottom-4 sm:h-[min(34rem,calc(100dvh-2rem))] sm:w-[min(23rem,calc(100vw-2rem))]"
    aria-label="Bantuan"
    role="dialog"
    aria-modal="false"
    aria-labelledby="chat-widget-title"
  >
    <header class="flex shrink-0 items-center justify-between bg-[#2F523E] px-3 py-2.5 text-white sm:px-4 sm:py-3">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 18h6m-5 3h4m-2-19a7 7 0 0 0-4.1 12.67c.7.5 1.1 1.32 1.1 2.18h6c0-.86.4-1.68 1.1-2.18A7 7 0 0 0 12 2Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5.5v3m-1.5-1.5h3" />
          </svg>
        </div>
        <div>
          <h2 id="chat-widget-title" class="text-sm font-bold">Bantuan</h2>
          <p class="text-[11px] text-white/75">Asisten AI</p>
        </div>
      </div>
      <button
        type="button"
        @click="$emit('close')"
        class="flex h-11 w-11 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
        aria-label="Tutup bantuan"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
    </header>

    <div class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain bg-[#F7F9F8] p-3 sm:p-4" aria-live="polite">
      <div class="max-w-[90%] self-start rounded-2xl rounded-tl-md border border-[#E5EAE7] bg-white px-3.5 py-3 text-xs leading-relaxed text-[#435148] shadow-sm">
        Halo! Ada yang bisa saya bantu terkait penggunaan Photobooth?
      </div>
      <template v-for="(message, index) in messages" :key="index">
        <div
          class="max-w-[90%] rounded-2xl px-3.5 py-3 text-xs leading-relaxed shadow-sm"
          :class="message.type === 'user'
            ? 'self-end rounded-tr-md bg-[#2F523E] text-white'
            : 'self-start rounded-tl-md border border-[#E5EAE7] bg-white text-[#435148]'"
        >
          {{ message.text }}
        </div>
      </template>
      <p v-if="statusMessage" class="text-center text-[10px] text-[#927A3D]">
        {{ statusMessage }}
      </p>
    </div>

    <form class="shrink-0 border-t border-[#E6EBE8] bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-3" @submit.prevent="sendMessage">
      <label for="chat-message" class="sr-only">Tulis pertanyaan</label>
      <div class="flex items-center gap-2">
        <input
          id="chat-message"
          v-model="draftMessage"
          type="text"
          autocomplete="off"
          placeholder="Tulis pertanyaan..."
          class="h-11 min-w-0 flex-1 rounded-xl border border-[#E1E7E3] bg-[#F7F9F8] px-3 text-base text-[#526057] outline-none placeholder:text-[#98A29B] focus:border-[#73917D] sm:h-10 sm:text-xs"
        />
        <button
          type="submit"
          :disabled="!draftMessage.trim()"
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2F523E] text-white transition hover:bg-[#244430] disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
          aria-label="Kirim pesan"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="m5 12 14-7-4.5 14-3-5.5L5 12Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.5 13.5 3.5-4" />
          </svg>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['close'])

const draftMessage = ref('')
const messages = ref([])
const statusMessage = ref('')

const sendMessage = () => {
  const text = draftMessage.value.trim()
  if (!text) return

  messages.value.push({ type: 'user', text })
  draftMessage.value = ''
  statusMessage.value = 'Pesan belum diproses AI. Sambungan API akan ditambahkan nanti.'
}
</script>
