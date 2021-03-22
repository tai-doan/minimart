import { TNS_DISPLAY_AREA_KEY, TNS_METHOD, TNS_SCREEN } from '../../../../commons';

const cell = 'ant-table-cell-ellipsis';
const cell_hidden = 'ant-table-cell-ellipsis-hidden';

//#region Khai báo các key cho localStorage (tùy chọn hiển thị)
const fieldSortKeys = `${TNS_DISPLAY_AREA_KEY.sortFieldKeys}_${TNS_SCREEN.Employee}`;
const fieldSearchKeys = `${TNS_DISPLAY_AREA_KEY.searchFieldKeys}_${TNS_SCREEN.Employee}`;
const fieldSearchResultKeys = `${TNS_DISPLAY_AREA_KEY.searchResultFieldKeys}_${TNS_SCREEN.Employee}`;
const fieldModalKeys = `${TNS_DISPLAY_AREA_KEY.modalForm}_${TNS_SCREEN.Employee}`;
//#endregion

// Các field được hiển thị dưới bảng kết quả
export function defaultColumnInResultTable(language, commonLanguage, defaultColumn) {
    return [
        {
            width: 150,
            title: language.EMPLOYEE_CODE,
            key: 'Employee_Code',
            dataIndex: 'Employee_Code',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Employee_Code') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.EMPLOYEE_NAME,
            key: 'Employee_Name',
            dataIndex: 'Employee_Name',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Employee_Name') ? cell : cell_hidden
        },
        {
            width: 200,
            title: language.EMPLOYEE_BRANCH,
            key: 'Employee_Branch',
            dataIndex: 'BranchObject',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Employee_Branch') ? cell : cell_hidden,
            render: data => (
                !!data ? data.Branch_Name : null
            )
        },
        {
            width: 150,
            title: language.EMPLOYEE_EMAIL,
            key: 'Employee_Email',
            dataIndex: 'Employee_Email',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Employee_Email') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.EMPLOYEE_NUMBERPHONE,
            key: 'Employee_NumberPhone',
            dataIndex: 'Employee_NumberPhone',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Employee_NumberPhone') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.EMPLOYEE_PASSPORT,
            key: 'Employee_Passport',
            dataIndex: 'Employee_Passport',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Employee_Passport') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.EMPLOYEE_BIRTHDAY,
            key: 'Employee_BirthDay',
            dataIndex: 'Employee_BirthDay',
            align: 'center',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Employee_BirthDay') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.formatDMY(data)
            )
        },
        {
            width: 250,
            title: language.EMPLOYEE_ADDRESS,
            key: 'Employee_Address',
            dataIndex: 'Employee_Address',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Employee_Address') ? cell : cell_hidden
        },
        {
            width: 300,
            title: language.EMPLOYEE_DESCRIPTION,
            key: 'Employee_Description',
            dataIndex: 'Employee_Description',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Employee_Description') ? cell : cell_hidden
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
            title: language.EMPLOYEE_CODE,
            key: 'Employee_Code'
        },
        {
            title: language.EMPLOYEE_NAME,
            key: 'Employee_Name'
        },
        {
            title: language.EMPLOYEE_BRANCH,
            key: 'Employee_Branch'
        },
        {
            title: language.EMPLOYEE_EMAIL,
            key: 'Employee_Email'
        },
        {
            title: language.EMPLOYEE_NUMBERPHONE,
            key: 'Employee_NumberPhone'
        },
        {
            title: language.EMPLOYEE_PASSPORT,
            key: 'Employee_Passport'
        },
        {
            title: language.EMPLOYEE_ADDRESS,
            key: 'Employee_Address'
        },
        {
            title: language.EMPLOYEE_DESCRIPTION,
            key: 'Employee_Description'
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
            title: language.EMPLOYEE_CODE,
            key: 'Employee_Code'
        },
        {
            title: language.EMPLOYEE_NAME,
            key: 'Employee_Name'
        },
        {
            title: language.EMPLOYEE_BRANCH,
            key: 'Employee_Branch'
        },
        {
            title: language.EMPLOYEE_EMAIL,
            key: 'Employee_Email'
        },
        {
            title: language.EMPLOYEE_NUMBERPHONE,
            key: 'Employee_NumberPhone'
        },
        {
            title: language.EMPLOYEE_PASSPORT,
            key: 'Employee_Passport'
        },
        {
            title: language.EMPLOYEE_BIRTHDAY,
            key: 'Employee_BirthDay'
        },
        {
            title: language.EMPLOYEE_ADDRESS,
            key: 'Employee_Address'
        },
        {
            title: language.EMPLOYEE_DESCRIPTION,
            key: 'Employee_Description'
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
    Employee_Code: '',
    Employee_Name: '',
    Employee_Branch: [],
    Employee_Email: '',
    Employee_NumberPhone: '',
    Employee_Passport: '',
    Employee_BirthDay: [],
    Employee_Address: '',
    Employee_Description: '',
    CreatedBy: [],
    CreatedDate: [],
    UpdatedBy: [],
    UpdatedDate: [],
    Status: []
};

// Các giá trị mặc định cho Add/Clone
export const defaultValueModal = {
    _id: '',
    Employee_Code: '',
    Employee_Name: '',
    Employee_Branch: '',
    Employee_Email: '',
    Employee_NumberPhone: '',
    Employee_Passport: '',
    Employee_BirthDay: '',
    Employee_Address: '',
    Employee_Description: '',
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
        return ['Employee_Name'];
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
        return ['Employee_Code', 'Employee_Name', 'Status'];
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
        return ['Employee_Code', 'Employee_Name', 'Employee_Description', 'Status'];
    }
    return column;
}

// Lưu các giá trị tùy chỉnh hiển thị cho các modal
export function setFieldModal(values) {
    localStorage.setItem(fieldModalKeys, JSON.stringify(values));
}

// Lấy danh sách các field cho các modal
export function getFieldModal() {
    const column = JSON.parse(localStorage.getItem(fieldModalKeys));
    //Trả về danh sách các cột mặc định nếu người dùng chưa thiết lập.
    if (column === null) {
        return ['Employee_Code', 'Employee_Name', 'Employee_Description', 'Status'];
    }
    return column;
}
