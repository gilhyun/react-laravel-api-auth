import {observable, decorate, computed} from 'mobx';
import auth0 from "auth0-js";
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_REDIRECT_URL} from "../constants";

class AuthStore {
    isAuth = false;
    __accessToken = '';
    user = {};

    set accessToken(token) {
        if (token) {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            this.isAuth = true;
            this.__accessToken = token;
        }
        else {
            window.axios.defaults.headers.common['Authorization'] = '';
        }
    }

    get accessToken() {
        return this.__accessToken;
    }

    auth0 = new auth0.WebAuth({
        domain: AUTH0_DOMAIN,
        clientID: AUTH0_CLIENT_ID,
        redirectUri: AUTH0_REDIRECT_URL,
        responseType: 'token id_token',
        scope: 'openid profile'
    });
}

decorate(AuthStore, {
    isAuth: observable,
    accessToken: computed,
    user: observable
});

let authStore = new AuthStore();

export {authStore};
