/* jshint node: true */
const path = require("path");
const os = require("os");
const electron = require("electron");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const peerflix = require("peerflix");
const address = require("network-address");

ipcMain.on("load-magnet", (e, infoHash) => {

  console.log("infoHash", infoHash);

  const engine = peerflix("magnet:?xt=urn:btih:" + infoHash, {
    connections: os.cpus().length > 1 ? 100 : 30,
    path: "./data",
    port: 3549
  });

  engine.on("ready", function() {
    e.sender.send("magnet-ready");
  });

  engine.server.on("listening", function () {
    if (!engine.server.address()) {
      return;
    }

    const port = engine.server.address().port;
    console.log(port);

    const href = "http://" + address() + ":" + port + "/";
    console.log("Server is listening on " + href);
  });

  engine.server.once("error", function (err) {
    engine.server.listen(0);
    console.log(err);
  });

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {

  const mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL("file://" + path.join(__dirname, "index.html"));
  mainWindow.on("closed", () => {
    //mainWindow = null;
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.openDevTools({ detach: true });
  }

});
