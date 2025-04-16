<template>
  <div v-if="isLoading" class="absolute inset-0 z-10 flex items-center justify-center">
    <Loading></Loading>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen bg-zinc-300">
    <div class="w-full max-w-[415px] p-6 md:w-4/5 lg:w-1/2 md:p-8 bg-slate-100 rounded-3xl shadow-lg transition-all transform hover:scale-105">
      <h1 class="mb-6 text-center text-2xl md:text-[1.75rem] lg:text-3xl font-bold">Авторизация</h1>

      <div class="mb-4">
        <input
          v-model="userEmail"
          type="email"
          placeholder="Введите почту"
          class="w-full h-[45px] px-3 border outline-none focus:border-slate-400 rounded-md text-base"
        />
      </div>

      <div class="relative w-full mb-6">
        <input
          v-model="userPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Введите пароль"
          class="w-full h-[45px] pl-3 pr-10 border rounded-md outline-none focus:border-slate-400 text-base"
        />
        <div
          @click="showPassword = !showPassword"
          class="absolute -translate-y-1/2 cursor-pointer top-1/2 right-3 text-slate-500"
        >
          <img src="/visibility_off.svg" alt="Показать пароль" class="w-6 h-6" />
        </div>
      </div>

      <div>
        <button
          @click="loginUser"
          class="w-full h-[45px] rounded-md text-white font-bold bg-slate-800 hover:bg-slate-700 active:bg-slate-800 transition text-base md:text-lg lg:text-xl"
        >
          Войти
        </button>

        <div v-if="errorMessage" class="mt-3 text-sm text-center text-red-600 md:text-base">
          {{ errorMessage }}
        </div>

        <div
          @click="goToRegister"
          class="mt-4 text-lg font-medium text-center text-black cursor-pointer"
        >
          Нет аккаунта? Зарегистрироваться
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loading from '../components/Loading.vue';
import { validateEmail, validatePassword } from '@/utils/validation';

const userEmail = ref('');
const userPassword = ref('');
const isLoading = ref(false);
const showPassword = ref(false);
const errorMessage = ref('');
const router = useRouter();

const loginUser = async () => {
  if (userEmail.value && userPassword.value) {
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
      const response = await axios.post('http://localhost:8000/api/auth', {
        email: userEmail.value,
        password: userPassword.value,
      });

      if (response.status !== 200) {
        throw new Error('Ошибка авторизации');
      }

      const { token, refreshToken } = response.data;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/profile');
    } catch (error) {
      errorMessage.value = 'Ошибка регистрации: ' + (error.response?.data?.error || error.message);
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMessage.value = 'Пожалуйста, заполните все поля.';
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>
