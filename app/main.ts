import { app, BrowserWindow, screen,ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });
 
  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    // fs.writeFile('src\\app\\readwritefile\\write.txt', "new content", { flag: 'a+' },err => {
    //   if (err) {
    //     console.error(err);
    //   }
    // });
    // const result = fs.readFileSync('src\\app\\readwritefile\\read.txt', {encoding: 'utf-8'});
    // console.log(result);
    const readable = fs.createReadStream(
      'src\\app\\readwritefile\\read.txt', {encoding: 'utf8'});
    logChunks(readable);

    let pathIndex = './index.html';
    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}
async function logChunks(readable) {
  for await (const chunk of readable) {
    console.log(chunk);
  }
}
try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947

  const ipc = require('electron').ipcMain;
  ipc.on('synMessage', (event, args) => {
   console.log(args);
   event.returnValue = 'Main said I received your Sync message';
  })
  
  ipc.on('aSynMessage', (event, args) => {
   console.log(args);
   event.sender.send('asynReply','Main said: Async message received')
  })
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
