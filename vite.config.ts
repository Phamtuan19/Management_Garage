import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
   const env = loadEnv(mode, process.cwd(), '');

   return {
      plugins: [react()],
      server: {
         port: 3000,
      },
      resolve: {
         alias: {
            '@App': path.resolve(__dirname, './src/@App'),
            '@Core': path.resolve(__dirname, './src/@Core'),
         },
      },
   };
});
