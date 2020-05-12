import React, { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";

import { firebaseAuth } from "./services/firebase";

function App() {
  // component state
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("App's useEffect");
    if (!loading) {
      setLoading(true);
      firebaseAuth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setAuth(true);
          setLoading(false);
          setUser(firebaseAuth().currentUser);
        }
      });
    }
  }, [auth]);

  return (
    <div className="App">
      {auth ? `user auth with : ${user ? user.email : null}` : "not authrized"}
      <Router>
        <Navigation />
        <PublicRoute />
        {auth && <PrivateRoute />}
      </Router>
    </div>
  );
}

// require no auth
function PublicRoute() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/signup" render={() => <Signup />} />
    </Switch>
  );
}

// require auth
function PrivateRoute() {
  return (
    <Switch>
      <Route path="/chat" render={() => <Chat />} />
    </Switch>
  );
}

export default App;
