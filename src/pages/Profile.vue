<template>
  <div v-if="isLoading" class="absolute inset-0 z-10 flex items-center justify-center">
    <Loading />
  </div>
  <div v-else class="flex mt-[100px] flex-col md:flex-row">
    <div class="max-w-[800px] mx-auto p-8 h-full flex flex-col items-center rounded-lg">
      <div class="flex flex-col items-center mb-6 text-center">
        <div class="flex items-center justify-center w-32 h-32 mb-4 text-2xl font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-slate-600 to-slate-900">
          {{ userName[0].toUpperCase() }}
        </div>
        <p class="text-lg font-semibold text-slate-500">Привет, <span class="text-slate-800">{{ userName }}</span>!</p>
        <p class="text-lg font-semibold text-slate-500">Почта: <span class="text-slate-800">{{ userEmail }}</span></p>
      </div>

        <button 
          @click="logout"
          class="w-full py-3 font-bold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-500">
          Выход
        </button>
    </div>

    <div class="flex justify-center w-full">
      <div class="text-center">
        <h2 class="mb-8 text-4xl font-bold">Закладки</h2>
        <div v-if="favorites.length === 0" class="text-xl font-medium text-center text-gray-800">
          Таких кроссовок нет
        </div>
        <div v-else class="grid w-full grid-cols-1 gap-5 p-10 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
          <div v-for="sneaker in favorites" :key="sneaker.id">
            <CardFavorite
              :title="sneaker.title"
              :imageUrl="sneaker.image"
              :price="sneaker.price"
              :isInCart="sneaker.isInCart"
              @remove-favorite="removeFromCart(sneaker)"
              @add-to-cart="addToCart(sneaker)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toast :message="errorMessage" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../services/axiosInstance';
import CardFavorite from '@/components/CardFavorite.vue';
import Loading from '@/components/Loading.vue';
import Toast from '@/components/Toast.vue';

const favorites = ref([]);
const isLoading = ref(true);
const userEmail = ref('');
const userName = ref('');
const router = useRouter();
const errorMessage = ref('');

const getUserCartItems = async () => {
  try {
    const response = await axiosInstance.get('/cart/items');
    if (response.status === 200) {
      return response.data.map(item => item.id_sneaker); 
    } else {
      throw new Error('Ошибка получения корзины');
    }
  } catch (error) {
    return [];
  }
};

const addToCart = async (sneaker) => {
  try {
    await axiosInstance.post(`/cart/add/${sneaker.id_sneaker}`);
    sneaker.isInCart = true;
    console.log(`Кроссовок ${sneaker.title} добавлен в корзину`);
  } catch (e) {
    errorMessage.value = 'Ошибка при добавлении в корзину. Попробуйте снова.';
  }
};

const loadFavoriteStatus = async () => {
  try {
    const response = await axiosInstance.get('/favorites');
    const favoritesData = response.data;

    const cartIds = await getUserCartItems();
    
    favorites.value = favoritesData.map(sneaker => ({
      ...sneaker,
      isInCart: cartIds.includes(sneaker.id_sneaker),
    }));

  } catch (e) {
    errorMessage.value = 'Ошибка при загрузке избранного. Попробуйте позже.';
  } finally {
    isLoading.value = false;
  }
};

const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get('/user');
    const { email, username } = response.data;
    userEmail.value = email;
    userName.value = username;
  } catch (error) {
    router.push('/login');
  }
};

const removeFromCart = async (sneaker) => {
  console.log(sneaker);
  try {
    await axiosInstance.delete(`favorite/remove/${sneaker.id}`);
    loadFavoriteStatus();
  } catch (e) {
    errorMessage.value = 'Ошибка при удалении из избранного. Попробуйте снова.';
  }
};

const logout = async () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  router.push('/login');
};

onMounted(() => {
  getUserProfile();
  loadFavoriteStatus();
});
</script>
