const { contextBridge, ipcRenderer } = require('electron');
const db = require('../db/downloadItem');
// window.ipcRenderer = require('electron').ipcRenderer;

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
      // if (validChannels.includes(channel)) {
      //   ipcRenderer.send(channel, data);
      // }
    },
  },
  db,
});
