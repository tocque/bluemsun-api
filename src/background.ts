'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function listenIPC(win: BrowserWindow) {
  win.on('closed', () => {
    win = null
  })

  ipcMain.on('window-minimize', () => {
      win.minimize();
  })

  ipcMain.on('window-maximize', (event) => {
      const maxed = win.isMaximized();
      if (maxed) {
          win.restore();
      } else {
          win.maximize();
      }
      event.sender.send('window-maximized', !maxed)
  })

  ipcMain.on('window-close', () => {
      win.close();
  })

  ipcMain.on('open-devtool', () => {
      win.webContents.openDevTools();
  })

  ipcMain.on('open-directory-dialog', (event, p) => {
      dialog.showOpenDialog({
          properties: [p]
      }).then(({ canceled, filePaths }) => {
          if (!canceled) {
              event.sender.send('selectedItem', filePaths[0]);
          }
      });
  });
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 640,
    frame: false,
    darkTheme: true,
    // resizable: false,
    transparent: true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      webSecurity: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  listenIPC(win);

  let winHandler: Map<string, BrowserWindow> = new Map;
  
  win.on('close', () => {
    winHandler.forEach(e => e.close());
    winHandler.clear();
  })

  win.on('closed', () => {
    console.log('closed');
    win = null
  })

  ipcMain.on('open-editor', (event, { id, type }) => {
    if (winHandler.has(id)) return;
    const editor = new BrowserWindow({
      width: 900,
      height: 640,
      frame: false,
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: (process.env
            .ELECTRON_NODE_INTEGRATION as unknown) as boolean
      }
    })

    editor.webContents.on("new-window", (event, url) => {
      shell.openExternal(url);
      event.preventDefault();
    })

    editor.on('close', () => {
      winHandler.delete(id);
    })

    listenIPC(editor);

    const param = `?type=${type}&id=${id}`;

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      editor.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "editor.html" + param as string)
      if (!process.env.IS_TEST) editor.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      editor.loadURL("app://./editor.html"+param)
    }

    winHandler.set(id, editor);
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
