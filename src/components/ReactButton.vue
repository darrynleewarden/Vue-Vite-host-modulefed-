<template>
  <div class="react-button-wrapper">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div :id="containerId" class="react-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const loading = ref(true)
const error = ref(null)
let reactRoot = null

// Generate unique ID
const containerId = `react-button-${Math.random().toString(36).substr(2, 9)}`

onMounted(async () => {
  await new Promise(resolve => requestAnimationFrame(() => {
    requestAnimationFrame(resolve)
  }))
  console.log('=== PRE-CREATEROOT DEBUG ===')
console.log('container:', container)
console.log('container.constructor.name:', container.constructor.name)
console.log('typeof container:', typeof container)
console.log('container.nodeType:', container.nodeType)
console.log('container.nodeName:', container.nodeName)
console.log('Object.prototype.toString.call(container):', Object.prototype.toString.call(container))

  try {
    const container = document.getElementById(containerId)
    
    console.log('Button container:', container, 'ID:', containerId)
    
    if (!container || container.nodeType !== 1) {
      throw new Error('Container not found or invalid')
    }
    
    const [React, ReactDOM, remoteModule] = await Promise.all([
      import('react'),
      import('react-dom/client'),
      import('reactRemote/Button')
    ])
    
    const ReactButton = remoteModule.default
    
    if (reactRoot) {
      reactRoot.unmount()
      reactRoot = null
    }
    // Try to verify it's truly a DOM element
try {
  container.setAttribute('data-test', 'true')
  console.log('✓ Can call setAttribute')
} catch (e) {
  console.error('✗ Cannot call setAttribute:', e)
}
    reactRoot = ReactDOM.createRoot(container)
    reactRoot.render(React.createElement(ReactButton))
    
    loading.value = false
  } catch (err) {
    console.error('Failed to load React Button:', err)
    error.value = err.message
    loading.value = false
  }
})

onBeforeUnmount(() => {
  if (reactRoot) {
    reactRoot.unmount()
    reactRoot = null
  }
})
</script>

<style scoped>
.react-button-wrapper {
  width: 100%;
}

.react-container {
  min-height: 100px;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}

.error {
  padding: 20px;
  text-align: center;
  color: #ff4444;
  background: #ffe6e6;
  border-radius: 8px;
}
</style>