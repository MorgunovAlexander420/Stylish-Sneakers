<template>
    <transition name="toast-slide">
      <div
        v-if="visible"
        class="fixed z-50 px-6 py-3 text-white transform -translate-x-1/2 bg-red-500 shadow-lg bottom-6 left-1/2 rounded-xl"
      >
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    message: String,
    duration: {
      type: Number,
      default: 3000
    }
  });
  
  const visible = ref(false);
  
  watch(
    () => props.message,
    (newVal) => {
      if (newVal) {
        visible.value = true;
        setTimeout(() => {
          visible.value = false;
        }, props.duration);
      }
    }
  );
  </script>
  
  <style scoped>
  .toast-slide-enter-active,
  .toast-slide-leave-active {
    transition: all 0.4s ease;
  }
  .toast-slide-enter-from,
  .toast-slide-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
  </style>
  