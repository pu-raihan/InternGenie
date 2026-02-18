<template>
  <div class="min-h-full bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Profile Header -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">{{ authStore.user?.name }}</h2>
            <p class="text-gray-400">{{ authStore.user?.email }}</p>
          </div>
          <button @click="router.push('/profile-setup')"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-semibold text-white mb-4">Skills</h3>
        <div v-if="authStore.profile?.skills?.length" class="flex flex-wrap gap-2">
          <div v-for="(skill, index) in authStore.profile.skills" :key="index"
            class="bg-indigo-600 text-white px-3 py-1 rounded-full">
            {{ skill }}
          </div>
        </div>
        <p v-else class="text-gray-400">No skills added yet</p>
      </div>

      <!-- Interests Section -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-semibold text-white mb-4">Interests</h3>
        <div v-if="authStore.profile?.interests?.length" class="flex flex-wrap gap-2">
          <div v-for="(interest, index) in authStore.profile.interests" :key="index"
            class="bg-indigo-600 text-white px-3 py-1 rounded-full">
            {{ interest }}
          </div>
        </div>
        <p v-else class="text-gray-400">No interests added yet</p>
      </div>

      <!-- Resume Section -->
      <div class="bg-gray-800 rounded-lg p-6">
        <h3 class="text-xl font-semibold text-white mb-4">Resume</h3>
        <div v-if="authStore.profile?.resume" class="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
          <div class="flex items-center gap-3 truncate">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span class="text-white truncate">{{ authStore.profile.resume.filename }}</span>
          </div>
          <div class="flex gap-2">
            <button @click="handleDownloadResume"
              class="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Download
            </button>
          </div>
        </div>
        <p v-else class="text-gray-400">No resume uploaded yet</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-gray-800 p-4 rounded-lg">
          <p class="text-white">Loading profile...</p>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(true)
const error = ref('')

const fetchProfile = async () => {
  try {
    loading.value = true
    error.value = ''
    await authStore.fetchProfile()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const handleDownloadResume = async () => {
  try {
    error.value = ''
    const blob = await authStore.downloadResume()
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = authStore.profile.resume.filename;
    a.click();
  } catch (err) {
    error.value = err.message
  }
}

onMounted(() => {
  fetchProfile()
})
</script>