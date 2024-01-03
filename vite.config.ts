import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { checker } from 'vite-plugin-checker';
import dynamicImport from 'vite-plugin-dynamic-import';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
   const env = loadEnv(mode, process.cwd(), '');

   return {
      plugins: [checker({ typescript: false }), react(), dynamicImport()],
      server: {
         port: 3001,
      },
      resolve: {
         alias: {
            '@App': path.resolve(__dirname, './src/@App'),
            '@Core': path.resolve(__dirname, './src/@Core'),
         },
      },
   };
});
