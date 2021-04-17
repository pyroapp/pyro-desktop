const {app, BrowserWindow, ipcMain} = require('electron')

var pyro;

function pyrostart() {
    console.log('App loading')
    app.whenReady().then(() => {
        pyro = new BrowserWindow({
            width: 1400,
            height: 800,
            minWidth: 1000,
            minHeight: 600,
            webPreferences: {
                preload: "preload.js",
                webviewTag: true,
                nodeIntegration: true,
                contextIsolation: false
            },
            show: false,
            icon: "static/desktop_icon.ico",
            titleBarStyle: 'hidden',
            hasShadow: true,
            autoHideMenuBar: true,
            frame: false,
            backgroundColor: "#101015"
        })

        pyro.loadFile('app.html').then()
        
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                pyro.loadFile('app.html').then(null)
            }
        })
        
        pyro.show()
        console.log('App loaded')
    })
}

pyrostart()
    
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('minimize', () => {
    pyro.minimize()
})