<template>
  <div class="h-[calc(100vh-64px)] bg-gray-900 text-gray-100 p-8">
    <h2 class="max-w-6xl mx-auto text-3xl font-bold text-white mb-6">Dashboard</h2>
    
    <div class="max-w-6xl mx-auto">
      <div class="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
        <h3 class="text-2xl font-semibold text-white mb-2">Welcome to your Dashboard</h3>
        <p class="text-gray-400">Here you can manage your internship applications and profile.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <h4 class="text-gray-400 font-medium mb-2">Applications</h4>
          <p class="text-3xl font-bold text-emerald-400">0</p>
        </div>
        
        <div class="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <h4 class="text-gray-400 font-medium mb-2">Interviews</h4>
          <p class="text-3xl font-bold text-emerald-400">0</p>
        </div>
        
        <div class="bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <h4 class="text-gray-400 font-medium mb-2">Offers</h4>
          <p class="text-3xl font-bold text-emerald-400">0</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Dashboard logic here
</script>

<style scoped>
</style> 