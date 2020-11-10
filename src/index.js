import { hydrate } from "react-dom";

import "./index.css";

import Game from "./Game/Game";

hydrate(<Game />, document.getElementById("root"));
