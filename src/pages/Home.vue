<template>
  <div>
    <div class="mt-[100px] bg-gray-300">
  <div class="relative w-[90%] mx-auto mt-10 mb-8 shadow-2xl rounded-3xl overflow-hidden">
    <img src="/main_banner.jpg" class="w-full h-[700px] object-cover" />
    <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
      <h2 class="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-lg">
        Ощути комфорт на каждом шаге!
      </h2>
      <p class="mt-4 text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        Более 1000 оригинальных кроссовок
      </p>
      <p class="mt-2 text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        Доставка в любую точку России
      </p>
    </div>
  </div>
</div>


    <div class="bg-slate-100 w-[90%] min-h-[400px] mx-auto mt-[90px] shadow-2xl rounded-3xl relative">
      <div class="p-8 mb-[100px]">
        <div class="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 class="w-full text-4xl font-bold text-center sm:text-left">
            Каталог товаров
          </h2>

          <div class="relative w-full sm:w-auto">
            <img
              @click="getListSneakers"
              class="absolute w-5 h-5 cursor-pointer left-3 top-3"
              src="/search.svg"
            />
            <input
              v-model="nameSneaker"
              class="w-full sm:w-[250px] pl-9 pr-2 py-2 border rounded-lg outline-none border-slate-300 focus:border-slate-400"
              type="text"
              placeholder="Поиск кроссовок"
            />
          </div>
        </div>

        <div v-if="isLoading" class="absolute inset-0 z-10 flex items-center justify-center">
          <Loading></Loading>
        </div>
        <div v-else>
          <div v-if="sneakers.length === 0" class="text-xl font-medium text-center text-gray-800">
            Таких кроссовок нет
          </div>

          <div v-else class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            <div v-for="sneaker in sneakers" :key="sneaker.id">
              <Card
                :id="sneaker.id"
                :title="sneaker.title"
                :imageUrl="sneaker.imageUrl"
                :price="sneaker.price"
                :isFavorite="sneaker.isFavorite"
                :isInCart="sneaker.isInCart"
                @toggle-favorite="toggleFavorite(sneaker)"
                @add-to-cart="addToCart(sneaker)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toast :message="errorMessage" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import axiosInstance from '../services/axiosInstance';
import Card from '@/components/Card.vue';
import Loading from '@/components/Loading.vue';
import Toast from '@/components/Toast.vue';

const sneakers = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const nameSneaker = ref('');
const timeout = ref(null);

const debounce = (func, delay) => {
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  timeout.value = setTimeout(() => {
    func();
  }, delay);
};

const getUserCartItems = async () => {
  try {
    const response = await axiosInstance.get('/cart/items');
    if (response.status === 200) {
      return response.data.map(item => item.id_sneaker); 
    } else {
      throw new Error('Ошибка получения корзины');
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getListSneakers = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    
    let url = 'http://localhost:8000/api/sneakers'

    if (nameSneaker.value) {
      url += `?name=${encodeURIComponent(nameSneaker.value)}`;
    }

    const sneakerResponse = await axios.get(url);
    if (sneakerResponse.status !== 200) {
      throw new Error('Ошибка получения кроссовок');
    }

    const sneakersData = sneakerResponse.data;
    const cartIds = await getUserCartItems();

    sneakers.value = sneakersData.map(sneaker => ({
      ...sneaker,
      isInCart: cartIds.includes(sneaker.id),
    }));
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Пожалуйста, авторизуйтесь для доступа к каталогу';
    } else {
      errorMessage.value = 'Ошибка: ' + (error.response?.data?.error || error.message);
    }
  } finally {
    isLoading.value = false;
  }
};

const loadFavoriteStatus = async () => {
  try {
    const { data } = await axiosInstance.get('/favorites');
    console.log(data)
    sneakers.value.forEach(sneaker => {
      sneaker.isFavorite = false;
      sneaker.favoriteId = null;
      const found = data.find(item => item.id_sneaker === sneaker.id);
      if (found) {
        sneaker.isFavorite = true;
        sneaker.favoriteId = found.id;
      }
    });
  } catch (e) {
    console.error(e);
  }
};

const toggleFavorite = async (sneaker) => {
  try {
    const { isFavorite, favoriteId } = sneaker;

    if (isFavorite && favoriteId) {
      await axiosInstance.delete(`favorite/remove/${favoriteId}`);
      sneaker.isFavorite = false;
    } else if (!isFavorite) {
      await axiosInstance.post(`/favorite/add/${sneaker.id}`);
      sneaker.isFavorite = true;
      loadFavoriteStatus();
    }
  } catch (e) {
    console.error(e);
    if (e.response && e.response.status === 401) {
      errorMessage.value = 'Пожалуйста, авторизуйтесь для добавления в избранное';
    } else {
      errorMessage.value = 'Ошибка при запросе: ' + (e.response?.data?.error || e.message);
    }
  }
};

const addToCart = async (sneaker) => {
  try {
    await axiosInstance.post(`/cart/add/${sneaker.id}`);
    sneaker.isInCart = true;
    console.log(`Кроссовок ${sneaker.title} добавлен в корзину`);
  } catch (e) {
    console.error(e);
    if (e.response && e.response.status === 401) {
      errorMessage.value = 'Пожалуйста, авторизуйтесь для добавления в корзину';
    } else {
      errorMessage.value = 'Ошибка при добавлении в корзину: ' + (e.response?.data?.error || e.message);
    }
  }
};

watch(nameSneaker, (newValue) => {
  debounce(getListSneakers, 500);
});

onMounted(() => {
  getListSneakers();
  loadFavoriteStatus();
});
</script>