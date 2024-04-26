import React from "react";
import { AuthProvider } from "./Components/AuthContext";
import Routes from "./Components/Routes";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./css/App.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>

  );
}

export default App;
