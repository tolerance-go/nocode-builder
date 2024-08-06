import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts', // 入口文件
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: false,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es',
      sourcemap: false,
    },
  ],
  plugins: [
    peerDepsExternal(), // 自动处理外部依赖
    resolve(),
    commonjs(),
    json(), // 添加 json 插件
    typescript({
      tsconfig: './tsconfig.json', // 使用 tsconfig.json 中的配置
    }),
  ],
};
