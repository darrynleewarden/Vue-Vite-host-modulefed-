<template>
  <div>
    <div v-if="loading">Loading React component...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else ref="reactContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'

const reactContainer = ref<HTMLDivElement | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
let reactRoot: any = null

onMounted(async () => {
  try {
    // Dynamic import with vite-ignore comment
    const module = await import(/* @vite-ignore */ 'featureA/HomePage')
    const App = module.default

    loading.value = false
    
    // Wait for next tick
    await new Promise(resolve => setTimeout(resolve, 0))
    
    // Mount the React component
    if (reactContainer.value) {
      reactRoot = ReactDOM.createRoot(reactContainer.value)
      reactRoot.render(React.createElement(App))
    }
  } catch (err: any) {
    console.error('Failed to load React component:', err)
    error.value = err.message || 'Unknown error'
    loading.value = false
  }
})

onUnmounted(() => {
  // Cleanup React component
  if (reactRoot) {
    reactRoot.unmount()
  }
})
</script>