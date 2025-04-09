<script setup>
import { ref, onMounted } from 'vue'

const isRegistering = ref(false)
const isRegistered = ref(false)

const userName = ref('')
const userEmail = ref('')
const userPhone = ref('')

const registerUser = () => {
  if (userName.value && userEmail.value && userPhone.value) {
    isRegistered.value = true
    isRegistering.value = false

    localStorage.setItem('userName', userName.value)
    localStorage.setItem('userEmail', userEmail.value)
    localStorage.setItem('userPhone', userPhone.value)
  }
}

onMounted(() => {
  const savedName = localStorage.getItem('userName')
  const savedEmail = localStorage.getItem('userEmail')
  const savedPhone = localStorage.getItem('userPhone')

  if (savedName && savedEmail && savedPhone) {
    userName.value = savedName
    userEmail.value = savedEmail
    userPhone.value = savedPhone
    isRegistered.value = true
  }
})

const showRegistrationForm = () => {
  isRegistering.value = true
}

const resetForm = () => {
  userName.value = ''
  userEmail.value = ''
  userPhone.value = ''
  isRegistering.value = false
  isRegistered.value = false

  localStorage.removeItem('userName')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userPhone')
}
</script>

<template>
  <div class="bg-zinc-300 flex justify-center items-center h-[675px]">
    <div v-if="!isRegistered" class="bg-slate-100 w-[415px] h-[500px] rounded-3xl p-10">
      <h1 class="text-2xl font-bold">Регистрация</h1>
      <div class="mt-10">
        <div>
          <input
            v-model="userName"
            type="text"
            placeholder="Имя"
            class="w-full h-[45px] border border-xl outline-none focus:border-slate-400 mb-4 pl-3 rounded-md"
          />
        </div>
        <div>
          <input
            v-model="userEmail"
            type="email"
            placeholder="Почта"
            class="w-full h-[45px] border border-xl outline-none focus:border-slate-400 mb-4 pl-3 rounded-md"
          />
        </div>
        <div>
          <input
            v-model="userPhone"
            type="tel"
            placeholder="Номер телефона"
            class="w-full h-[45px] border border-xl outline-none focus:border-slate-400 mb-4 pl-3 rounded-md"
          />
        </div>
      </div>
      <div>
        <button
          @click="registerUser"
          class="w-full bg-sky-400 h-[45px] rounded-md text-white mt-10 font-bold hover:bg-sky-500 active:bg-sky-600 transition"
        >
          Регистрация
        </button>
        <div class="flex justify-center text-lg text-gray-500 mt-3 mb-3">или</div>
        <button
          class="w-full bg-slate-300 h-[45px] rounded-md text-white font-bold hover:bg-slate-400 active:bg-slate-500 transition"
        >
          Войти
        </button>
      </div>
    </div>

    <div v-else class="bg-slate-100 w-[415px] h-[500px] rounded-3xl p-10">
      <h1 class="text-3xl font-bold flex justify-center">Личный кабинет</h1>
      <hr class="border-t-2 border-slate-300 mt-4" />
      <div class="mt-16">
        <p class="mb-4 text-xl"><strong>Имя:</strong> {{ userName }}</p>
        <p class="mb-4 text-xl"><strong>Почта:</strong> {{ userEmail }}</p>
        <p class="mb-4 text-xl"><strong>Номер телефона:</strong> {{ userPhone }}</p>
        <router-link to="/favorites"
          ><p class="mt-10 text-xl"><strong>Мои Закладки</strong></p></router-link
        >
      </div>
      <button
        @click="resetForm"
        class="w-full bg-red-500 h-[45px] rounded-md text-white mt-20 font-bold"
      >
        Выйти
      </button>
    </div>
  </div>
</template>
<style scoped>
.bg-zinc-300 {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.bg-slate-100 {
  width: 90%;
  max-width: 415px;
  height: auto;
  padding: 20px;
  border-radius: 20px;
}

.text-2xl,
.text-3xl {
  font-size: 1.5rem;
  text-align: center;
}

.text-3xl {
  margin-top: 10px;
}

input {
  font-size: 1rem;
  padding: 0.5rem;
}

button {
  font-size: 1rem;
  padding: 0.5rem;
}

@media (min-width: 768px) {
  .bg-slate-100 {
    width: 70%;
    max-width: 415px;
    padding: 30px;
  }

  .text-2xl,
  .text-3xl {
    font-size: 1.75rem;
  }

  button {
    font-size: 1.1rem;
  }
}

@media (min-width: 1024px) {
  .bg-slate-100 {
    width: 50%;
  }

  .text-2xl,
  .text-3xl {
    font-size: 2rem;
  }

  button {
    font-size: 1.25rem;
  }
}
</style>
