<template>
    <div class="relative flex flex-col justify-between p-5 transition bg-white border shadow-lg cursor-pointer border-slate-200 rounded-3xl hover:-translate-y-2 hover:shadow-2xl">
      <img
        :src="'/like_active.svg'"
        alt="like"
        class="absolute w-8 h-8 transition-colors duration-300 border border-gray-200 rounded-xl top-4 left-4 hover:border-red-500"
        @click="removeFavorite"
      />
      <div class="flex justify-center items-center h-[160px]">
        <img
          :src="imageUrl"
          alt="sneaker"
          class="max-h-[160px]"
        />
      </div>
      <p class="mt-2 overflow-hidden font-medium text-left max-h-[60px] min-h-[40px] text-ellipsis  whitespace-nowrap">
        {{ title }}
      </p>
      <div class="flex justify-between pt-2 mt-auto">
        <div class="flex flex-col">
          <span class="text-left text-md text-slate-400">Цена:</span>
          <span class="text-lg font-semibold">{{ price }} руб.</span>
        </div>
        <button
        class="flex items-center justify-center w-8 h-8 mt-3 text-xl"
        :disabled="isInCart"
      >
      <img
      :src="isInCart ? '/cart_active.svg' : '/cart_no_active.svg'"
      alt="cart"
      @click="addToCartHandler">
      </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    title: String,
    imageUrl: String,
    price: Number,
    isInCart: Boolean,
  });
  
  const emit = defineEmits(['toggle-favorite', 'add-to-cart']);
  
  const removeFavorite = () => {
    emit('remove-favorite'); 
  };

  const addToCartHandler = () => {
  emit('add-to-cart');
};
  </script>
  