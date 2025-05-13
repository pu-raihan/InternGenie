<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAuthenticated = computed(() => !!localStorage.getItem('user'))
const isAuthPage = computed(() => ['Login', 'Register'].includes(route.name))

const logout = () => {
  localStorage.removeItem('user')
  window.location.href = '/login'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav v-if="!isAuthPage" class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <span class="text-xl font-bold text-primary-600">InternGenie</span>
            </router-link>
          </div>
          <div class="flex items-center">
            <router-link v-if="!isAuthenticated" to="/login" class="btn-primary">
              Login
            </router-link>
            <button v-else @click="logout" class="btn-primary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
