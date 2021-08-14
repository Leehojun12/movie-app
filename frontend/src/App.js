import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Navigation />
      <Route path="/" component={HomePage} exact />
      <Route path="/movie/:title" component={MoviePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </>
  );
}

export default App;
