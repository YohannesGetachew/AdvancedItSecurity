import React from "react";
import { Route, Switch } from "react-router";
import { Login } from "../Auth/Login";
import { Registration } from "../Auth/Registration";
import { Home } from "./Home";
import landingImg from "../../assets/landing.jpg";

export const HomeNav = () => {
  return (
    <React.Fragment>
      <aside class="container__left">
        <img src={landingImg} alt="landing" width={"90%"} />
      </aside>
      <aside class="container__right">
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route
            path="/register"
            render={(props) => <Registration {...props} />}
          />
          <Route path="/" render={(props) => <Home {...props} />} />
        </Switch>
      </aside>
    </React.Fragment>
  );
};
