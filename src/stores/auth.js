import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)
  const profile = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function setAuth(authData) {
    user.value = authData.user
    token.value = authData.token
    localStorage.setItem('user', JSON.stringify(authData.user))
    localStorage.setItem('token', authData.token)
  }

  function clearAuth() {
    user.value = null
    token.value = null
    profile.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  async function fetchProfile() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/profile`, {
        headers: {
          'Authorization': `${token.value}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      profile.value = data.user
      return data.user
    } catch (error) {
      console.error('Error fetching profile:', error)
      throw error
    }
  }

  async function updateProfile(profileData) {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token.value}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const data = await response.json()
      profile.value = data.user
      return data.user
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  async function uploadResume(file) {
    try {

      const utApiKey = import.meta.env.VITE_UPLOADTHING_SECRET;
      const initUploadRes = await fetch("https://api.uploadthing.com/v6/uploadFiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-uploadthing-api-key": utApiKey,
        },
        body: JSON.stringify({
          files: [{
            name: file.name,
            size: file.size,
            type: file.type,
          }],
          metadata: {
            uploadedAt: new Date().toISOString()
          },
        })
      });
      const initUploadData = await initUploadRes.json();
      const { url, fields } = initUploadData.data[0];

      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append('file', file);

      const uploadRes = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (uploadRes.ok) {
        const resumeUrl = `https://utfs.io/f/${fields['key']}`;
        // Step 3 (optional): Send this URL to your backend to save in MongoDB
        await fetch(`${import.meta.env.VITE_SERVER_URL}/api/profile/resume`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token.value,
          },
          body: JSON.stringify({
            file: {
              name: file.name,
              size: file.size,
              type: file.type,
            },
            resumeUrl: resumeUrl,
          }),
        });

      } else {
        alert("Upload failed");
      }

    } catch (error) {
      console.error('Error uploading resume:', error)
      throw error
    }
  }

  async function downloadResume() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/profile/resume/${user.value.email}`, {
        headers: {
          Authorization: token.value
        }
      })

      if (response.ok) {
        const blob = await response.blob();
        return blob
      }
    } catch (error) {
      console.error('Error downloading resume:', error)
      throw error
    }
  }

  async function fetchJobs(filters = {}) {
    try {
      // Convert filters to URL params
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs?${params}`, {
        headers: { 'Authorization': `${token.value}` }
      });

      if (!response.ok) throw new Error('Failed to fetch jobs');

      const data = await response.json()
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  async function matchJobs() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/jobs/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token.value}`
        }
      })
      if (!response.ok) {
        throw new Error('Failed to match jobs')
      }
      const data = await response.json()
      return data
    } catch (err) {
      console.error('Error matching jobs:', err)
      throw err;
    }
  }

  return {
    user,
    token,
    profile,
    isAuthenticated,
    isAdmin,
    setAuth,
    clearAuth,
    fetchProfile,
    updateProfile,
    uploadResume,
    downloadResume,
    fetchJobs,
    matchJobs
  }
}) 