import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import './App.css';
import UserView from  './views/UserView';
import UserCreateView from './views/UserCreateView';
import UserEditView from "./views/UserEditView";
import {useLocation} from 'react-router-dom';

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function App() {
  return (
    <div className="m-3">
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Navbar.Brand href="/">My application</Navbar.Brand>
      </Navbar>
      <Switch>
          <Route exact path="/">
            <Redirect
            to={{ pathname: "/users" }}
            />
          </Route>
          <Route exact path="/users">
            <UserView />
          </Route>
          <Route path="/users/create" render={(props) => <UserCreateView {...props} /> } />
          <Route path="/users/edit/:id" render={(props) => <UserEditView {...props.match.params} /> }/>
          <Route path="*"><NoMatch /></Route>
        </Switch>
    </div>
  );
}

export default App;
