const { app } = require('electron');

const main = require('./src/main');

app.on('ready', main.createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (main.window === null) {
    main.createWindow();
  }
});