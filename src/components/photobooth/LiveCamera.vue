<style src="@/assets/photobooth/live-camera.css" scoped></style>

<template>
  <section class="bg-white rounded-2xl">
    <div class="mx-3.5 pb-4 ">
      <div class="mt-2 flex justify-between items-center ">
        <h1 class="font-semibold text-2xl ">Live Camera</h1>
        <div class=" ml-2  flex items-center  ">
          <button type="button" class="btn-timer " >3 Detik</button>
          <button type="button" class="btn-timer" >5 Detik</button>
        </div>
      </div>

      <div class="mt-3">
        <video
          v-if="mediaStream"
          ref="videoRef"
          autoplay
          playsinline
          muted
          class="w-full h-auto object-cover"
        ></video>
        <img
          v-else
          src="@/assets/photobooth/viewport.png"
          alt="Viewport"
          class="w-full h-auto object-cover"
          
        />
      </div>

      <button
  type="button"
  @click="onTakePhoto"
  class="mt-4 w-full bg-[#2F523E] text-center p-2 rounded-2xl cursor-pointer text-[#FFFFFF] font-semibold"
>
  Ambil Foto
</button>
      
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const videoRef = ref(null)
const mediaStream = ref(null)

const canvas = document.createElement('canvas')
const emit = defineEmits(['onCapture'])

const onTakePhoto = () => {
  if (!videoRef.value) return
  
  
  const captured = videoRef.value
  
  
  canvas.width = captured.videoWidth
  canvas.height = captured.videoHeight
  
  
  const context = canvas.getContext('2d')
  context.save()
  
  
  context.translate(canvas.width, 0)
  
 
  context.scale(-1, 1)
  
  
  context.drawImage(captured, 0, 0, canvas.width, canvas.height)
  

  context.restore()
  
  
  
  
  emit('onCapture', {
    url:canvas.toDataURL('image/png')
  })
}


const startWebcam = async () => {
  try {
    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: { width: 1000, height: 720 },
      })

    mediaStream.value = stream

    await nextTick()
    
    console.log(videoRef.value)
    if (videoRef.value) {
      videoRef.value.srcObject = stream
    }
  } catch (error) {
    console.error(
      'Akses webcam ditolak atau tidak tersedia:',
      error,
    )
  }
}

const stopWebcam = () => {
  if (mediaStream.value) {
    mediaStream.value
      .getTracks()
      .forEach((track) => track.stop())
    mediaStream.value = null
  }
}

onMounted(() => {
  startWebcam()
})

onUnmounted(() => {
  stopWebcam()
})
</script>
