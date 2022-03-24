/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, Tray, Menu } from 'electron';
// import fs from 'fs';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import Store from 'electron-store';
// import fs from 'fs/promises';
// const fs = require('fs');
const store = new Store();

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let tray = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    frame: false,
    webPreferences: {
      nodeIntegration: true,
//       preload: path.resolve(__dirname, './public/preload.js'),//preload.js 文件路径
//       contextIsolation: false,//官方文档默认为true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // mainWindow.on('resize', () => {
  //   let size = mainWindow?.getSize();
  //   if(!size)  return;
  //   let width = size[0];
  //   let height = size[1];

  // })

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  listenDownload();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

let win: any = {};
type createWindowOptions = {
  height: number;
  width: number;
  minHeight?: number;
  minWidth?: number;
  hash: string;
  transparent?: boolean;
  noParent?: boolean;
}

const createTray = () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  tray = new Tray(getAssetPath('icon.ico'));
  let trayMenuTemplate = [
    {
      label: "显示Entropy Music",
      click: function() {
        if(mainWindow)  winshow(mainWindow);
        // return mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      }
    },
    {
      label: "退出应用",
      click: function() {
        app.quit();
      }
    }
  ];
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  tray.setToolTip("Entropy Music");
  tray.setContextMenu(contextMenu);
}

const winshow = (win:any) => {
  if (win.isVisible()) {
    if (win.isMinimized()) {
      win.restore()
      win.focus()
    } else {
      win.focus()
    }
  } else {
    // !isMac && win.minimize()
    win.minimize();
    win.show()
    win.setSkipTaskbar(false)
  }
}

const createNewWindow = (options: createWindowOptions) => {
  const { width, height, minHeight, minWidth, hash, transparent, noParent } = options;
  // console.log('transparent', transparent);
  win[hash] = new BrowserWindow({
    width,
    height,
    minHeight,
    minWidth,
    fullscreenable: false,
    titleBarStyle: 'hidden',
    parent: noParent ? undefined : mainWindow!,
    frame: false,
    transparent: transparent ? transparent : false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
    },
  });
  let startUrl;
  if(isDevelopment) {
    startUrl = `http://localhost:1212#${hash}`;
  } else {
    const url = require('url');
    startUrl = url.format({
      pathname: path.resolve(__dirname, '../renderer/', 'index.html'),
      // pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: false,
      hash
    })
  }
  console.log(startUrl);
  win[hash].loadURL(startUrl);
  win[hash].on('ready-to-show', () => {
    if(!win[hash]) {
      throw new Error('window is not defined');
    }
    win[hash].show();
  })
  win[hash].on('closed', () => {
    win[hash] = null;
  });
}

const closeHashWindow = (hash: string) => {
  if(win[hash]) {
    win[hash].close();
  }
}

const createLoginWindow = () => {
  let loginWindow = new BrowserWindow({
  // show: false,
  width: 300,
  height: 528,
  parent: mainWindow?mainWindow:undefined,
  webPreferences: {
    nodeIntegration: true,
//       preload: path.resolve(__dirname, './public/preload.js'),//preload.js 文件路径
//       contextIsolation: false,//官方文档默认为true,
    preload: path.join(__dirname, 'preload.js'),
  },
  });
//  mainWindow.loadURL(resolveHtmlPath('index.html'));
  loginWindow.loadURL(resolveHtmlPath('index.html')+'?login');
  loginWindow.on('ready-to-show', () => {
  if (!loginWindow) {
    throw new Error('"loginWindow" is not defined');
  }
  loginWindow.show();
  // if (process.env.START_MINIMIZED) {
  //   mainWindow.minimize();
  // } else {
  //   mainWindow.show();
  // }
});
}
/**
* Add event listeners...
*/

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    createTray();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
    // mainWindow!.webContents.on('did-finish-load', () => {

    // })
    // listenDownload();
  })
  .catch(console.log);

  ipcMain.on('maxWindow', ()=>mainWindow?.maximize());
  ipcMain.on('minWindow', ()=>mainWindow?.minimize());
  ipcMain.on('closeWindow', (event, hide) => {
    if(hide) {
      console.log('hide');
      mainWindow?.setSkipTaskbar(true);
      mainWindow?.hide();
    } else {
      mainWindow?.close();
    }
  });
  ipcMain.on('createLoginWindow', () => {
    console.log('create login window')
    createLoginWindow();
  //  let loginWindow = new BrowserWindow({
//  })
  });

  ipcMain.on('create-new-window', (event, value) => {
    // console.log('createNewWindow');
    createNewWindow(value);
  });

  // ipcMain.on('create-klyric-window', (event, value) => {
  //   createNewWindow({

  //   })
  // })

  ipcMain.on('close-hash-window', (event, value) => {
    closeHashWindow(value);
  });

  ipcMain.on('send-parsedLines', (event, value) => {
    const kWin = win['klyric'];
    if(kWin)  {
      setTimeout(() => {
        kWin.webContents.send('set-parsedLines', value);
        console.log(value.length);
      }, 2000)
    }

  });

  ipcMain.on('send-curTime', (event, value) => {
    const kWin = win['klyric'];
    if(kWin)
    kWin.webContents.send('set-curTime', value);
  })



  ipcMain.on('loginSuccess', (event, value) => {
    mainWindow!.webContents.send('login-success', value);
  });

  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = store.get(val);
  });

  ipcMain.on('electron-store-set', async (event, key, val) => {
    store.set(key, val);
  });

  ipcMain.on('trigger-download', (e, value) => {
    console.log('trigger download', value);
    mainWindow?.webContents.downloadURL(value);
  });

  // const { session } = require('electron');
  // const fs = require('fs');
  const listenDownload = () => {
    // const fs = window.require('fs');
    const { session } = require('electron');
    session.defaultSession.on('will-download', async (event, item) => {
      const fileName = item.getFilename();
      const url = item.getURL();
      const startTime = item.getStartTime();
      const initialState = item.getState();
      const downloadPath = app.getPath('downloads');

      // let fileNum = 0;
      let savePath = path.join(downloadPath, fileName);

      // savePath基础信息
      const ext = path.extname(savePath);
      const name = path.basename(savePath, ext);
      const dir = path.dirname(savePath);

      // 文件名自增逻辑
      // while (fs.pathExistsSync(savePath)) {
      //   fileNum += 1;
      //   savePath = path.format({
      //     dir,
      //     ext,
      //     name: `${name}(${fileNum})`,
      //   });
      // }
      savePath = path.format({
        dir,
        ext,
        name: `${name}`,
      });

      // 设置下载目录，阻止系统dialog的出现
      item.setSavePath(savePath);
      console.log({
        savePath,
        url,
        startTime,
        state: initialState,
        paused: item.isPaused(),
        totalBytes: item.getTotalBytes(),
        receivedBytes: item.getReceivedBytes(),
      });
      // const id = guid();
      // 通知渲染进程，有一个新的下载任务
      mainWindow!.webContents.send('new-download-item', {
        // id,
        savePath,
        url,
        startTime,
        state: initialState,
        paused: item.isPaused(),
        totalBytes: item.getTotalBytes(),
        receivedBytes: item.getReceivedBytes(),
      });

      // 下载任务更新
      item.on('updated', (e, state) => { // eslint-disable-line
        console.log(item.getReceivedBytes()/item.getTotalBytes()*100+'%');
        mainWindow!.webContents.send('download-item-updated', {
          // id,
          startTime,
          state,
          totalBytes: item.getTotalBytes(),
          receivedBytes: item.getReceivedBytes(),
          paused: item.isPaused(),
        });
      });

      // 下载任务完成
      item.on('done', (e, state) => { // eslint-disable-line
        mainWindow!.webContents.send('download-item-done', {
          // id,
          startTime,
          state,
        });
      });
    });
  }


