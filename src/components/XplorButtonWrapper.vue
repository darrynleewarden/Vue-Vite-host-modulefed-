<template>
  <div ref="buttonContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})

const emit = defineEmits<{
  click: []
}>()

const buttonContainer = ref<HTMLDivElement | null>(null)
let reactRoot: any = null

// React Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React component error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', {
        style: { color: 'red', padding: '8px' }
      }, 'Button failed to load')
    }
    return this.props.children
  }
}

const renderButton = async () => {
  try {
    const module = await import(/* @vite-ignore */ 'kickbackRemote/Btn')
    const Btn = module.default

    if (buttonContainer.value && !reactRoot) {
      reactRoot = ReactDOM.createRoot(buttonContainer.value)
    }

    if (reactRoot) {
      reactRoot.render(
        React.createElement(ErrorBoundary, null,
          React.createElement(Btn, {
            variant: props.variant,
            disabled: props.disabled,
            onClick: () => emit('click'),
            children: props.label
          })
        )
      )
    }
  } catch (err) {
    console.error('Failed to load React Button:', err)
  }
}

onMounted(() => {
  renderButton()
})

// Re-render when props change
watch(() => [props.variant, props.disabled, props.label], () => {
  if (reactRoot) {
    renderButton()
  }
})

onUnmounted(() => {
  if (reactRoot) {
    reactRoot.unmount()
  }
})
</script>