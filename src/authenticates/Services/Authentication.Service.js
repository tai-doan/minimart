import { authHeader } from '../Helpers';
import { API_URL } from '../../config';
import jsonQuery from 'json-query';

export const authenticationService = {
    login,
    logout,
    getUserAuthorization,
    getUserLogin,
    getUser,
    getAuthorizeUser,
    getUserInfor,
    getCurrentLanguage,
    isLogin,
    checkInfor
};

function login(username, password) {
    const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(API_URL + `/Authentication/signIn`, option)
        .then(response)
        .then(user => {
            if (user.success && user.token) {
                localStorage.setItem('user', JSON.stringify(user.token));
            }
            return user;
        });
}

function getUserAuthorization() {
    const option = {
        method: 'POST',
        headers: { 'authorization': authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(API_URL + `/Authentication/getUserAuthorization`, option).then(response).then(userInfo => {
        if (userInfo.returnCode) {
            localStorage.setItem('userinfo', JSON.stringify(userInfo.result));
        }
    });
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userinfo');
}

function getUserLogin() {
    const user = localStorage.getItem('userinfo');
    return JSON.parse(user);
}

function isLogin() {
    if (localStorage.getItem('userinfo') !== null && localStorage.getItem('user') !== null) {
        return true;
    }
    return false;
}

function checkInfor() {
    return localStorage.getItem('userinfo') ? true : false;
}

function getUser(userName, language) {
    const option = {
        method: 'POST',
        headers: { 'authorization': authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName })
    };

    return fetch(API_URL + `/Authentication/getAuthorizeUser`, option).then(response).then(userinfor => {
        if (userinfor) {
            if (!!language) {
                userinfor[0].User.System_User_Language = language;
            }
            localStorage.setItem('userinfo', JSON.stringify(userinfor));
        }
    });
}

async function getAuthorizeUser(phonenumber, language) {
    await getUser(phonenumber, language);
    return JSON.parse(localStorage.getItem('userinfo'));
}

function getUserInfor() {
    return JSON.parse(localStorage.getItem('userinfo'));
}

function getCurrentLanguage() {
    const module = JSON.parse(localStorage.getItem('userinfo'));
    return jsonQuery('[**]User[System_User_Language]', { data: module }).value[0];
}

function response(res) {
    return res.text().then(text => {
        const data = JSON.parse(text);
        if (!res.ok) {
            authenticationService.logout();
            const err = data && data.message;
            return Promise.reject(err);
        }
        return data;
    });
}
