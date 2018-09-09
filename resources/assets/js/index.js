import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Provider} from 'mobx-react';
import {authStore} from "./app/store/auth";
import {initAuth, logout} from "./app/actions/auth";
import {inject, observer} from 'mobx-react';
import WelcomePage from "./app/components/WelcomePage";
import LoginForm from './app/components/LoginForm/index';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import RegisterForm from "./app/components/RegisterForm";
import {appStore} from "./app/store/app";
import {handleAuthentication} from "./app/actions/socialLogin";
import Page404 from "./app/components/404";

window.axios = axios;

initAuth();

const App = inject('authStore', 'store')(observer(({authStore}) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={WelcomePage}/>
                <Route path="/login" render={() => {
                    return authStore.isAuth ? (<Redirect to="/"/>) : <LoginForm/>
                }}/>
                <Route path="/register" render={() => {
                    return authStore.isAuth ? (<Redirect to="/"/>) : <RegisterForm/>
                }}/>
                <Route path="/404" component={Page404}/>
                <Route path="/logout" render={() => {
                    return <Redirect to="/"/>
                }}/>
                <Route path="/social/callback" render={props => {
                    appStore.isLogging = true;
                    handleAuthentication(props);
                    return <Redirect to="/"/>
                }}/>
                <Redirect from="*" to="/404"/>
            </Switch>
        </Router>
    );
}));

if (document.getElementById('app-root')) {
    ReactDOM.render(
        <Provider authStore={authStore} store={appStore}>
            <App />
        </Provider>,
        document.getElementById('app-root'));
}
