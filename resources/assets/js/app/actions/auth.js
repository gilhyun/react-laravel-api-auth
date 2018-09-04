import qs from "qs";
import {CLIENT_ID, CLIENT_SECRET} from "../constants";
import {authStore} from "../store/auth";
import Cookies from 'js-cookie';

const axios = window.axios;

async function checkAuth() {
    let user = {};
    if (authStore.accessToken = Cookies.get('LB_TOKEN'))
        user = await getUser();
    if (authStore.accessToken && authStore.user !== {}) {
        authStore.isAuth = true;
        return user;
    }
    else {
        authStore.isAuth = false;
        return {};
    }
}

export const initAuth = () => {
    let token = document.head.querySelector('meta[name="csrf-token"]');

    checkAuth();

    if (token) {
        window.axios.defaults.headers.common.Accept = 'application/json';
        window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
    }
    else {
        console.error(
            "%cBad CSRF-token",
            "background: red; color: white; font-size: x-large"
        );
    }
};

async function getUser() {
    try {
        const result = await axios.get('/api/get_user');
        authStore.user = {...result.data.user};
        return result;
    }
    catch (e) {
        authStore.user = {};
        console.log(e);
        return {};
    }
}

export const login = (email, password, callback) => {
    axios.post('/oauth/token', qs.stringify({
        'username': email,
        password,
        'grant_type': 'password',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    })).then(response => {
        Cookies.set('LB_TOKEN', response.data.access_token, { expires: 1 });
        callback(true);
        authStore.accessToken = response.data.access_token;
        getUser();
    }).catch(error => {
        console.log(error);
        callback(false);
    });
};

export const logout = () => {
    authStore.accessToken = null;
    authStore.isAuth = false;
    authStore.user = {};
    Cookies.remove('LB_TOKEN');
};

export {getUser};
