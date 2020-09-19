import React, { Component } from "react";

import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./Router";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <Router />
          <Footer />
        </div>
      </div>
    );
  }
}
