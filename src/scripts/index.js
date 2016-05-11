import React from "react";
import ReactDOM from "react-dom";
import Application from "./Application";

function init() {
  window.removeEventListener("DOMContentLoaded", init);
  ReactDOM.render(
      <Application />,
      document.querySelector("#application")
  );
}

window.addEventListener("DOMContentLoaded", init);

/*
engine = peerflix( "magnet:?xt=urn:btih:" + infoHash, {
    connections: os.cpus().length > 1 ? 100 : 30,
    path: "./data",
    port: enginePort
});

var started = Date.now();
var wires = engine.swarm.wires;
var swarm = engine.swarm;

engine.on("ready", function() {
    console.log(engine.torrent);
    console.log(engine.tracker);

    subManager = subtitle(subPort);
    subManager.searchSubtitles(engine.torrent.name, function (success) {
        if(!success) {
            engine.skipSubtitles = true;
        }

        engine.langFound = success;
    });

    NA.trackEvent("Player", "Play torrent", engine.torrent.infoHash + " - " + engine.torrent.name, function (err, resp) {});
});

engine.server.on("listening", function () {
    if (!engine.server.address())
        return;

    var port = engine.server.address().port;
    console.log(port);

    var href = "http://" + address() + ":" + port + "/";
    console.log("Server is listening on " + href);
});


engine.server.once("error", function (err) {
    engine.server.listen(0);
    console.log(err);
});
*/
