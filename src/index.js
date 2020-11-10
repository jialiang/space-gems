import React from "react";
import { hydrate, render } from "react-dom";

import "./index.css";

import Game from "./Game/Game";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(<Game />, rootElement);
} else {
  render(<Game />, rootElement);
}
