<template>
  <div class="about">
    <h1>This is an about pages</h1>
     5001 app here
    <div id="react-app-container"></div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script >
import { onMounted } from 'vue'

onMounted(async () => {

  const mountReactApp = await import('featureA/FullApp')
  mountReactApp.default('react-app-container')
  const mountKickbackApp = await import('kickbackRemote/Btn')
  mountKickbackApp.default('kickback-app-container')

})
</script>