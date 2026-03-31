const { app, BrowserWindow, ipcMain, clipboard } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

// Path to store data persistently
const dataPath = path.join(app.getPath('userData'), 'snippets.json');

const defaultData = require('./defaultData.js');

function initData() {
  if (!fs.existsSync(dataPath)) {
    // Initial data structure
    fs.writeFileSync(dataPath, JSON.stringify(defaultData, null, 2));
  } else {
    try {
      let currentData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      let modified = false;
      
      // Migration for older saves that might be missing completely new arrays
      if (!currentData.builderItems) {
        currentData.builderItems = defaultData.builderItems;
        modified = true;
      }
      if (!currentData.settings) {
        currentData.settings = defaultData.settings;
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));
      }
    } catch (e) {
      console.error("Failed parsing existing data", e);
    }
  }
}

function readData() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.setMenu(null);

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  initData();

  ipcMain.handle('get-data', () => {
    return readData();
  });

  ipcMain.handle('save-data', (event, data) => {
    writeData(data);
    return true;
  });

  ipcMain.handle('copy-to-clipboard', (event, text) => {
    clipboard.writeText(text);
    return true;
  });

  ipcMain.handle('get-platform', () => {
    return process.platform;
  });

  ipcMain.handle('toggle-always-on-top', () => {
    const isAlwaysOnTop = mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(!isAlwaysOnTop);
    return !isAlwaysOnTop;
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
