<template>
  <div class="flex min-h-screen flex-1 flex-col items-center px-6 py-12 lg:px-8 bg-gray-900">
    <div class="flex flex-col items-center justify-center gap-5 w-full sm:max-w-sm">
      <img class="h-20 w-auto" src="/icon.png" alt="InternGenie" />
      <h2 class="text-center text-2xl/9 font-bold tracking-tight text-white">Create your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-200">Full Name</label>
          <div class="mt-2">
            <input type="text" id="name" v-model="name" required
              class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-200">Email address</label>
          <div class="mt-2">
            <input type="email" id="email" v-model="email" required
              class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm/6 font-medium text-gray-200">Password</label>
          <div class="mt-2">
            <input type="password" id="password" v-model="password" required
              class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm/6 font-medium text-gray-200">Confirm Password</label>
          <div class="mt-2">
            <input type="password" id="confirmPassword" v-model="confirmPassword" required
              class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            :disabled="loading">
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        Already have an account?
        {{ ' ' }}
        <router-link to="/login" class="font-semibold text-indigo-400 hover:text-indigo-300">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match!'
      return
    }

    loading.value = true
    error.value = ''

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to register')
    }

    // Store auth data
    authStore.setAuth(data)

    // Redirect to profile setup
    const isMissingData =
      !data.user.skills?.length ||
      !data.user.interests?.length ||
      !data.user.resume?.url;

    if (isMissingData) router.push('/profile-setup')

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Check if user is authenticated
if (authStore.isAuthenticated) {
  // User is logged in
}

// Check if user is admin
if (authStore.isAdmin) {
  // User is an admin
}

// Get user data
const user = authStore.user

// Logout
authStore.clearAuth()
</script>

<style scoped></style>