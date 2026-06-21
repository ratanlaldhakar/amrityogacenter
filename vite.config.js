import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = join(src, entry.name);
    let destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        certificates: resolve(__dirname, 'certificates.html'),
        certificate: resolve(__dirname, 'certificate.html'),
      },
    },
  },
  plugins: [
    {
      name: 'copy-assets',
      closeBundle() {
        copyDir(resolve(__dirname, 'js'), resolve(__dirname, 'dist/js'));
        copyDir(resolve(__dirname, 'images'), resolve(__dirname, 'dist/images'));
        console.log('Successfully copied js and images directories to dist! ✅');
      }
    }
  ]
});
