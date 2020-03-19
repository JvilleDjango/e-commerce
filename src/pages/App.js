import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../components/header/header";

import HomePage from "./home/HomePage";
import ShopPage from "./shop/ShopPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
