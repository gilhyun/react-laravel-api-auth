import qs from "qs";
import {authStore} from "../store/auth";
import {getUser} from "./auth";
import Cookies from "js-cookie";
import {appStore} from "../store/app";
const axios = window.axios;

const socialLogin = (credentials, callback) => {
    axios.post('/login/social', qs.stringify({...credentials}
    )).then(response => {
        Cookies.set('LB_TOKEN', response.data.access_token);

        authStore.accessToken = response.data.access_token;
        getUser();
        callback();
    }).catch(error => {
        console.log(error);
        callback();
    });
};

const handleAuthentication = (props) => {
    const auth0 = authStore.auth0;
    const {location} = props;
    if (/access_token|id_token|error/.test(location.hash)) {
        auth0.parseHash((err, authResult) => {
            auth0.client.userInfo(authResult.accessToken, (err, profile) => {
                socialLogin(profile, () => {appStore.isLogging = false});
            });
        });
    }
};

export {socialLogin, handleAuthentication};