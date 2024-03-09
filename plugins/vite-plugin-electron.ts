import {
  type Plugin,
  build,
  mergeConfig,
  type InlineConfig,
  UserConfig,
  type ViteDevServer
} from 'vite';
import type { AddressInfo } from 'node:net';
import { spawn, type ChildProcess } from 'node:child_process';
import * as electronBuild from 'electron-builder';
console.log('');
console.log(
  '\x1b[36m%s\x1b[0m',
  '➜ -----------------------------------------------------------------------ElectronServerStart-----------------------------------------------------------------------'
);
console.log('');
interface entryoption {
  entry: string;
  output?: string;
  vite?: import('vite').InlineConfig;
}
interface options {
  entry?: entryoption[];
  output: string;
}
declare global {
  namespace NodeJS {
    interface Process {
      electronProcess: ChildProcess;
    }
  }
}

// 解析域名
function resolveHostname(hostname: string) {
  const loopbackHosts = new Set([
    'localhost',
    '127.0.0.1',
    '::1',
    '0000:0000:0000:0000:0000:0000:0000:0001'
  ]);
  const wildcardHosts = new Set(['0.0.0.0', '::', '0000:0000:0000:0000:0000:0000:0000:0000']);

  return loopbackHosts.has(hostname) || wildcardHosts.has(hostname) ? 'localhost' : hostname;
}
export function resolveViteConfig(options: options, data: entryoption): InlineConfig {
  console.log('data.entry', data.entry);
  const defaultConfig: InlineConfig = {
    configFile: false,
    publicDir: false,
    // @ts-ignore
    lib: {
      entry: data.entry,
      formats: ['cjs'],
      fileName: () => '[name].js'
    },
    build: {
      outDir: options.output || 'dist_electon_test',
      emptyOutDir: false
    },
    resolve: {
      mainFields: ['browser', 'module', 'jsnext:main', 'jsnext']
    }
  };
  return mergeConfig(defaultConfig, data?.vite || {});
}
function startPorcess() {
  // 如果已有进程取消监听并kill
  if (process.electronProcess) {
    process.electronProcess.removeAllListeners().kill();
  }
  // 启动electron进程
  process.electronProcess = spawn(require('electron'), ['.'], { stdio: 'inherit' });
  // 监听electron窗口关闭并进行服务关闭
  process.electronProcess.once('exit', process.exit);
}
// esbuild打包
function buildElectron(options: options, entryList: any) {
  try {
    console.log('builderr');
    require('esbuild').buildSync({
      entryPoints: entryList,
      bundle: true,
      outdir: options.output || 'dist_electon_test',
      // outfile: options.output || 'dist_electon_test',
      platform: 'node',
      target: 'node16',
      external: ['electron']
    });
  } catch (error) {
    console.log('builderr', error);
  }
}
// 获取Vite服务路径
const serverURL = (server: ViteDevServer) => {
  const addressInfo = server.httpServer?.address() as AddressInfo; //获取vite启动的端口号
  const { address, port } = addressInfo;
  const IP = `http://localhost:${addressInfo.port}`;
  const hostname = resolveHostname(address);
  const serverOptions = server.config.server;
  const protocol = serverOptions.https ? 'https' : 'http';
  const devBase = server.config.base;
  const path = typeof serverOptions.open === 'string' ? serverOptions.open : devBase;
  return path.startsWith('http') ? path : `${protocol}://${hostname}:${port}${path}`;
};
// 配置引用提示 ElectronPlugin-> tsconfig.node.json
export default function ElectronPlugin(options: options): Plugin[] {
  return [
    {
      // serve
      name: 'vite-plugin-electron', //插件名字
      apply: 'serve', //插件运行环境//server开发环境、build构建环境

      config(config, env) {
        //获取用户配置。用户插件在运行这个钩子之前会被解析，因此在 config 钩子中注入其他插件不会有任何效果。
        // console.log(config, env);
      },
      configureServer(server) {
        // require('esbuild').buildSync({
        //   entryPoints: config.entry,
        //   bundle: true,
        //   outdir: config.output,
        //   platform: 'node',
        //   external: ['electron']
        // });

        // 将ts转为js
        // build()
        // console.log('options', options);

        const entryList: String[] = [];
        options.entry?.forEach((item, i) => {
          entryList.push(item.entry);
          try {
            server.watcher.add(item.entry);
          } catch (error) {
            console.log('pusherr', error);
          }
        });
        buildElectron(options, entryList);
        server.httpServer?.once('listening', () => {
          // const addressInfo = server.httpServer?.address() as AddressInfo; //获取vite启动的端口号
          // const { address, port } = addressInfo;
          // const IP = `http://localhost:${addressInfo.port}`;
          // const hostname = resolveHostname(address);
          // const serverOptions = server.config.server;
          // const protocol = serverOptions.https ? 'https' : 'http';
          // const devBase = server.config.base;
          // const path = typeof serverOptions.open === 'string' ? serverOptions.open : devBase;
          // const url = path.startsWith('http') ? path : `${protocol}://${hostname}:${port}${path}`;
          // // console.log(url);
          Object.assign(process.env, {
            VITE_DEV_SERVER_URL: serverURL(server)
          });
          // spawn 启动node子进程
          startPorcess();
          // 监听Vite的更新事件
          server.watcher.on('change', (file) => {
            console.log('1!!!!!!!!!!!!!change', file, entryList);
            if (
              entryList.includes(file.replace(/\\/g, '/')) ||
              entryList.includes('./' + file.replace(/\\/g, '/'))
            ) {
              console.log(`File ${file} has changed, updating...`);
              // 在这里执行更新逻辑
              buildElectron(options, entryList);
              // //   // 在更新时关闭并重新启动副进程
              startPorcess();
            }
            // if()
          });
          // spawn(require('electron'), ['.'], { stdio: 'inherit' });
        });
      }
    },
    {
      // build
      name: 'vite-plugin-electron',
      apply: 'build',
      async closeBundle() {
        console.log('123123');
        const entryList: String[] = [];
        options.entry?.forEach((item, i) => {
          entryList.push(item.entry);
        });
        await buildElectron(options, entryList);
        // electronBuild.build({

        // })
        // for (const options of optionsArray) {
        //   options.vite ??= {}
        //   options.vite.mode ??= mode
        //   await build(options)
        // }
      }
    }
  ];
}
