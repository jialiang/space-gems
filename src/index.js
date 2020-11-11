import { Component } from "preact";

import Game from "./Game/Game";

import "./index.css";

export default class App extends Component {
  render() {
    return (
      <div id="root">
        <Game />
      </div>
    );
  }
}
