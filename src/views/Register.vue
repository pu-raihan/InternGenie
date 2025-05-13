<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=400" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-200">Full Name</label>
          <div class="mt-2">
            <input type="text" id="name" v-model="name" required class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-200">Email address</label>
          <div class="mt-2">
            <input type="email" id="email" v-model="email" required class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm/6 font-medium text-gray-200">Password</label>
          <div class="mt-2">
            <input type="password" id="password" v-model="password" required class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm/6 font-medium text-gray-200">Confirm Password</label>
          <div class="mt-2">
            <input type="password" id="confirmPassword" v-model="confirmPassword" required class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Register</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        Already have an account?
        {{ ' ' }}
        <a href="/login" class="font-semibold text-indigo-400 hover:text-indigo-300">Sign in</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  // TODO: Implement registration logic
  console.log('Registration attempt:', {
    name: name.value,
    email: email.value,
    password: password.value
  })
  // For now, just redirect to login
  router.push('/login')
}
</script>

<style scoped>
</style> 