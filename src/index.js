import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Kontakt,
} from "./components";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/kontakt" element={<Kontakt />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();