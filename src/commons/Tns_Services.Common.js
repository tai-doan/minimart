import { authHeader } from '../authenticates/Helpers/Auth-Header';
import { authenticationService } from '../authenticates/Services/Authentication.Service';
import { API_URL } from '../config';

const header = { 'authorization': authHeader(), 'Content-Type': 'application/json' };
const configOption = body => {
    return {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    };
};

// Get data from search
function searchData(screen, searchModel, searchOption) {
    const query = { searchModel, searchOption };

    return fetch(`${API_URL}/${screen}/searchData`, configOption(query)).then(response);
}

// Create new data
function createModel(screen, model) {
    return fetch(`${API_URL}/${screen}/createModel`, configOption(model)).then(response);
}

// Update data
function updateModel(screen, model) {
    return fetch(`${API_URL}/${screen}/updateModel`, configOption(model)).then(response);
}

// Delete data
function deleteModel(screen, listID) {
    if (Array.isArray(listID) && listID.length > 0) {
        return fetch(`${API_URL}/${screen}/deleteModel`, configOption({ listID })).then(response);
    } else {
        return false;
    }
}

// Get data by Id
function getByID(screen, id) {
    const option = {
        method: 'GET',
        headers: header
    };

    return fetch(`${API_URL}/${screen}/getByID/${id}`, option).then(response);
}

// lấy dữ liệu liên tục
function getDataFilter(screen, searchModel) {
    const query = {
        searchModel,
        page: 1,
        limit: 1000
    };

    return fetch(`${API_URL}/${screen}/getDataFilter`, configOption(query)).then(response);
}

// convert data into json
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

export const Tns_Service = {
    searchData,
    createModel,
    updateModel,
    deleteModel,
    getByID,
    getDataFilter
};
