import React from "react";
import {ipcRenderer} from "electron";

export const Application = React.createClass({
    getInitialState() {
        return {
            isReady: false
        };
    },

    componentWillMount() {
        const infoHash = "A9A56DAF4339E7F098C35CF64D4DDFA8B9F95364";
        ipcRenderer.send("load-magnet", infoHash);
        ipcRenderer.on("magnet-ready", this.handleMagnetReady);
    },

    handleMagnetReady() {
        this.setState({
            isReady: true
        });
    },

    renderVideo() {
        return (<video height="100%" width="100%" controls="controls">
                    <source src="http://127.0.0.1:3549" type="video/mp4" />
                </video>)
    },

    renderLoader() {
        return (<div className="loader"></div>)
    },

    render() {
        const video = this.state.isReady ? this.renderVideo() : this.renderLoader();
        return (
            <div className="flix">
                {video}
            </div>
        );
    }
});

export default Application;
