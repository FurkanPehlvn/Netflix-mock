import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home.jsx";
import Welcome from "./pages/Welcome";
import Header from "./components/Header.jsx";
import { useState } from "react";

function App() {
  const [activeProfile, setActiveProfile] = useState(null);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <h1>Netflix</h1>
        </Route>
        <Route path="/Login">
          <Header />
          <Login />
        </Route>
        <Route path="/home">
          <Header activeProfile={activeProfile} />
          <Home activeProfile={activeProfile} />
        </Route>
        <Route path="/Welcome">
          <Welcome setActiveProfile={setActiveProfile} />
        </Route>
      </Switch>
      <div>
        <Link to="/">HomeHome page</Link>
        <Link to="/login">Login page</Link>
        <Link to="/home">Home page</Link>
        <Link to="/welcome">welcome page</Link>
      </div>
    </>
  );
}

export default App;
