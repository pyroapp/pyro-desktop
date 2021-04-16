const {app, BrowserWindow, globalShortcut, Menu, Tray } = require('electron')
let pyroTray = null;

function pyrostart() {
    console.log('App loading')
    app.whenReady().then(() => {
        const pyro = new BrowserWindow({
            width: 1280,
            height: 720,
            webPreferences: {
                preload: "preload.js",
                webviewTag: true
            },
            show: false,
            icon: "static/desktop_icon.ico",
            titleBarStyle: 'hidden',
            hasShadow: true,
            autoHideMenuBar: true,
            frame: false,
            backgroundColor: "#101015"
        })
        pyro.loadFile('topbar.html').then()
        
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                pyro.loadFile('topbar.html').then(null)
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
