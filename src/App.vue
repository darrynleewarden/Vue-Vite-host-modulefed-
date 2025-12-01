

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/kickback">Kickback App</RouterLink>
        <RouterLink to="/react-app">react App</RouterLink>
      </nav>
      wrapper is belows
      <!-- <XplorButtonWrapper
        label="absolute tester"
        variant="primary"
        @click="handleClick"
      />
      <KickbackFullApp />
      <RemoteA />
         <ReactHomePageWrapper /> -->
         
    </div>
  </header>

  <RouterView />
  <div>
    <h2>React Button in Vue</h2>
    <ReactHomePageWrapper />
     <ReactFullApp />

    <h2>Multiple React Buttons in Vue</h2>
    <ReactButtonWrapper 
      label="Click Me!" 
      variant="primary"
      @click="handleClick"
    />
    
    <ReactButtonWrapper 
      label="Secondary Button" 
      variant="secondary"
      @click="handleSecondaryClick"
    />
    
    <ReactButtonWrapper 
      label="Danger Button" 
      variant="danger"
      :disabled="isDisabled"
      @click="handleDangerClick"
    />
    
    <p v-if="clickCount > 0">Button clicked {{ clickCount }} times</p>
    app here
    <p>5005 here</p>
    <div id="kickback-app-container"></div>
    5001 app here
    <div id="react-app-container"></div>
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ReactHomePageWrapper from './components/ReactHomePageWrapper.vue'
// import ReactFullApp from './components/ReactFullApp.vue'
// import RemoteA from 'featureA/App'
const RemoteA = defineAsyncComponent(() => import('featureA/App'))

import ReactButtonWrapper from './components/ReactButtonWrapper.vue'
import KickbackFullApp from './components/KickbackFullApp.vue'

const clickCount = ref(0)
const isDisabled = ref(false)

const handleClick = () => {
  clickCount.value++
  console.log('Primary button clicked!')
}

const handleSecondaryClick = () => {
  console.log('Secondary button clicked!')
}

const handleDangerClick = () => {
  console.log('Danger button clicked!')
  isDisabled.value = true
  setTimeout(() => {
    isDisabled.value = false
  }, 2000)
}
import { onMounted } from 'vue'
import XplorButtonWrapper from './components/XplorButtonWrapper.vue'
import ReactFullApp from './components/ReactFullApp.vue'

onMounted(async () => {

  const mountReactApp = await import('featureA/FullApp')
  mountReactApp.default('react-app-container')
  const mountKickbackApp = await import('kickbackRemote/FullApplication')
  mountKickbackApp.default('kickback-app-container')

})
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
