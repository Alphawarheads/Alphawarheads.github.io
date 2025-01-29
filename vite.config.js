import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
})