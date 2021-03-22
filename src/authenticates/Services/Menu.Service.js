import jsonQuery from 'json-query';
export const menuService = {
    show,
    getSubMenu,
    showPermission,
    getLabel,
    getLanguage,
    getUserInfor
};

function getUserInfor() {
    return JSON.parse(localStorage.getItem('userinfor'));
}

function show() {
    var module = JSON.parse(localStorage.getItem('userinfor'));
    var moduleAvailable = jsonQuery('[**]ModuleAllow[**]', { data: module }).value;
    return moduleAvailable;
}

function getLanguage() {
    var module = JSON.parse(localStorage.getItem('userinfor'));
    var languageAvailable = jsonQuery('[**]User[System_User_Language]', { data: module }).value;
    return languageAvailable;
}

function showPermission(screen) {
    var screenList = JSON.parse(localStorage.getItem('userinfor'));
    var permissionList = jsonQuery(['[**]PermissionAllow[**][*System_Permission_Screen=?]', screen], { data: screenList }).value;
    return permissionList;
}

function getSubMenu(module) {
    var userInfo = JSON.parse(localStorage.getItem('userinfor'));
    var screenAvailable = jsonQuery(['[**]ModuleAllow[System_Module_Name=?][System_Screens]', module], { data: userInfo }).value;
    return screenAvailable;
}

function getLabel() {
    var userinfor = JSON.parse(localStorage.getItem('userinfor'));
    var label = jsonQuery('[**]User[System_User_DisplayName]', { data: userinfor }).value;
    return label;
}