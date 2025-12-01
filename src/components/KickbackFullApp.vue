<template>
  <div><h2>COMEo n kickback please load</h2>
    <div v-if="loading" style="padding: 20px;">Loading Kickback application...</div>
    <div v-if="error" style="padding: 20px; color: red;">
      <h3>Failed to load application</h3>
      <pre>{{ error }}</pre>
    </div>
    <div ref="appContainer" style="width: 100%; height: 100vh;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'

const appContainer = ref<HTMLDivElement | null>(null)
const loading = ref(true)
const error = ref('')
let reactRoot: any = null

// React Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React FullApplication error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', {
        style: {
          padding: '20px',
          color: 'red',
          backgroundColor: '#fee',
          borderRadius: '4px',
          margin: '20px'
        }
      }, [
        React.createElement('h2', { key: 'title' }, 'Application failed to load'),
        React.createElement('pre', { key: 'error' }, this.state.error?.message)
      ])
    }
    return this.props.children
  }
}

const renderApp = async () => {
  try {
    loading.value = true
    console.log('Attempting to load kickbackRemote/FullApplication...')

    const module = await import(/* @vite-ignore */ 'kickbackRemote/FullApplication')
    console.log('Module loaded:', module)

    const FullApplication = module.default
    console.log('FullApplication component:', FullApplication)

    if (appContainer.value && !reactRoot) {
      reactRoot = ReactDOM.createRoot(appContainer.value)
    }

    if (reactRoot) {
      reactRoot.render(
        React.createElement(ErrorBoundary, null,
          React.createElement(FullApplication)
        )
      )
    }

    loading.value = false
  } catch (err) {
    console.error('Failed to load React FullApplication:', err)
    error.value = err instanceof Error ? err.message : String(err)
    loading.value = false
  }
}

onMounted(() => {
  // Add a small delay to ensure the remote is ready
  setTimeout(() => {
    renderApp()
  }, 100)
})

onUnmounted(() => {
  if (reactRoot) {
    reactRoot.unmount()
  }
})
</script>
