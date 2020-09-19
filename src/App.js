import React, { Component } from "react";

import "./App.scss";
import Header from "./components/Header";
import Router from "./Router";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <Router />
        </div>
      </div>
    );
  }
}
