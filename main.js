const { app, BrowserWindow } = require('electron')
function createWindow() {
  const win = new BrowserWindow({
    width: 1024, 
    height: 768,
    webPreferences:{
      enableRemoteModule: true
    },
  })
  win.loadURL('https://ocak-kebab-admin.netlify.app/')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit()
  }
})

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) createWindow()
})