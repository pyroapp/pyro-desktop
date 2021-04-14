const { exec } = require('child_process')
const {app, BrowserWindow } = require('electron')
const fkill = require('fkill')
// const delay = require('delay')

async function startInternalServer() {
    try {
        const {stdout, stderr} = await exec(`cd ${__dirname}/internal/out/pyro-win32-x64 && pyro.exe`)
        // await delay(10000)
        // console.log(stdout)
        // console.log(stderr)
    } catch (err) {
        console.log(err)
    }
}

/*
function newWindow(file, width, height) {
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: 'preload.js' //path.join(__dirname, 'preload.js')
        }

    })

    win.loadFile(file).then(null)
}
*/


function pyrostart() {
    app.whenReady().then(() => {
        const pyro = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: "preload.js"
            }
            //show: false,
           // icon: "static/desktop_icon.ico"
        })

        pyro.loadFile('landing.html').then(null)

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                pyro.loadFile('landing.html').then(null)
            }
        })

        console.log('App loading')
    
    })
}


    //fkill(['pyro.exe', 'pyro-desktop.exe'], {force: true})

//startInternalServer().then(r => {
    pyrostart()
    
//})


app.on('window-all-closed', () => {
    //fkill(['pyro.exe', 'pyro-desktop.exe', ':50153'], {force: true}).then(r => {
        //console.log('kek')
        if (process.platform !== 'darwin') {
        app.quit()
        }
    })
