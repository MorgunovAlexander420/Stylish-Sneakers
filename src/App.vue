<script setup>
import { ref } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import Footer from './components/Footer.vue'

const drawerOpen = ref(false)

const openDrawer = () => {
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
}
</script>

<template>
  <div class="flex flex-col w-full min-h-screen">
    <Drawer v-if="drawerOpen" :closeDrawer="closeDrawer" />
    <Header class="z-10" @open-drawer="openDrawer" />
    <div class="flex-grow">
      <router-view />
    </div>
    <Footer class="z-10 mt-auto" />
  </div>
</template>
