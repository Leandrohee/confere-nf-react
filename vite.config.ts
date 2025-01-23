import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/confere-nf-react/',     //My repository name ->  https://github.com/Leandrohee/confere-nf-react
});