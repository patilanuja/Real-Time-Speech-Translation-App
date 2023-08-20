import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import Auth from "./container/auth/Auth";
import Default from "./container/Default";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/fluent-light/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './Primereact.css';
import NotFound from './container/NotFound';
import AuthWait from "./container/auth/AuthWait";
import AuthConfirm from "./container/auth/AuthConfirm";
import Secure from "./container/secure/Secure";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path='/auth/confirm' component={AuthConfirm} />
            <Route path='/auth/wait' component={AuthWait} />
            <Route path='/auth' exact component={Auth} />
            <Route path='/secure' component={Secure} />
            <Route path='/' exact component={Default} />
            <Route component={NotFound} />
          </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);