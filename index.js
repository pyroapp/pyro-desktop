const {app, BrowserWindow } = require('electron')

function pyrostart() {
    console.log('App loading')
    app.whenReady().then(() => {
        const pyro = new BrowserWindow({
            width: 800,
            height: 600,
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
    })
}

pyrostart()
    
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
