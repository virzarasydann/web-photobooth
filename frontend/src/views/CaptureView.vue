<template>
    <div class="
    min-h-screen w-full 
    bg-gray-100 
    flex flex-col 
    font-sans">

        <!-- header -->
        <header class="
        w-full max-w-6xl mx-auto 
        px-4 py-4 
        hidden md:block">

            <div class="
            w-full 
            flex items-center gap-4">

                <!-- navbar -->
                <nav class="
                w-full flex items-center relative
                bg-[#2f5440] text-white 
                rounded-full shadow-md 
                px-2 py-2 ">

                    <!-- logo -->
                    <div class="
                    w-10 h-10 ml-2 shrink-0
                    bg-gray-300 border-2 border-white
                    rounded-full overflow-hidden
                    flex items-center justify-center">
                        <img src="@/assets/img/logo.png" alt="logo" class="w-full h-full object-cover">
                    </div>

                    <!-- menu -->
                    <ul class="
                    w-full m-0 p-0 pr-12
                    flex justify-center gap-6 list-none">
                        <li>
                            <RouterLink to="/" class="
                            block px-4 py-1
                        text-white text-sm 
                        rounded-full hover:bg-white/20 
                        transition">
                                Beranda
                            </RouterLink>
                        </li>

                        <li>
                            <a href="#showcase" class="
                            block px-4 py-1
                            bg-white text-[#2f5440] text-sm font-bold
                            rounded-full">
                                Template
                            </a>
                        </li>

                        <li>
                            <a href="/about" class="
                            block px-4 py-1
                            text-white text-sm 
                            rounded-full hover:bg-white/20 
                            transition">
                                Tentang
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>
        </header>

        <!-- main -->
        <main class="
        w-full flex-col flex items-center 
        mt-2">

            <div class="
            flex items-start gap-6">

                <!-- kamera dan tombol -->
                <div class="flex flex-col items-center">

                    <div class="
                    w-[500px] h-[350px] relative
                    bg-black 
                    rounded-3xl shadow-xl overflow-hidden ">

                        <!-- Video Kamera -->
                        <video v-show="!isFinished" ref="videoRef" autoplay playsinline
                            class="w-full h-full object-cover transform scale-x-[-1]"></video>

                        <div v-show="isFinished" class="
                        w-full h-full relative
                        bg-black 
                        flex items-center justify-center ">

                            <div class="w-full h-full grid grid-cols-3 grid-rows-3 border border-gray-700/50">
                                <div v-for="i in 9" :key="i" class="border border-gray-700/50"></div>
                            </div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-16 h-16 border-2 border-gray-500 rounded-sm"></div>
                            </div>
                        </div>

                        <div v-if="isCountingDown" class="
                        absolute inset-0 z-10 
                        flex items-center justify-center">
                            <span
                                class="text-black text-[100px] font-black drop-shadow-[0_4px_4px_rgba(255,255,255,0.8)]">
                                {{ countdown }}
                            </span>
                        </div>
                    </div>

                    <!-- tombol bawah kamera -->
                    <div class="mt-6 flex justify-center w-full">

                        <button v-if="!isFinished" @click="startCapture" :disabled="isCountingDown" class="
                        px-8 py-2 
                        bg-[#2f5440] text-white text-sm font-bold 
                        rounded-full shadow-md 
                        hover:bg-opacity-90 disabled:opacity-50 transition ">
                            {{ isCountingDown ? 'Mengambil' : 'Jepret!' }}
                        </button>

                        <div v-else class="flex gap-4">
                            <button @click="resetPhotos" class="
                            px-6 py-2 
                            bg-[#4b6a55] text-white text-sm font-bold 
                            rounded-full shadow-md hover:bg-opacity-90">
                                Ulangi
                            </button>

                            <button @click="savePhotos" class="
                            px-6 py-2 
                            bg-[#2f5440] text-white text-sm font-bold 
                            rounded-full shadow-md hover:bg-opacity-90">
                                Simpan
                            </button>
                        </div>
                    </div>

                </div>

                <!-- hasil foto -->
                <div class="
            flex flex-col gap-3 w-[120px]">

                    <div v-for="index in 3" :key="index" class="
                    w-full h-[85px] relative
                    bg-gray-200 
                    border-2 border-white rounded-lg shadow-sm 
                    flex items-center justify-center overflow-hidden ">
                        <img v-if="capturedPhotos[index - 1]" :src="capturedPhotos[index - 1]"
                            class="w-full h-full object-cover transform scale-x-[-1]" />
                    </div>
                </div>

            </div>

            <!-- filter -->
            <div class="flex gap-4 mt-8">
                <div v-for="i in 7" :key="i" class="
            w-12 h-12 
            bg-gray-300 
            border-2 border-white rounded-full shadow-md 
            overflow-hidden cursor-pointer hover:scale-105 transition">
                    <img src="@/assets/img/Filter.png" alt="filter" class="w-full h-full object-cover" />
                </div>
            </div>

        </main>
        <canvas ref="canvasRef" class="hidden"></canvas>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const videoRef = ref(null);
const canvasRef = ref(null);

const isCountingDown = ref(false);
const countdown = ref(3);
const capturedPhotos = ref([]);
const isFinished = ref(false);
let stream = null;

const startCamera = async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.value) {
            videoRef.value.srcObject = stream;
        }
    } catch (error) {
        alert("Izin kamera belum dikasih!");
    }
};

const stopCamera = () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
};

const startCapture = () => {
    if (capturedPhotos.value.length >= 3) return;

    isCountingDown.value = true;
    countdown.value = 3;

    const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value === 0) {
            clearInterval(timer);
            takePhoto();
        }
    }, 1000);
};

const takePhoto = () => {
    if (videoRef.value && canvasRef.value) {
        const context = canvasRef.value.getContext('2d');
        canvasRef.value.width = videoRef.value.videoWidth;
        canvasRef.value.height = videoRef.value.videoHeight;

        context.drawImage(videoRef.value, 0, 0, canvasRef.value.width, canvasRef.value.height);

        const photoData = canvasRef.value.toDataURL('image/png');
        capturedPhotos.value.push(photoData);
        isCountingDown.value = false;

        if (capturedPhotos.value.length === 3) {
            isFinished.value = true;
        }
    }
};

const resetPhotos = () => {
    capturedPhotos.value = [];
    isFinished.value = false;
};

onMounted(() => {
    startCamera();
});

onUnmounted(() => {
    stopCamera();
});
</script>