<template>
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto mt-10">
        <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Crear una Cuenta</h2>
        <form @submit.prevent="handleRegister" class="space-y-6">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <div class="mt-1">
                    <input type="text" id="name" v-model="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
            </div>
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <div class="mt-1">
                    <input type="email" id="email" v-model="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <div class="mt-1">
                    <input type="password" id="password" v-model="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
            </div>
            <button type="submit" :disabled="loading" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Registrarse
            </button>
        </form>
        <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
                ¿Ya tienes una cuenta?
                <router-link to="/" class="font-medium text-blue-600 hover:text-blue-500">Inicia sesión</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { usePopup } from '../composables/usePopup';
// hooks y variables reactivas
const router = useRouter();
const showPopup = usePopup();
const loading = ref(false);
const API_URL = import.meta.env.VITE_API_URL;
// datos para el registro
const name = ref('');
const email = ref('');
const password = ref('');
// función para registrar un nuevo usuario
const handleRegister = async () => {
    loading.value = true;
    if (!validateRegister()) {
        loading.value = false;
        return;
    }
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            name: name.value,
            email: email.value,
            password: password.value
        });
        showPopup('¡Registro exitoso! redirigiendo...', '#4CAF50');
        setTimeout(() => {
            router.push('/');
        }, 1500);
    } catch (error) {
        showPopup(error.response?.data.message || 'Error al conectar con el servidor.', '#f44336');
    } finally {
        loading.value = false;
    }
};
// función para validar los datos del formulario
const validateRegister = () => {
    if (!name.value || name.value.length < 3) {
        showPopup('El nombre debe tener al menos 3 caracteres.', '#f44336');
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value) || email.value.length < 8) {
        showPopup('Por favor, ingresa un correo electrónico válido.', '#f44336');
        return false;
    }
    if (!password.value || password.value.length < 8) {
        showPopup('La contraseña debe tener al menos 8 caracteres.', '#f44336');
        return false;
    }
    return true;
};
</script>

<style scoped>
</style>