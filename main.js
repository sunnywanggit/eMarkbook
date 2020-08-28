const {app, BrowserWindow} = require('electron');


let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width:1024,
        height:680,
        webPreferences:{
            nodeIntegration:true
        }
    });
    // const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
    const urlLocation ='http://localhost:3000';
    mainWindow.loadURL(urlLocation);
});





