import { TNS_DISPLAY_AREA_KEY, TNS_METHOD, TNS_SCREEN } from '../../../../commons';

const cell = 'ant-table-cell-ellipsis';
const cell_hidden = 'ant-table-cell-ellipsis-hidden';

//#region Khai báo các key cho localStorage (tùy chọn hiển thị)
const fieldSortKeys = `${TNS_DISPLAY_AREA_KEY.sortFieldKeys}_${TNS_SCREEN.Branch}`;
const fieldSearchKeys = `${TNS_DISPLAY_AREA_KEY.searchFieldKeys}_${TNS_SCREEN.Branch}`;
const fieldSearchResultKeys = `${TNS_DISPLAY_AREA_KEY.searchResultFieldKeys}_${TNS_SCREEN.Branch}`;
const fieldModalKeys = `${TNS_DISPLAY_AREA_KEY.modalForm}_${TNS_SCREEN.Branch}`;
//#endregion

// Các field được hiển thị dưới bảng kết quả
export function defaultColumnInResultTable(language, commonLanguage, defaultColumn) {
    return [
        {
            width: 150,
            title: language.BRANCH_CODE,
            key: 'Branch_Code',
            dataIndex: 'Branch_Code',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Branch_Code') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.BRANCH_NAME,
            key: 'Branch_Name',
            dataIndex: 'Branch_Name',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Branch_Name') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.BRANCH_EMAIL,
            key: 'Branch_Email',
            dataIndex: 'Branch_Email',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Branch_Email') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.BRANCH_NUMBERPHONE,
            key: 'Branch_NumberPhone',
            dataIndex: 'Branch_NumberPhone',
            align: 'center',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Branch_NumberPhone') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.BRANCH_FAX,
            key: 'Branch_Fax',
            dataIndex: 'Branch_Fax',
            align: 'center',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Branch_Fax') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.BRANCH_TAX,
            key: 'Branch_Tax',
            dataIndex: 'Branch_Tax',
            align: 'center',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Branch_Tax') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.BRANCH_ADDRESS,
            key: 'Branch_Address',
            dataIndex: 'Branch_Address',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Branch_Address') ? cell : cell_hidden
        },
        {
            width: 300,
            title: language.BRANCH_DESCRIPTION,
            key: 'Branch_Description',
            dataIndex: 'Branch_Description',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Branch_Description') ? cell : cell_hidden
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
            title: language.BRANCH_CODE,
            key: 'Branch_Code'
        },
        {
            title: language.BRANCH_NAME,
            key: 'Branch_Name'
        },
        {
            title: language.BRANCH_EMAIL,
            key: 'Branch_Email'
        },
        {
            title: language.BRANCH_NUMBERPHONE,
            key: 'Branch_NumberPhone'
        },
        {
            title: language.BRANCH_FAX,
            key: 'Branch_Fax'
        },
        {
            title: language.BRANCH_TAX,
            key: 'Branch_Tax'
        },
        {
            title: language.BRANCH_ADDRESS,
            key: 'Branch_Address'
        },
        {
            title: language.BRANCH_DESCRIPTION,
            key: 'Branch_Description'
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
            title: language.BRANCH_CODE,
            key: 'Branch_Code'
        },
        {
            title: language.BRANCH_NAME,
            key: 'Branch_Name'
        },
        {
            title: language.BRANCH_EMAIL,
            key: 'Branch_Email'
        },
        {
            title: language.BRANCH_NUMBERPHONE,
            key: 'Branch_NumberPhone'
        },
        {
            title: language.BRANCH_FAX,
            key: 'Branch_Fax'
        },
        {
            title: language.BRANCH_TAX,
            key: 'Branch_Tax'
        },
        {
            title: language.BRANCH_ADDRESS,
            key: 'Branch_Address'
        },
        {
            title: language.BRANCH_DESCRIPTION,
            key: 'Branch_Description'
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
    Branch_Code: '',
    Branch_Name: '',
    Branch_Email: '',
    Branch_NumberPhone: '',
    Branch_Fax: '',
    Branch_Tax: '',
    Branch_Address: '',
    Branch_Description: '',
    CreatedBy: [],
    CreatedDate: [],
    UpdatedBy: [],
    UpdatedDate: [],
    Status: []
};

// Các giá trị mặc định cho Add/Clone
export const defaultValueModal = {
    _id: '',
    Branch_Code: '',
    Branch_Name: '',
    Branch_Email: '',
    Branch_NumberPhone: '',
    Branch_Fax: '',
    Branch_Tax: '',
    Branch_Address: '',
    Branch_Description: '',
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
        return ['Branch_Name'];
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
        return ['Branch_Code', 'Branch_Name', 'Status'];
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
        return ['Branch_Code', 'Branch_Name', 'Branch_Description', 'Status'];
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
        return ['Branch_Code', 'Branch_Name', 'Branch_Description', 'Status'];
    }
    return column;
}
