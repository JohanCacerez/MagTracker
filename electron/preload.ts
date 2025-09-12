import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  magazines: {
    get: () => ipcRenderer.invoke('magazines:get'),
    add: (magazine: { title: string; issue: string; publisher: string }) => ipcRenderer.invoke('magazines:add', magazine),
  }
})
