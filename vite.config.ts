
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig({
  plugins: [
    vue(),

    federation({
      name: 'vue-host',
      remotes: {
        featureA: 'https://mod-fed-darryn-remote.s3.ap-southeast-2.amazonaws.com/assets/remoteEntry.js',//http://127.0.0.1:5001/assets/remoteEntry.js
        kickbackRemote: 'http://127.0.0.1:6789/assets/remoteEntry.js',

      },
      //shared: ['vue'],
      shared: {
        'react': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false
        } as any,
        'react-dom': {
          singleton: true,
          strictVersion: false,
          requiredVersion: false
        } as any
      }
    })
  ],
  build: {
    modulePreload: false,
    target: 'es2020',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    // host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  optimizeDeps: {
    exclude: ['kickbackRemote', 'featureA']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'
// import { federation } from '@module-federation/vite';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     vueJsx(),
//     vueDevTools(),
//     federation({
//       name: 'vue_host',
//       remotes: {
//         reactRemote: 'http://localhost:5001/assets/remoteEntry.js', // URL of the remote's entry file
//       },
//       shared: ['vue'], // Define shared dependencies
//     }),
//   ],
//   build: {
//     modulePreload: false,
//     target: 'esnext',
//     minify: false,
//     cssCodeSplit: false
//   },
//   server: {
//     port: 5173,
//     strictPort: true
//   },
//   optimizeDeps: {
//     exclude: ['reactRemote']
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     },
//   },
// })
