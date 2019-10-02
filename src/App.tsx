import React from 'react';
import './App.css';
import isElectron from 'is-electron';

const { ipcRenderer }: any = window;

function App() {
  
  if (isElectron()) {
    ipcRenderer.on('files-to-queue', (event: any, arg: any) => {
      alert(arg);
    });
  }

  return (
    <div className="App">
      <button onClick={openFolder}>Click me to add your videos</button>
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
