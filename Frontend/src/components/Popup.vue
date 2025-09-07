<template>
  <transition name="popup-fade" appear>
    <div v-if="isVisible" :class="['popup', { 'popup-visible': isVisible }]" :style="{ backgroundColor: popupColor }">
      <p class="mr-5">{{ message }}</p>
      <button type="button" @click="closePopup" class="absolute top-3 right-2  text-white text-xl focus:outline-none hover:cursor-pointer">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const isVisible = ref(false);
const message = ref('');
const popupColor = ref('#f44336');

function showPopup(msg, color = '#f44336') {
  message.value = msg;
  popupColor.value = color;
  isVisible.value = false; // para resetear la visibilidad del popup
  setTimeout(() => {
    isVisible.value = true;
    setTimeout(() => {
      isVisible.value = false;
    }, 3000);
  }, 10);
}

function closePopup() {
  isVisible.value = false;
}

defineExpose({ showPopup });
</script>

<style scoped>
.popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
}

.popup-visible {
  opacity: 1;
  visibility: visible;
}
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.95);
}
.popup-fade-enter-to,
.popup-fade-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}
</style>