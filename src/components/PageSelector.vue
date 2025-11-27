<template>
  <div class="page-selector">
    <h1>Vue Host Application</h1>
    
    <div class="navigation">
      <button 
        @click="currentPage = 'home'"
        :class="{ active: currentPage === 'home' }"
      >
        Home (Vue)
      </button>
      <button 
        @click="currentPage = 'react-full'"
        :class="{ active: currentPage === 'react-full' }"
      >
        React Full Page
      </button>
      <button 
        @click="currentPage = 'react-component'"
        :class="{ active: currentPage === 'react-component' }"
      >
        React Component
      </button>
      <button 
        @click="currentPage = 'mixed'"
        :class="{ active: currentPage === 'mixed' }"
      >
        Mixed Page
      </button>
    </div>

    <div class="content">
      <!-- Vue Home Page -->
      <div v-if="currentPage === 'home'" class="page">
        <h2>Welcome to Vue Host</h2>
        <p>This is a Vue component running in the host application.</p>
        <button @click="vueCount++">Vue Counter: {{ vueCount }}</button>
      </div>

      <!-- Full React Page -->
      <div v-else-if="currentPage === 'react-full'" class="page">
        <ReactFullPage />
      </div>

      <!-- React Component Only -->
      <div v-else-if="currentPage === 'react-component'" class="page">
        <h2>React Component Only</h2>
        <ReactButton />
      </div>

      <!-- Mixed Page -->
      <div v-else-if="currentPage === 'mixed'" class="page">
        <h2>Mixed Vue and React Components</h2>
        
        <div style="background: #42b883; padding: 20px; margin: 10px 0;">
          <h3>Vue Section</h3>
          <button @click="vueCount++">Vue Counter: {{ vueCount }}</button>
        </div>

        <ReactButton />
        
        <div style="background: #42b883; padding: 20px; margin: 10px 0;">
          <h3>Another Vue Section</h3>
          <p>Both frameworks working together!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ReactButton from './ReactButton.vue'
import ReactFullPage from './ReactFullPage.vue'

export default {
  name: 'PageSelector',
  components: {
    ReactButton,
    ReactFullPage
  },
  setup() {
    const currentPage = ref('home')
    const vueCount = ref(0)

    return {
      currentPage,
      vueCount
    }
  }
}
</script>

<style scoped>
.page-selector {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.navigation {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.navigation button {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.navigation button:hover {
  background-color: #358a66;
}

.navigation button.active {
  background-color: #2c5f4a;
  font-weight: bold;
}

.content {
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  min-height: 200px;
}

.page button {
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>