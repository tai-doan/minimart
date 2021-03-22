import { TNS_DISPLAY_AREA_KEY, TNS_METHOD, TNS_SCREEN } from '../../../../commons';

const cell = 'ant-table-cell-ellipsis';
const cell_hidden = 'ant-table-cell-ellipsis-hidden';

//#region Khai báo các key cho localStorage (tùy chọn hiển thị)
const fieldSortKeys = `${TNS_DISPLAY_AREA_KEY.sortFieldKeys}_${TNS_SCREEN.Customer}`;
const fieldSearchKeys = `${TNS_DISPLAY_AREA_KEY.searchFieldKeys}_${TNS_SCREEN.Customer}`;
const fieldSearchResultKeys = `${TNS_DISPLAY_AREA_KEY.searchResultFieldKeys}_${TNS_SCREEN.Customer}`;
const fieldModalKeys = `${TNS_DISPLAY_AREA_KEY.modalForm}_${TNS_SCREEN.Customer}`;
//#endregion

// Các field được hiển thị dưới bảng kết quả
export function defaultColumnInResultTable(language, commonLanguage, defaultColumn) {
    return [
        {
            width: 150,
            title: language.CUSTOMER_CODE,
            key: 'Customer_Code',
            dataIndex: 'Customer_Code',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Customer_Code') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.CUSTOMER_NAME,
            key: 'Customer_Name',
            dataIndex: 'Customer_Name',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Customer_Name') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.CUSTOMER_EMAIL,
            key: 'Customer_Email',
            dataIndex: 'Customer_Email',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Customer_Email') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.CUSTOMER_PHONE,
            key: 'Customer_Phone',
            dataIndex: 'Customer_Phone',
            align: 'center',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Customer_Phone') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.CUSTOMER_ADDRESS,
            key: 'Customer_Address',
            dataIndex: 'Customer_Address',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Customer_Address') ? cell : cell_hidden
        },
        {
            width: 300,
            title: language.CUSTOMER_DESCRIPTION,
            key: 'Customer_Description',
            dataIndex: 'Customer_Description',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Customer_Description') ? cell : cell_hidden
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
            title: language.CUSTOMER_CODE,
            key: 'Customer_Code'
        },
        {
            title: language.CUSTOMER_NAME,
            key: 'Customer_Name'
        },
        {
            title: language.CUSTOMER_EMAIL,
            key: 'Customer_Email'
        },
        {
            title: language.CUSTOMER_PHONE,
            key: 'Customer_Phone'
        },
        {
            title: language.CUSTOMER_ADDRESS,
            key: 'Customer_Address'
        },
        {
            title: language.CUSTOMER_DESCRIPTION,
            key: 'Customer_Description'
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
            title: language.CUSTOMER_CODE,
            key: 'Customer_Code'
        },
        {
            title: language.CUSTOMER_NAME,
            key: 'Customer_Name'
        },
        {
            title: language.CUSTOMER_EMAIL,
            key: 'Customer_Email'
        },
        {
            title: language.CUSTOMER_PHONE,
            key: 'Customer_Phone'
        },
        {
            title: language.CUSTOMER_ADDRESS,
            key: 'Customer_Address'
        },
        {
            title: language.CUSTOMER_DESCRIPTION,
            key: 'Customer_Description'
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
    Customer_Code: '',
    Customer_Name: '',
    Customer_Email: '',
    Customer_Phone: '',
    Customer_Address: '',
    Customer_Description: '',
    CreatedBy: [],
    CreatedDate: [],
    UpdatedBy: [],
    UpdatedDate: [],
    Status: []
};

// Các giá trị mặc định cho Add/Clone
export const defaultValueModal = {
    _id: '',
    Customer_Code: '',
    Customer_Name: '',
    Customer_Email: '',
    Customer_Phone: '',
    Customer_Address: '',
    Customer_Description: '',
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
        return ['Customer_Name'];
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
        return ['Customer_Code', 'Customer_Name', 'Status'];
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
        return ['Customer_Code', 'Customer_Name', 'Customer_Description', 'Status'];
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
        return ['Customer_Code', 'Customer_Name', 'Customer_Description', 'Status'];
    }
    return column;
}
