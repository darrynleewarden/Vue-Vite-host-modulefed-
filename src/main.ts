import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import React to ensure it's loaded into the shared scope for remotes
// This must happen before any remote modules are loaded
import React from 'react'
import ReactDOM from 'react-dom/client'

// Expose React to window for debugging (optional)
if (typeof window !== 'undefined') {
  ;(window as any).__REACT__ = React
  ;(window as any).__REACT_DOM__ = ReactDOM
}

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
