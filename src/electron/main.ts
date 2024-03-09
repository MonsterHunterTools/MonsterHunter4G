import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
// 注意。文件代码报错会导致不编译，以至于产生已编译到dist-electron的错觉实际上代码没变所以看不到改动效果
let win: BrowserWindow;
const indexHtmlUrl = './index.html';
const createWindow = () => {
  win = new BrowserWindow({
    // frame: false, //创建无边窗口
    width: 1200,
    height: 700,
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API

      // webSecurity: false
      preload: path.join(__dirname, 'preload.js') // 需要引用js文件
    }
  });
  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, indexHtmlUrl)); //本文件编译生成的.js文件相对于vite生成的dist文件的index.html路径（比如说：本文件main.ts打包后根据vite-plugin-electron设置的打包路径dist也就是说main.js与vite打包后的index.html在同级目录 所以 路径为  ./index.html）
    win.webContents.openDevTools(); //打开调试工具
  } else {
    console.log('!!!!!!!!!');
    let url: string = process.env.VITE_DEV_SERVER_URL as string; // 本地启动的vue项目路径
    // console.log(process.env);
    console.log('\x1b[92m%s\x1b[0m', 'ElectronUrl LoadURL->', url);
    // \x1b[92m和\x1b[31m是用来设置文字颜色的ANSI转义码，%s是一个占位符，后面的'ElectronUrl LoadURL->'会被替换成带颜色的文字。\x1b[0m是用来重置颜色，确保后续的输出不受之前的颜色影响。
    win.loadURL(url);
    win.webContents.openDevTools(); //打开调试工具
  }
};

app.whenReady().then(() => {
  createWindow(); // 创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  // 监听新窗口
  ipcMain.on('open-sub-window', (event, message) => {
    console.log(
      '\x1b[36m%s\x1b[0m',
      'OpenNewWindow-URL->',
      process.env.VITE_DEV_SERVER_URL + message
    );
    createSubWindow(message);
  });
});

// 关闭窗口
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
/**
 * 创建子窗口
 * @param url 路由路径
 */
function createSubWindow(url: string) {
  const subWindow = new BrowserWindow({
    width: 800,
    height: 600,
    parent: win, // win是主窗口，不加parent，新建的窗口将于主窗口平级
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true // 渲染进程使用Node API
      // preload: path.join(__dirname, './preload.js') // 需要引用js文件
    }
  });

  if (app.isPackaged) {
    // 打包就加载本地文件带路径
    // const LOAD_URL = `file://${path.join(__dirname, '../dist/index.html' + '#' + url)}`;
    subWindow.loadURL(path.join(__dirname, indexHtmlUrl + '#' + url)); // 加载子窗口的HTML文件
    subWindow.webContents.openDevTools(); //打开调试工具
    subWindow.webContents.on('did-finish-load', () => {
      subWindow.webContents.send('message', url);
    });
  } else {
    subWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL + '#' + url}`); // 加载子窗口的HTML文件
    subWindow.webContents.openDevTools(); //打开调试工具
    subWindow.webContents.on('did-finish-load', () => {
      subWindow.webContents.send('message', url);
    });
  }
}

module.exports = { createSubWindow };
