import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import Watch from "./Components/Watch/Watch";

function App() {
  const user = true;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="register" />}
          </Route>
          <Route path="/home">
            {user ? <Home /> : <Redirect to="register" />}
          </Route>
          <Route path="/login">
            {!user ? <Login /> : <Redirect to="home" />}
          </Route>
          <Route path="/register">
            {!user ? <Register /> : <Redirect to="home" />}
          </Route>
          <Route path="/movies">
            <Home type="movies"></Home>
          </Route>
          <Route path="/series">
            <Home type="series"></Home>
          </Route>

          <Route path="/watch">
            <Watch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
