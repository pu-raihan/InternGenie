<template>
  <div class="relative min-h-screen bg-gray-900 flex flex-col">
    <Navbar />
    <div :class="{ 'h-screen': isAuthPage, 'h-[calc(100dvh-64px)] mt-16': !isAuthPage }" class="overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>

import Navbar from './components/Navbar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isAuthPage = computed(() => ['Login', 'Register'].includes(route.name))

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');

.logo-font {
  font-family: "Reggae One", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>