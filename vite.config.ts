import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { getAllPages, wrapperEnv } from './build/utils'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT: port } = viteEnv

  getAllPages()

  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '/styles/variables.scss';
          `
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port,
      fs: {
        strict: false
      },
    },
    build: {
      target: 'es2015',
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          home: resolve(__dirname, 'pages/home/index.html'),
        }
      }
    }
  }
})