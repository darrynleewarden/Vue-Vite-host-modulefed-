<template>
  <div ref="buttonContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, toRaw } from 'vue'
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

const renderButton = async () => {
  try {
    const module = await import(/* @vite-ignore */ 'featureA/Button')
    const Button = module.default
    
    if (buttonContainer.value && !reactRoot) {
      reactRoot = ReactDOM.createRoot(buttonContainer.value)
    }
    
    if (reactRoot) {
      debugger
      console.log('Rendering React Button with props:', reactRoot, Button, toRaw(props))
      reactRoot.render(
        React.createElement(Button, {
          variant: props.variant,
          disabled: props.disabled,
          onClick: () => emit('click')
        }, props.label) // Pass children as third argument, not as a prop
      )
    }
  } catch (err) {
    console.log('Error rendering React Button:', err)
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