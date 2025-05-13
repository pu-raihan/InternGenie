<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div class="dashboard-content">
      <div class="welcome-section">
        <h3>Welcome to your Dashboard</h3>
        <p>Here you can manage your internship applications and profile.</p>
      </div>
      <div class="stats-section">
        <div class="stat-card">
          <h4>Applications</h4>
          <p class="stat-number">0</p>
        </div>
        <div class="stat-card">
          <h4>Interviews</h4>
          <p class="stat-number">0</p>
        </div>
        <div class="stat-card">
          <h4>Offers</h4>
          <p class="stat-number">0</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Dashboard logic here
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #42b983;
  margin: 0.5rem 0;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

h4 {
  color: #666;
  margin: 0;
}
</style> 