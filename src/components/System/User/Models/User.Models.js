import { TNS_DISPLAY_AREA_KEY, TNS_METHOD, TNS_SCREEN } from '../../../../commons';

const cell = 'ant-table-cell-ellipsis';
const cell_hidden = 'ant-table-cell-ellipsis-hidden';

//#region Khai báo các key cho localStorage (tùy chọn hiển thị)
const fieldSortKeys = `${TNS_DISPLAY_AREA_KEY.sortFieldKeys}_${TNS_SCREEN.User}`;
const fieldSearchKeys = `${TNS_DISPLAY_AREA_KEY.searchFieldKeys}_${TNS_SCREEN.User}`;
const fieldSearchResultKeys = `${TNS_DISPLAY_AREA_KEY.searchResultFieldKeys}_${TNS_SCREEN.User}`;
const fieldEditModalKeys = `${TNS_DISPLAY_AREA_KEY.modalForm}_${TNS_SCREEN.User}`;
//#endregion

// Các field được hiển thị dưới bảng kết quả
export function defaultColumnInResultTable(language, commonLanguage, defaultColumn) {
    return [
        {
            width: 150,
            title: language.USER_CODE,
            key: 'User_Code',
            dataIndex: 'User_Code',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('User_Code') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.USER_NAME,
            key: 'User_Name',
            dataIndex: 'User_Name',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('User_Name') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.USER_EMAIL,
            key: 'User_Email',
            dataIndex: 'User_Email',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('User_Email') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.USER_EMPLOYEE,
            key: 'User_Employee',
            dataIndex: 'EmployeeObject',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('User_Employee') ? cell : cell_hidden,
            render: data => (
                !!data ? data.Employee_Name : null
            )
        },
        {
            width: 150,
            title: language.USER_NUMBERPHONE,
            key: 'User_NumberPhone',
            dataIndex: 'User_NumberPhone',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('User_NumberPhone') ? cell : cell_hidden
        },
        {
            width: 150,
            title: commonLanguage.STATUS,
            key: 'Status',
            dataIndex: 'StatusObject',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Status') ? cell : cell_hidden,
            render: data => (
                !!data ? data.Parameter_Name : null
            )
        },
        {
            width: 150,
            title: commonLanguage.CREATED_BY,
            key: 'CreatedBy',
            dataIndex: 'CreatedByObject',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('CreatedBy') ? cell : cell_hidden,
            render: data => (
                !!data ? data.User_Name : null
            )
        },
        {
            width: 150,
            title: commonLanguage.CREATED_DATE,
            key: 'CreatedDate',
            dataIndex: 'CreatedDate',
            align: 'center',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('CreatedDate') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.formatDMY(data)
            )
        },
        {
            width: 150,
            title: commonLanguage.UPDATED_BY,
            key: 'UpdatedBy',
            dataIndex: 'UpdatedByObject',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('UpdatedBy') ? cell : cell_hidden,
            render: data => (
                !!data ? data.User_Name : null
            )
        },
        {
            width: 150,
            title: commonLanguage.UPDATED_DATE,
            key: 'UpdatedDate',
            dataIndex: 'UpdatedDate',
            align: 'center',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('UpdatedDate') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.formatDMY(data)
            )
        }
    ];
}

// Các field được hiển thị trên khung tìm kiếm
export function defaultFieldInSearchForm(language, commonLanguage) {
    return [
        {
            title: language.USER_CODE,
            key: 'User_Code'
        },
        {
            title: language.USER_NAME,
            key: 'User_Name'
        },
        {
            title: language.USER_EMAIL,
            key: 'User_Email'
        },
        {
            title: language.USER_EMPLOYEE,
            key: 'User_Employee'
        },
        {
            title: language.USER_NUMBERPHONE,
            key: 'User_NumberPhone'
        },
        {
            title: commonLanguage.STATUS,
            key: 'Status'
        },
        {
            title: commonLanguage.CREATED_BY,
            key: 'CreatedBy'
        },
        {
            title: commonLanguage.CREATED_DATE,
            key: 'CreatedDate'
        },
        {
            title: commonLanguage.UPDATED_BY,
            key: 'UpdatedBy'
        },
        {
            title: commonLanguage.UPDATED_DATE,
            key: 'UpdatedDate'
        }
    ];
}

// Các field được hiển thị trên các modal
export function defaultFieldModal(language, commonLanguage) {
    return [
        {
            title: language.USER_CODE,
            key: 'User_Code'
        },
        {
            title: language.USER_NAME,
            key: 'User_Name'
        },
        {
            title: language.USER_EMAIL,
            key: 'User_Email'
        },
        {
            title: language.USER_PASSWORD,
            key: 'User_Password'
        },
        {
            title: language.USER_EMPLOYEE,
            key: 'User_Employee'
        },
        {
            title: language.USER_NUMBERPHONE,
            key: 'User_NumberPhone'
        },
        {
            title: commonLanguage.STATUS,
            key: 'Status'
        },
        {
            title: commonLanguage.CREATED_BY,
            key: 'CreatedBy'
        },
        {
            title: commonLanguage.CREATED_DATE,
            key: 'CreatedDate'
        },
        {
            title: commonLanguage.UPDATED_BY,
            key: 'UpdatedBy'
        },
        {
            title: commonLanguage.UPDATED_DATE,
            key: 'UpdatedDate'
        }
    ];
}

// Các giá trị mặc định cho khung tìm kiếm
export const searchDefaultModel = {
    User_Code: '',
    User_Name: '',
    User_Email: '',
    User_Employee: [],
    User_NumberPhone: '',
    CreatedBy: [],
    CreatedDate: [],
    UpdatedBy: [],
    UpdatedDate: [],
    Status: []
};

// Các giá trị mặc định cho Add/Clone
export const defaultValueModal = {
    _id: '',
    User_Code: '',
    User_Name: '',
    User_Email: '',
    User_Password: '',
    User_Employee: '',
    User_NumberPhone: '',
    CreatedBy: '',
    CreatedDate: '',
    UpdatedBy: '',
    UpdatedDate: '',
    Status: ''
};

// Lưu các giá trị tùy chọn sắp xếp cho bảng kết quả tìm kiếm
export function setFieldSort(values) {
    localStorage.setItem(fieldSortKeys, JSON.stringify(values));
}

// Lấy danh sách các field tùy chọn sắp xếp cho bảng kết quả tìm kiếm
export function getFieldSort() {
    const column = JSON.parse(localStorage.getItem(fieldSortKeys));
    if (column === null) {
        return ['User_Name'];
    }
    return column;
}

// Lưu các giá trị tùy chỉnh hiển thị trên khung tìm kiếm
export function setFieldSearch(values) {
    localStorage.setItem(fieldSearchKeys, JSON.stringify(values));
}

// Lấy danh sách các field trên khung tìm kiếm
export function getFieldSearch() {
    const column = JSON.parse(localStorage.getItem(fieldSearchKeys));
    if (column === null) {
        return ['User_Code', 'User_Name', 'Status'];
    }
    return column;
}

// Lưu các giá trị tùy chỉnh hiển thị cho bảng kết quả tìm kiếm
export function setColumnInSearchTable(values) {
    localStorage.setItem(fieldSearchResultKeys, JSON.stringify(values));
}

// Lấy danh sách các field cho bảng kết quả tìm kiếm
export function getColumnInSearchTable() {
    const column = JSON.parse(localStorage.getItem(fieldSearchResultKeys));
    //Trả về danh sách các cột mặc định nếu người dùng chưa thiết lập.
    if (column === null) {
        return ['User_Code', 'User_Name', 'User_Email', 'Status'];
    }
    return column;
}

// Lưu các giá trị tùy chỉnh hiển thị cho các modal
export function setFieldModal(values) {
    localStorage.setItem(fieldEditModalKeys, JSON.stringify(values));
}

// Lấy danh sách các field cho các modal
export function getFieldModal() {
    const column = JSON.parse(localStorage.getItem(fieldEditModalKeys));
    //Trả về danh sách các cột mặc định nếu người dùng chưa thiết lập.
    if (column === null) {
        return ['User_Code', 'User_Name', 'User_Password', 'User_Email', 'User_Employee', 'User_NumberPhone'];
    }
    return column;
}
