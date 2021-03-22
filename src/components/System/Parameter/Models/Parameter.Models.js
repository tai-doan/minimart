import { TNS_DISPLAY_AREA_KEY, TNS_METHOD, TNS_SCREEN } from '../../../../commons';

const cell = 'ant-table-cell-ellipsis';
const cell_hidden = 'ant-table-cell-ellipsis-hidden';

//#region Khai báo các key cho localStorage (tùy chọn hiển thị)
const fieldSortKeys = `${TNS_DISPLAY_AREA_KEY.sortFieldKeys}_${TNS_SCREEN.Parameter}`;
const fieldSearchKeys = `${TNS_DISPLAY_AREA_KEY.searchFieldKeys}_${TNS_SCREEN.Parameter}`;
const fieldSearchResultKeys = `${TNS_DISPLAY_AREA_KEY.searchResultFieldKeys}_${TNS_SCREEN.Parameter}`;
const fieldEditModalKeys = `${TNS_DISPLAY_AREA_KEY.modalForm}_${TNS_SCREEN.Parameter}`;
//#endregion

// Các field được hiển thị dưới bảng kết quả
export function defaultColumnInResultTable(language, commonLanguage, defaultColumn) {
    return [
        {
            width: 150,
            title: language.PARAMETER_CODE,
            key: 'Parameter_Code',
            dataIndex: 'Parameter_Code',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Parameter_Code') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.PARAMETER_NAME,
            key: 'Parameter_Name',
            dataIndex: 'Parameter_Name',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Parameter_Name') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.PARAMETER_TYPE,
            key: 'Parameter_Type',
            dataIndex: 'Parameter_Type',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Parameter_Type') ? cell : cell_hidden
        },
        {
            width: 300,
            title: language.PARAMETER_DESCRIPTION,
            key: 'Parameter_Description',
            dataIndex: 'Parameter_Description',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Parameter_Description') ? cell : cell_hidden
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
            title: language.PARAMETER_CODE,
            key: 'Parameter_Code'
        },
        {
            title: language.PARAMETER_NAME,
            key: 'Parameter_Name'
        },
        {
            title: language.PARAMETER_TYPE,
            key: 'Parameter_Type'
        },
        {
            title: language.PARAMETER_DESCRIPTION,
            key: 'Parameter_Description'
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
            title: language.PARAMETER_CODE,
            key: 'Parameter_Code'
        },
        {
            title: language.PARAMETER_NAME,
            key: 'Parameter_Name'
        },
        {
            title: language.PARAMETER_TYPE,
            key: 'Parameter_Type'
        },
        {
            title: language.PARAMETER_DESCRIPTION,
            key: 'Parameter_Description'
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
    Parameter_Code: '',
    Parameter_Name: '',
    Parameter_Type: '',
    Parameter_Description: '',
    CreatedBy: [],
    CreatedDate: [],
    UpdatedBy: [],
    UpdatedDate: [],
    Status: []
};

// Các giá trị mặc định cho Add/Clone
export const defaultValueModal = {
    _id: '',
    Parameter_Code: '',
    Parameter_Name: '',
    Parameter_Type: '',
    Parameter_Description: '',
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
        return ['Parameter_Name'];
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
        return ['Parameter_Code', 'Parameter_Name', 'Status'];
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
        return ['Parameter_Code', 'Parameter_Name', 'Parameter_Description', 'Status'];
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
        return ['Parameter_Code', 'Parameter_Name', 'Parameter_Description', 'Status'];
    }
    return column;
}
