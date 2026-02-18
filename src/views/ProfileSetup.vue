<template>
  <div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-white">Complete Your Profile</h2>
        <p class="mt-2 text-gray-400">Help us find the perfect internship match for you</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Skills Section -->
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-white mb-4">Skills</h3>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <div v-for="(skill, index) in skills" :key="index"
                class="bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
                {{ skill }}
                <button type="button" @click="removeSkill(index)"
                  class="text-white hover:text-gray-200 rounded-full w-12 h-12 flex justify-center items-center">
                  ×
                </button>
              </div>
            </div>
            <div class="flex gap-2">
              <input v-model="newSkill" type="text" placeholder="Add a skill"
                class="flex-1 rounded-md bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                @keydown.enter.prevent="addSkill" />
              <button type="button" @click="addSkill" class="btn1 w-fit px-6">
                Add
              </button>
            </div>
          </div>
        </div>

        <!-- Interests Section -->
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-white mb-4">Interests</h3>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <div v-for="(interest, index) in interests" :key="index"
                class="bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
                {{ interest }}
                <button type="button" @click="removeInterest(index)"
                  class="text-white hover:text-gray-200 rounded-full w-12 h-12 flex justify-center items-center">
                  ×
                </button>
              </div>
            </div>
            <div class="flex gap-2">
              <input v-model="newInterest" type="text" placeholder="Add an interest"
                class="flex-1 rounded-md bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                @keydown.enter.prevent="addInterest" />
              <button type="button" @click="addInterest" class="btn1 w-fit px-6">
                Add
              </button>
            </div>
          </div>
        </div>

        <!-- Resume Upload Section -->
        <div class="bg-gray-800 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-white mb-4">Resume</h3>
          <div class="space-y-4">
            <div v-if="currentResume" class="mb-4">
              <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span class="text-white">{{ authStore.profile.resume.filename }}</span>
                </div>
                <div class="flex gap-2">
                  <router-link :to="currentResume.url" class="flex items-center justify-center text-indigo-400 hover:text-indigo-300">
                    View
                  </router-link>
                  <button type="button" @click="removeResume" class="text-white hover:text-gray-200 rounded-full w-12 h-12 flex justify-center items-center">
                    X
                  </button>
                </div>
              </div>
            </div>
            <div v-if="!currentResume" class="flex items-center justify-center w-full">
              <label
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
                :class="{ 'border-indigo-500': isDragging }" @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false" @drop.prevent="handleFileDrop">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-gray-400">PDF (MAX. 10MB)</p>
                </div>
                <input type="file" class="hidden" accept=".pdf" @change="handleFileSelect" />
              </label>
            </div>
            <div v-if="resumeFile" class="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span class="text-white">{{ resumeFile.name }}</span>
              </div>
              <button type="button" @click="removeResume" class="text-white hover:text-gray-200 rounded-full w-12 h-12 flex justify-center items-center">
                X
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button type="submit" :disabled="loading"
            class="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
            {{ loading ? 'Saving...' : 'Save Profile' }}
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-500 text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Skills
const skills = ref([])
const newSkill = ref('')
const addSkill = () => {
  if (newSkill.value.trim()) {
    skills.value.push(newSkill.value.trim())
    newSkill.value = ''
  }
}
const removeSkill = (index) => {
  skills.value.splice(index, 1)
}

// Interests
const interests = ref([])
const newInterest = ref('')
const addInterest = () => {
  if (newInterest.value.trim()) {
    interests.value.push(newInterest.value.trim())
    newInterest.value = ''
  }
}
const removeInterest = (index) => {
  interests.value.splice(index, 1)
}

// Resume
const resumeFile = ref(null)
const isDragging = ref(false)
const currentResume = ref(null)

onMounted(async () => {
  try {
    const profile = await authStore.fetchProfile()
    if (profile.resume) {
      currentResume.value = profile.resume
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
})

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
    resumeFile.value = file
  } else {
    error.value = 'Please upload a PDF file under 10MB'
  }
}

const handleFileDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
    resumeFile.value = file
  } else {
    error.value = 'Please upload a PDF file under 10MB'
  }
}

const removeResume = () => {
  resumeFile.value = null
  currentResume.value = null
}

// Form submission
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''

    if (!resumeFile.value && !currentResume.value) {
      throw new Error('Please upload your resume')
    }

    // Upload resume if a new file is selected
    if (resumeFile.value) {
      await authStore.uploadResume(resumeFile.value)
    }

    // Update profile with skills and interests
    await authStore.updateProfile({
      skills: skills.value,
      interests: interests.value
    })

    // Redirect to dashboard
    router.push('/profile')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>