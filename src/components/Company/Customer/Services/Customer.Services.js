import { authHeader } from '../../../../authenticates/Helpers/Auth-Header';
import { authenticationService } from '../../../../authenticates/Services/Authentication.Service';
import { API_URL } from '../../../../config';

const header = { 'authorization': authHeader(), 'Content-Type': 'application/json' };
const configOption = body => {
    return {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    };
};

// Get data from search
function searchData(searchModel, searchOption) {
    const query = { searchModel, searchOption };

    return fetch(`${API_URL}/Customer/searchData`, configOption(query)).then(response);
}

// Create new data
function createModel(model) {
    return fetch(`${API_URL}/Customer/createModel`, configOption(model)).then(response);
}

// Update data
function updateModel(model) {
    return fetch(`${API_URL}/Customer/updateModel`, configOption(model)).then(response);
}

// Delete data
function deleteModel(listID) {
    if (Array.isArray(listID) && listID.length > 0) {
        return fetch(`${API_URL}/Customer/deleteModel`, configOption({ listID })).then(response);
    } else {
        return false;
    }
}

// Get data by Id
function getByID(id) {
    const option = {
        method: 'GET',
        headers: header
    };

    return fetch(`${API_URL}/Customer/getByID/${id}`, option).then(response);
}

// lấy dữ liệu liên tục
function getDataFilter(searchModel) {
    const query = {
        searchModel,
        page: 1,
        limit: 1000
    };

    return fetch(`${API_URL}/Customer/getDataFilter`, configOption(query)).then(response);
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

export const Customer_Service = {
    searchData,
    createModel,
    updateModel,
    deleteModel,
    getByID,
    getDataFilter
};
