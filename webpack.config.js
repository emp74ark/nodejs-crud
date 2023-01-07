import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: 'ts-loader',
        include: [resolve(__dirname, 'src')],
        exclude: [resolve(__dirname, 'node_modules')]
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
    alias: {
      src: resolve(__dirname, 'src'),
    },
    extensionAlias: {
      '.js': ['.ts', '.js']
    }
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
    module: true,
    libraryTarget: 'module',
    chunkLoading: 'import',
    chunkFormat: 'module',
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
};
