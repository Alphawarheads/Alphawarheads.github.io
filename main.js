const { app, BrowserWindow } = require('electron');
export default new Router({
 mode: 'hash', //这里history修改为hash
 scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap,
})
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('index.html'); // 加载你的React应用的入口文件
}

app.whenReady().then(createWindow);

app.on(==='window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});