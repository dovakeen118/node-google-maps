import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import MapIndex from "./maps/MapIndex"
import VanillaGoogleMap from "./maps/VanillaGoogleMap";
import SimpleJsApiLoaderGoogleMap from "./maps/SimpleJsApiLoaderGoogleMap";
import AdvancedJsApiLoaderGoogleMap from "./maps/AdvancedJsApiLoaderGoogleMap";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  // define state above the rest of the app, so that this state can be accessed across the app
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={MapIndex} />
        <Route exact path="/vanilla-google-map" component={VanillaGoogleMap} />
        <Route exact path="/simple-js-loader-map" component={SimpleJsApiLoaderGoogleMap} />
        <Route exact path="/advanced-js-loader-map" component={AdvancedJsApiLoaderGoogleMap} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
