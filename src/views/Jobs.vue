<template>
  <div class="bg-gray-900">
    <div class="jobs-container">
      <div class="flex w-full items-start">
        <div class="filters-section">
          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Search jobs..." @input="handleSearch" />
          </div>
          <div class="filter-options">
            <select v-model="selectedCategory" @change="handleFilter">
              <option value="">All Categories</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full Time</option>
              <option value="Part-time">Part Time</option>
              <option value="Freelance">Freelance</option>
            </select>
            <select v-model="selectedMode" @change="handleFilter">
              <option value="">All Modes</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <select v-model="selectedField" @change="handleFilter">
              <option value="">Filter by field</option>
              <option value="location">Location</option>
              <option value="company">Company</option>
            </select>
            <input type="text" class="w-full px-3 border border-gray-600 rounded text-base" v-model="fieldQuery"
              :disabled="!selectedField" :placeholder="`Search ${selectedField}...`" @input="handleFieldSearch" />
          </div>
        </div>
        <div class="group flex flex-col w-36 px-4 items-center justify-center cursor-pointer" @click="matchJobs">
          <img class="w-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
            src="/icon.png" alt="InternGenie" />
          <span class="logo-font">
            Genie Jobs
          </span>
        </div>
      </div>

      <div v-if="showMatches" class="jobs-grid bg-gray-950 rounded-md p-6 mb-6">
        <div class="flex justify-between">
          <h3>Matched Jobs by <span class="logo-font">InternGenie AI</span></h3>
          <button @click="showMatches = false">Hide</button>
        </div>
        <div v-if="matchloading" class="loading">
          Analysing profile...
        </div>
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        <div v-else-if="matchedJobs?.length === 0" class="no-jobs">
          No jobs found matching your profile
        </div>
        <div v-else class="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          <div v-for="job in matchedJobs" :key="job.id" class="job-card">
            <h3>{{ job.title }}</h3>
            <div class="company-info">
              <span class="company-name">{{ job.company }}</span>
              <span class="job-type">{{ job.jobType }}</span>
            </div>
            <div class="job-details">
              <span class="location" v-if="job.location">{{ job.location }}</span>
              <span class="mode">{{ job.mode }}</span>
            </div>
            <p class="description">{{ job.description }}</p>
            <div class="job-footer">
              <span class="posted-date">Posted: {{ formatDate(job.createdAt) }}</span>
              <button @click="applyForJob(job.id)" class="apply-btn">Apply Now</button>
            </div>
          </div>
        </div>
      </div>

      <div class="jobs-grid">
        <div v-if="loading" class="loading">
          Loading jobs...
        </div>
        <div v-else-if="error" class="error">
          {{ error }}
        </div>
        <div v-else-if="jobs?.length === 0" class="no-jobs">
          No jobs found matching your criteria
        </div>
        <div v-else class="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          <div v-for="job in jobs" :key="job.id" class="job-card">
            <h3>{{ job.title }}</h3>
            <div class="company-info">
              <span class="company-name">{{ job.company }}</span>
              <span class="job-type">{{ job.jobType }}</span>
            </div>
            <div class="job-details">
              <span class="location" v-if="job.location">{{ job.location }}</span>
              <span class="mode">{{ job.mode }}</span>
            </div>
            <p class="description">{{ job.description }}</p>
            <div class="job-footer">
              <span class="posted-date">Posted: {{ formatDate(job.createdAt) }}</span>
              <button @click="applyForJob(job.id)" class="apply-btn">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const fulljobs = ref([])
const jobs = ref([])
const loading = ref(true)
const matchedJobs = ref([])
const matchloading = ref(true)
const showMatches = ref(false)
const error = ref(null)
const searchQuery = ref('')
const fieldQuery = ref('')
const selectedCategory = ref('')
const selectedMode = ref('')
const selectedField = ref('')

const fetchJobs = async () => {
  try {
    loading.value = true
    const res = await authStore.fetchJobs()
    fulljobs.value = res.data
    jobs.value = res.data
  } catch (err) {
    error.value = 'Failed to fetch jobs. Please try again later.'
    console.error('Error fetching jobs:', err)
  } finally {
    loading.value = false
  }
}

const matchJobs = async () => {
  try {
    showMatches.value = true
    matchloading.value = true
    const res = await authStore.matchJobs()
    matchedJobs.value = res.matches
  } catch (err) {
    error.value = 'Failed to fetch jobs. Please try again later.'
    console.error('Error fetching jobs:', err)
  } finally {
    matchloading.value = false
  }
}

const handleSearch = () => {
  // Implement search logic
  const filteredJobs = fulljobs.value.filter(job =>
    job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  jobs.value = filteredJobs
}
const handleFieldSearch = () => {
  // Implement search logic
  const filteredJobs = fulljobs.value.filter(job =>
    job[selectedField.value].toLowerCase().includes(fieldQuery.value.toLowerCase())
  )
  jobs.value = filteredJobs
}

const handleFilter = () => {
  // Implement filter logic
  const filteredJobs = fulljobs.value.filter(job => {
    const categoryMatch = !selectedCategory.value || job.jobType === selectedCategory.value
    const modeMatch = !selectedMode.value || job.mode === selectedMode.value
    return categoryMatch && modeMatch
  })
  jobs.value = filteredJobs
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const applyForJob = async (jobId) => {
  try {
    await fetch(`/api/jobs/${jobId}/apply`)
    // Handle successful application
  } catch (err) {
    // Handle application error
    console.error('Error applying for job:', err)
  }
}

onMounted(() => {
  fetchJobs()
})
</script>

<style scoped>
.jobs-container {
  @apply max-w-7xl mx-auto p-8;
}

.filters-section {
  @apply mb-8 w-full;
}

.search-bar {
  @apply mb-4;
}

.search-bar input {
  @apply w-full p-3 border border-gray-600 rounded text-base;
}

.filter-options {
  @apply flex gap-4 max-md:hidden;
}

.filter-options select {
  @apply p-2 border border-gray-600 rounded text-sm;
}

.jobs-grid {
  @apply grid gap-8;
}

.job-card {
  @apply bg-gray-800 rounded-lg p-6 shadow-sm transition-transform duration-200;
}

.job-card:hover {
  @apply -translate-y-0.5;
}

.job-card h3 {
  @apply m-0 mb-4 text-gray-800;
}

.company-info {
  @apply flex justify-between mb-4;
}

.company-name {
  @apply font-semibold text-emerald-100 text-lg;
}

.job-type {
  @apply border-green-600 border px-2 py-1 rounded-full text-xs text-emerald-600;
}

.job-details {
  @apply flex gap-4 mb-4 text-sm text-gray-600;
}

.location {
  @apply flex gap-4 mb-4 text-sm text-gray-400;
}

.description {
  @apply mb-4 text-gray-600 text-sm leading-relaxed;
}

.job-footer {
  @apply flex justify-between items-center mt-4;
}

.posted-date {
  @apply text-xs text-gray-400;
}

.apply-btn {
  @apply bg-emerald-500 text-white border-none px-4 py-2 rounded cursor-pointer transition-colors duration-200;
}

.apply-btn:hover {
  @apply bg-emerald-600;
}

.loading,
.no-jobs {
  @apply text-center py-8 text-gray-600;
}

.error {
  @apply text-center py-8 text-red-500;
}
</style>