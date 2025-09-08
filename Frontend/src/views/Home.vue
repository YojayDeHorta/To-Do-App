<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start font-sans">
    <header class="w-full bg-gray-700 text-white shadow-lg py-4 px-6 flex justify-between items-center">
      <h1 class="text-3xl font-extrabold">
        Lista de tareas
      </h1>
      <button @click="Logout" class="px-2 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer">
        <i class="fas fa-sign-out mr-1 mt-1.5"></i>
        Cerrar Sesión
      </button>
    </header>
    <div class="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl space-y-3 mt-8">
        <!-- Formulario de la tarea -->
      <div class="space-y-4" v-if="showTaskForm">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Título de la tarea</label>
          <input type="text" id="title" v-model="Task.title" required class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea id="description" v-model="Task.description" class="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
      </div>
      <button type="button" v-if="!showTaskForm" @click="addTask" :disabled="loading" class="flex justify-center px-2 py-1 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer">
        <i class="fas fa-plus mr-2 mt-1.5"></i>
        Agregar tarea
      </button>
      <div class="flex justify-end" v-else>
        <button type="button" @click="closeTask" :disabled="loading" class="mr-3 text-center flex justify-center px-2 py-1 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:cursor-pointer">
          <i class="fas fa-times mt-1.5"></i>
          Cancelar
        </button>
        <button type="button" @click="saveTask" :disabled="loading" class="flex justify-center px-2 py-1 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:cursor-pointer">
          <i class="fas fa-save mr-2 mt-1.5"></i>
          Guardar
        </button>
      </div>
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-800 border-b">
          Tareas
        </h2>
        <!-- Filtros -->
        <div class="flex gap-4 mb-4">
          <button class="px-2 py-1 border border-transparent rounded-md shadow-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:cursor-pointer" @click="loadTasks()">
            <i class="fas fa-list mr-1 mt-1.5"></i>
            Todas
          </button>
          <button class="px-2 py-1 border border-transparent rounded-md shadow-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:cursor-pointer" @click="loadTasks('completed')">
            <i class="fas fa-check mr-1 mt-1.5"></i>
            Completadas
          </button>
          <button class="px-2 py-1 border border-transparent rounded-md shadow-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 hover:cursor-pointer" @click="loadTasks('pending')">
            <i class="fas fa-spinner mr-1 mt-1.5"></i>
            En proceso
          </button>
        </div>
        <!-- Tareas -->
        <ul class="space-y-4">
          <li v-for="object in tasks" :key="object.id"
            class="bg-gray-50 p-4 rounded-lg shadow-sm flex items-start justify-between">
            <div class="flex items-start space-x-4 flex-grow">
              <input type="checkbox" :checked="object.status === 'completed'" @change="completeTask(object)" class="mt-1 h-5 w-5 border-gray-300 rounded">
              <div class="flex-grow">
                <h3 :class="['text-lg font-semibold text-gray-900', { 'line-through text-gray-500': object.status === 'completed' }]">
                  {{ object.title }}
                </h3>
                <p v-if="object.description" :class="['text-sm text-gray-600 mt-1', { 'line-through text-gray-400': object.status === 'completed' }]">
                  {{ object.description }}
                </p>
              </div>
            </div>
            <button @click="editTask(object)" :disabled="loading" class="text-sm mr-3 font-medium text-blue-600 hover:text-blue-800 hover:cursor-pointer">
              Editar
            </button>
            <button @click="deleteTask(object.id)" :disabled="loading" class="text-sm font-medium text-red-600 hover:text-red-800 hover:cursor-pointer">
              Eliminar
            </button>
          </li>
        </ul>
        <div v-if="tasks.length === 0" class="border-t pt-4">
          <p class="text-sm text-gray-600">No hay tareas disponibles</p>
        </div>
        <!-- Paginacion -->
        <div class="mt-6 flex justify-center items-center gap-3">
          <button @click="previousPage" :disabled="currentPage === 1" class="px-2 py-1 rounded-lg font-bold hover:cursor-pointer" :class="{'bg-blue-500 text-white hover:bg-blue-600': currentPage > 1,'bg-gray-300 text-gray-500 cursor-not-allowed': currentPage === 1}">
            <i class="fas fa-chevron-left"></i>
          </button>
          <span class="text-gray-700">Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-2 py-1 rounded-lg font-bold hover:cursor-pointer" :class="{'bg-blue-500 text-white hover:bg-blue-600': currentPage < totalPages,'bg-gray-300 text-gray-500 cursor-not-allowed': currentPage === totalPages}">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { usePopup } from '@/composables/usePopup';
// Variables reactivas
const loading = ref(false);
const showPopup = usePopup();
const showTaskForm = ref(false);
const API_URL = import.meta.env.VITE_API_URL;
// Variables de tareas
const tasks = ref([]);
const Task = ref({
  title: '',
  description: '',
  completed: false,
});
// Variables de paginación
const currentPage = ref(1);
const totalPages = ref(1);
let currentFilter = null;
// Funcion para cargar tareas
const loadTasks = async (filter) => {
  loading.value = true;
  currentFilter = filter || null;
  try {
    let url = `${API_URL}/tasks`;
    const params = new URLSearchParams({
      page: currentPage.value,
      limit: 3
    });
    if (currentFilter === 'completed' || currentFilter === 'pending') 
      params.set('status', currentFilter);
    url += `?${params.toString()}`;

    const response = await axios.get(url, {
      headers: {
        'auth-token': localStorage.getItem('Token')
      }
    });
    tasks.value = response.data.tasks;
    totalPages.value = response.data.totalPages;
    currentPage.value = response.data.currentPage;
  } catch (error) {
    showPopup('Error al cargar las tareas: ' + error.response?.data.message, '#f44336');
  } finally {
    loading.value = false;
  }
};
// Funcion para preparar el formulario de añadir tarea
const addTask = () => {
  Task.value = { title: '', description: '', completed: false };
  showTaskForm.value = true;
};
// Funcion para preparar el formulario de editar tarea
const editTask = async (task) => {
  Task.value = Object.assign({}, task);
  showTaskForm.value = true;
};
// Funcion para cerrar el formulario
const closeTask = () => {
  showTaskForm.value = false;
};
// Funcion para guardar la tarea (nueva o editada)
const saveTask = async () => {
  loading.value = true;
  if (!validateTask(Task.value)) {
    loading.value = false;
    return;
  }
  try {
    const headers = {
      'auth-token': localStorage.getItem('Token')
    };

    if (Task.value.id)
      await axios.put(`${API_URL}/tasks/${Task.value.id}`, Task.value, { headers });
    else
      await axios.post(`${API_URL}/tasks`, Task.value, { headers });
    showPopup('Operacion realizada correctamente', '#4CAF50');
    await loadTasks(currentFilter);
    Task.value = { title: '', description: '', completed: false };
    showTaskForm.value = false;
  } catch (error) {
    showPopup('Error al agregar la tarea: ' + error.response?.data.message, '#f44336');
  } finally {
    loading.value = false;
  }
};
// Funcion para completar o descompletar una tarea
const completeTask = async (task) => {
  loading.value = true;
  try {
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    await axios.put(`${API_URL}/tasks/${task.id}`, task, {
      headers: {
        'auth-token': localStorage.getItem('Token')
      }
    });
    showPopup('Operacion realizada correctamente', '#4CAF50');
    await loadTasks(currentFilter);
  } catch (error) {
    showPopup('Error al actualizar la tarea: ' + error.response?.data.message, '#f44336');
  } finally {
    loading.value = false;
  }
};
// Funcion para eliminar la tarea
const deleteTask = async (taskId) => {
  loading.value = true;
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        'auth-token': localStorage.getItem('Token')
      }
    });
    showPopup('¡Tarea eliminada con éxito!', '#4CAF50');
    await loadTasks(currentFilter);
  } catch (error) {
    showPopup('Error al eliminar la tarea: ' + error.response?.data.message, '#f44336');
  } finally {
    loading.value = false;
  }
};
// Función para validar los datos de la tarea
const validateTask = (task) => {
  if (!task.title || task.title.length < 3 || task.title.length > 100) {
    showPopup('El título debe tener de 3 a 100 caracteres.', '#f44336');
    return false;
  }
  if (!task.description || task.description.length < 5 || task.description.length > 1000) {
    showPopup('La descripción debe tener de 5 a 1000 caracteres.', '#f44336');
    return false;
  }
  return true;
};
// Función para cerrar sesión
const Logout = () => {
  localStorage.removeItem('Token');
  window.location.href = '/';
};
// Funciones para paginación
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadTasks(currentFilter);
  }
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadTasks(currentFilter);
  }
};
// cargando las tareas al montar el componente
onMounted(loadTasks);
</script>

<style scoped>
</style>
