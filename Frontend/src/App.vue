<script setup>
import { ref, provide } from 'vue';
import Popup from './components/Popup.vue';

const popupRef = ref(null);

function showPopup(message, color = '#f44336') {
  popupRef.value?.showPopup(message, color);
}

provide('showPopup', showPopup);
</script>

<template>
  <div>
    <router-view />
    <Popup ref="popupRef" />
  </div>
</template>

<style>
/* Estilos globales para tu aplicación */
</style>