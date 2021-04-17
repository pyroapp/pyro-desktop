const {app, BrowserWindow, globalShortcut, Menu, Tray, ipcMain } = require('electron')
let pyroTray = null;
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

        // Keyboard shortcut to open Pyro
        globalShortcut.register('Alt+P', () => {
            pyro.show()
          })
        // init tray menu and set labels/functions
        pyroTray = new Tray('img/favicon.png');
        const pyroContextMenu = Menu.buildFromTemplate([
            { label: 'Open Pyro', type: 'normal', click: () => pyro.show() },
            { label: 'Separator', type: 'separator' },
            { label: 'Paste Clipboard', type: 'normal' },
            { label: 'Upload File', type: 'normal' },
            { label: 'Separator', type: 'separator' },
            { label: 'Credits', type: 'normal' },
            { label: 'Quit Pyro', type: 'normal', click: () => app.quit()}
        ])
        // Set the tray menu
        pyroTray.setToolTip("Pyro App");
        pyroTray.setContextMenu(pyroContextMenu)

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