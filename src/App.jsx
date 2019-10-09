import isElectron from 'is-electron';
import React from 'react';
import './App.scss';

const { ipcRenderer } = window;

function App() {
  window['__onGCastApiAvailable'] = function(isAvailable) {
    console.log(isAvailable)
    if (isAvailable) {
      // initializeCastApi();
    }
  };

  if (isElectron()) {
    ipcRenderer.on('files-to-queue', (event, arg) => {
      console.log(arg);
    });
  }

  return (
    <div className="App">
      <button onClick={openFolder}>Click me to add your videos</button>
      <google-cast-launcher></google-cast-launcher>
    </div>
  );
}

function openFolder() {
  if (!isElectron()) {
    return;
  }

  ipcRenderer.send('open-folder');
}

export default App;
