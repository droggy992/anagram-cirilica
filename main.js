const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        minWidth: 400,
        minHeight: 500,
        title: 'Анаграм',
        icon: path.join(__dirname, 'icon.ico'),
        autoHideMenuBar: true,
        backgroundColor: '#667eea',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile('index.html');

    // Remove menu bar completely
    win.setMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
