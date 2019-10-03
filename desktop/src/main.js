const { dialog, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

const main = {
  window: null,
  createWindow,
  registerListeners
};

module.exports = main;

function createWindow() {
  // Browser config
  main.window = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: __dirname + '/preload.js'
    }
  });

  // Full width
  main.window.maximize();

  // React app
  main.window.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    main.window.webContents.openDevTools();
  }

  main.window.on('closed', () => (main.window = null));

  registerListeners();
}

function registerListeners() {
  ipcMain.on('open-folder', (event, arg) => {
    dialog.showOpenDialog(
      main.window,
      {
        properties: ['openFile', 'multiSelections']
      },
      files => {
        if (!files) {
          return;
        }

        event.reply('files-to-queue', files);
      }
    );
  });
}
