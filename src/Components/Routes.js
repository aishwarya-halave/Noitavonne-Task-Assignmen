// Routes.js
import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from './AuthContext';
import EndUserComponent from './EndUserComponent';
import AdminComponent from './AdminComponent';
import TechSupport from './TechSupport';
import Login from './Login';
import RegisterRole from './RegisterRole';
import Register from './Register';

const Routes = () => {
    const { user } = useAuth();
    return (
        <Switch>
            {console.log(user, "hjoj")}
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />

            <Route path="/end-user">
                {user && user.role === 'end-user' ? <EndUserComponent /> : <Login />}
            </Route>
            <Route path="/tech-support">
                {user && user.role === 'tech-support' ? <TechSupport /> : <Login />}
            </Route>
            <Route path="/admin">
                {user && user.role === 'admin' ? <AdminComponent /> : <Login />}
            </Route>

        </Switch>
    );
};

export default Routes;
