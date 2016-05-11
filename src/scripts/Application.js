import React from "react";
import {ipcRenderer} from "electron";

export const Application = React.createClass({
    getInitialState() {
      return {
        magnet: null,
        isReady: false
      };
    },

    handleMagnetReady() {
      this.setState({ isReady: true });
    },

    handleSubmit(e) {
      e.preventDefault();
      const re = /^magnet\:\?xt=urn\:btih\:([A-F0-9]{40}).*?/;
      if (this.refs.magnet.value) {
        const matches = this.refs.magnet.value.match(re);
        if (matches) {
          const infoHash = matches[1];
          console.log(`using ${infoHash}`);
          this.setState({
            magnet: infoHash
          });
          ipcRenderer.once("magnet-ready", this.handleMagnetReady);
          ipcRenderer.send("load-magnet", infoHash);
        }
      }
    },

    handleClose(e) {
      e.preventDefault();
      this.setState({ magnet: null });
    },

    renderVideo() {
      return (
        <div className="video">
          <video ref="video" height="100%" width="100%" controls="controls">
            <source src="http://127.0.0.1:3549" type="video/mp4" />
          </video>
          <a href="#" className="close" onClick={this.handleClose}>×</a>
        </div>
      );
    },

    renderLoader() {
      return (<div className="loader"></div>)
    },

    renderInput() {
      return (<form onSubmit={this.handleSubmit}>
                <input type="text" name="magnet" ref="magnet" />
                <button type="submit">
                  Play
                </button>
              </form>);
    },

    render() {
      let screen;
      if (this.state.magnet === null) {
        screen = this.renderInput();
      } else {
        if (this.state.isReady) {
          screen = this.renderVideo();
        } else {
          screen = this.renderLoader();
        }
      }
      return (
        <div className="flix">
          {screen}
        </div>
      );
    }
});

export default Application;
