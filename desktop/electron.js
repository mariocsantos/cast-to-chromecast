const { app, dialog, BrowserWindow, ipcMain } = require('electron');

const url = require('url');
const path = require('path');
const isDev = require('electron-is-dev');

let main;

function createWindow() {
  main = new BrowserWindow({ 
    show: false,
    webPreferences: {
      preload: __dirname + '/preload.js'
    }
  });
  main.maximize();
  main.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  main.on('closed', () => main = null);

  registerListeners();

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (main === null) {
    createWindow();
  }
});

function registerListeners() {
  ipcMain.on('open-folder', (event, arg) => {
    dialog.showOpenDialog(main, {
      properties: ['openDirectory', 'openFile', 'multiSelections']
    }, (files) => {
      if (!files) {
        return;
      }

      event.reply('files-to-queue', files);
    });
  });
}