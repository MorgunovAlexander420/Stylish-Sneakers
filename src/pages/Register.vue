<template>
  <div v-if="isLoading" class="absolute inset-0 z-10 flex items-center justify-center">
    <Loading></Loading>
  </div>

  <div v-else class="flex items-center justify-center min-h-screen bg-zinc-300">
    <div class="w-full max-w-[415px] p-6 md:w-4/5 lg:w-1/2 md:p-8 bg-slate-100 rounded-3xl shadow-lg transition-all transform hover:scale-105">
    <h1 class="mb-6 text-center text-2xl md:text-[1.75rem] lg:text-3xl font-bold">Авторизация</h1>

      <div class="mb-4">
        <input
          v-model="userName"
          type="text"
          placeholder="Введите имя пользователя"
          class="w-full h-[45px] px-3 border rounded-md outline-none focus:border-slate-800"
        />
      </div>

      <div class="mb-4">
        <input
          v-model="userEmail"
          type="email"
          placeholder="Введите почту"
          class="w-full h-[45px] px-3 border rounded-md outline-none focus:border-slate-800"
        />
      </div>

      <div class="relative w-full mb-6">
        <input
          v-model="userPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Введите пароль"
          class="w-full h-[45px] px-3 pr-10 border outline-none rounded-md focus:border-slate-800"
        />
        <div
          @click="showPassword = !showPassword"
          class="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
        >
          <img src="/visibility_off.svg" alt="Показать пароль" class="w-6 h-6" />
        </div>
      </div>

      <div>
        <button
          @click="registerUser"
          class="w-full h-[45px] text-white font-bold transition rounded-md bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-base md:text-lg lg:text-xl"
        >
          Регистрация
        </button>

        <div v-if="errorMessage" class="mt-3 text-sm text-center text-red-600 md:text-base">
          {{ errorMessage }}
        </div>

        <div
          @click="goToLogin"
          class="mt-4 text-lg font-medium text-center text-black cursor-pointer hover:underline"
        >
          Уже есть аккаунт? Войти
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loading from '../components/Loading.vue';
import axios from 'axios';
import { validatePassword, validateEmail } from '@/utils/validation';

const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const router = useRouter();
const isLoading = ref(false);
const showPassword = ref(false);
const errorMessage = ref('');

const registerUser = async () => {
  if (userEmail.value && userPassword.value && userName.value) {
    if (!validateEmail(userEmail.value)) {
      errorMessage.value = 'Пожалуйста, введите корректный email.';
      return;
    }

    if (!validatePassword(userPassword.value)) {
      errorMessage.value = 'Пароль должен быть не менее 8 символов.';
      return;
    }

    try {
      isLoading.value = true;
      errorMessage.value = '';
      const response = await axios.post('http://localhost:8000/api/register', {
        email: userEmail.value,
        username: userName.value,
        password: userPassword.value,
      });

      if (response.status !== 200) {
        throw new Error('Ошибка регистрации');
      }

      router.push('/login');
    } catch (error) {
      errorMessage.value = 'Ошибка регистрации: ' + (error.response?.data?.error || error.message);
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMessage.value = 'Пожалуйста, заполните все поля.';
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>
