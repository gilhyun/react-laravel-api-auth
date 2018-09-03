import {observable, decorate, computed} from 'mobx';

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

}

decorate(AuthStore, {
    isAuth: observable,
    accessToken: computed,
    user: observable
});

let authStore = new AuthStore();

export {authStore};
