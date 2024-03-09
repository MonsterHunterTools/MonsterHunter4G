var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/electron/main.ts
var import_electron = require("electron");
var import_path = __toESM(require("path"));
var win;
var indexHtmlUrl = "./index.html";
var createWindow = () => {
  win = new import_electron.BrowserWindow({
    // frame: false, //创建无边窗口
    width: 1200,
    height: 700,
    webPreferences: {
      contextIsolation: false,
      // 是否开启隔离上下文
      nodeIntegration: true,
      // 渲染进程使用Node API
      // webSecurity: false
      preload: import_path.default.join(__dirname, "preload.js")
      // 需要引用js文件
    }
  });
  if (import_electron.app.isPackaged) {
    win.loadFile(import_path.default.join(__dirname, indexHtmlUrl));
    win.webContents.openDevTools();
  } else {
    console.log("!!!!!!!!!");
    let url = process.env.VITE_DEV_SERVER_URL;
    console.log("\x1B[92m%s\x1B[0m", "ElectronUrl LoadURL->", url);
    win.loadURL(url);
    win.webContents.openDevTools();
  }
};
import_electron.app.whenReady().then(() => {
  createWindow();
  import_electron.app.on("activate", () => {
    if (import_electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
  import_electron.ipcMain.on("open-sub-window", (event, message) => {
    console.log(
      "\x1B[36m%s\x1B[0m",
      "OpenNewWindow-URL->",
      process.env.VITE_DEV_SERVER_URL + message
    );
    createSubWindow(message);
  });
});
import_electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    import_electron.app.quit();
  }
});
function createSubWindow(url) {
  const subWindow = new import_electron.BrowserWindow({
    width: 800,
    height: 600,
    parent: win,
    // win是主窗口，不加parent，新建的窗口将于主窗口平级
    webPreferences: {
      contextIsolation: false,
      // 是否开启隔离上下文
      nodeIntegration: true
      // 渲染进程使用Node API
      // preload: path.join(__dirname, './preload.js') // 需要引用js文件
    }
  });
  if (import_electron.app.isPackaged) {
    subWindow.loadURL(import_path.default.join(__dirname, indexHtmlUrl + "#" + url));
    subWindow.webContents.openDevTools();
    subWindow.webContents.on("did-finish-load", () => {
      subWindow.webContents.send("message", url);
    });
  } else {
    subWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL + "#" + url}`);
    subWindow.webContents.openDevTools();
    subWindow.webContents.on("did-finish-load", () => {
      subWindow.webContents.send("message", url);
    });
  }
}
module.exports = { createSubWindow };
