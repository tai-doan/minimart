import { TNS_DISPLAY_AREA_KEY, TNS_METHOD, TNS_SCREEN } from '../../../../commons';

const cell = 'ant-table-cell-ellipsis';
const cell_hidden = 'ant-table-cell-ellipsis-hidden';

//#region Khai báo các key cho localStorage (tùy chọn hiển thị)
const fieldSortKeys = `${TNS_DISPLAY_AREA_KEY.sortFieldKeys}_${TNS_SCREEN.Sell_MiniMart}`;
const fieldSearchKeys = `${TNS_DISPLAY_AREA_KEY.searchFieldKeys}_${TNS_SCREEN.Sell_MiniMart}`;
const fieldSearchResultKeys = `${TNS_DISPLAY_AREA_KEY.searchResultFieldKeys}_${TNS_SCREEN.Sell_MiniMart}`;
const fieldModalKeys = `${TNS_DISPLAY_AREA_KEY.modalForm}_${TNS_SCREEN.Sell_MiniMart}`;
//#endregion

// Các field được hiển thị dưới bảng kết quả
export function defaultColumnInResultTable(language, commonLanguage, defaultColumn) {
    return [
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_CODE,
            key: 'Sell_MiniMart_Header_Code',
            dataIndex: 'Sell_MiniMart_Header_Code',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_Code') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.SELL_MINIMART_HEADER_EMPLOYEE,
            key: 'Sell_MiniMart_Header_Employee',
            dataIndex: 'EmployeeObject',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_Employee') ? cell : cell_hidden,
            render: data => (
                !!data ? data.Employee_Name : null
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_DATE,
            key: 'Sell_MiniMart_Header_Date',
            dataIndex: 'Sell_MiniMart_Header_Date',
            align: 'center',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_Date') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.formatDMY(data)
            )
        },
        {
            width: 250,
            title: language.SELL_MINIMART_HEADER_CUSTOMER,
            key: 'Sell_MiniMart_Header_Customer',
            dataIndex: 'CustomerObject',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_Customer') ? cell : cell_hidden,
            render: data => (
                !!data ? data.Customer_Name : null
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_DELIVERY_METHOD,
            key: 'Sell_MiniMart_Header_DeliveryMethod',
            dataIndex: 'DeliveryObject',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_DeliveryMethod') ? cell : cell_hidden,
            render: data => (
                !!data ? data.Parameter_Name : null
            )
        },
        {
            width: 100,
            title: language.SELL_MINIMART_HEADER_TOTAL_QUANTITY,
            key: 'Sell_MiniMart_Header_TotalQuantity',
            dataIndex: 'Sell_MiniMart_Header_TotalQuantity',
            align: 'right',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_TotalQuantity') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_TOTAL_STOCK_PRICE,
            key: 'Sell_MiniMart_Header_TotalStockPrice',
            dataIndex: 'Sell_MiniMart_Header_TotalStockPrice',
            align: 'right',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_TotalStockPrice') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.convertCurrency(data)
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_TOTAL_SELL_PRICE,
            key: 'Sell_MiniMart_Header_TotalSellPrice',
            dataIndex: 'Sell_MiniMart_Header_TotalSellPrice',
            align: 'right',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_TotalSellPrice') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.convertCurrency(data)
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_DISCOUNT,
            key: 'Sell_MiniMart_Header_Discount',
            dataIndex: 'Sell_MiniMart_Header_Discount',
            align: 'right',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_Discount') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.convertCurrency(data)
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_FEE,
            key: 'Sell_MiniMart_Header_Fee',
            dataIndex: 'Sell_MiniMart_Header_Fee',
            align: 'right',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_Fee') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.convertCurrency(data)
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_VAT,
            key: 'Sell_MiniMart_Header_Vat',
            // dataIndex: 'Sell_MiniMart_Header_Vat',
            align: 'right',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_Vat') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.convertCurrency((data.Sell_MiniMart_Header_TotalSellPrice - data.Sell_MiniMart_Header_Discount) * data.Sell_MiniMart_Header_Vat)
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_TOTAL_PRICE,
            key: 'Sell_MiniMart_Header_TotalPrice',
            dataIndex: 'Sell_MiniMart_Header_TotalPrice',
            align: 'right',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_TotalPrice') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.convertCurrency(data)
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_PAIDAMOUNT,
            key: 'Sell_MiniMart_Header_PaidAmount',
            dataIndex: 'Sell_MiniMart_Header_PaidAmount',
            align: 'right',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_PaidAmount') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.convertCurrency(data)
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_PAIDREMAIN,
            key: 'Sell_MiniMart_Header_PaidRemain',
            dataIndex: 'Sell_MiniMart_Header_PaidRemain',
            align: 'right',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_PaidRemain') ? cell : cell_hidden,
            render: data => (
                TNS_METHOD.convertCurrency(data)
            )
        },
        {
            width: 150,
            title: language.SELL_MINIMART_HEADER_PAYMENT_METHOD,
            key: 'Sell_MiniMart_Header_PaymentMethod',
            dataIndex: 'PaymentObject',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_PaymentMethod') ? cell : cell_hidden,
            render: data => (
                !!data ? data.Parameter_Name : null
            )
        },
        {
            width: 300,
            title: language.SELL_MINIMART_HEADER_NOTE,
            key: 'Sell_MiniMart_Header_Note',
            dataIndex: 'Sell_MiniMart_Header_Note',
            align: 'left',
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Sell_MiniMart_Header_Note') ? cell : cell_hidden
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
            title: language.SELL_MINIMART_HEADER_CODE,
            key: 'Sell_MiniMart_Header_Code'
        },
        {
            title: language.SELL_MINIMART_HEADER_EMPLOYEE,
            key: 'Sell_MiniMart_Header_Employee'
        },
        {
            title: language.SELL_MINIMART_HEADER_DATE,
            key: 'Sell_MiniMart_Header_Date'
        },
        {
            title: language.SELL_MINIMART_HEADER_CUSTOMER,
            key: 'Sell_MiniMart_Header_Customer'
        },
        {
            title: language.SELL_MINIMART_HEADER_DELIVERY_METHOD,
            key: 'Sell_MiniMart_Header_DeliveryMethod'
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_QUANTITY,
            key: 'Sell_MiniMart_Header_TotalQuantity'
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_STOCK_PRICE,
            key: 'Sell_MiniMart_Header_TotalStockPrice'
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_SELL_PRICE,
            key: 'Sell_MiniMart_Header_TotalSellPrice'
        },
        {
            title: language.SELL_MINIMART_HEADER_DISCOUNT,
            key: 'Sell_MiniMart_Header_Discount'
        },
        {
            title: language.SELL_MINIMART_HEADER_VAT,
            key: 'Sell_MiniMart_Header_Vat'
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_PRICE,
            key: 'Sell_MiniMart_Header_TotalPrice'
        },
        {
            title: language.SELL_MINIMART_HEADER_PAIDAMOUNT,
            key: 'Sell_MiniMart_Header_PaidAmount'
        },
        {
            title: language.SELL_MINIMART_HEADER_PAIDREMAIN,
            key: 'Sell_MiniMart_Header_PaidRemain'
        },
        {
            title: language.SELL_MINIMART_HEADER_PAYMENT_METHOD,
            key: 'Sell_MiniMart_Header_PaymentMethod'
        },
        {
            title: language.SELL_MINIMART_HEADER_NOTE,
            key: 'Sell_MiniMart_Header_Note'
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
            title: language.SELL_MINIMART_HEADER_CODE,
            key: 'Sell_MiniMart_Header_Code'
        },
        {
            title: language.SELL_MINIMART_HEADER_EMPLOYEE,
            key: 'Sell_MiniMart_Header_Employee'
        },
        {
            title: language.SELL_MINIMART_HEADER_DATE,
            key: 'Sell_MiniMart_Header_Date'
        },
        {
            title: language.SELL_MINIMART_HEADER_CUSTOMER,
            key: 'Sell_MiniMart_Header_Customer'
        },
        {
            title: language.SELL_MINIMART_HEADER_DELIVERY_METHOD,
            key: 'Sell_MiniMart_Header_DeliveryMethod'
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_QUANTITY,
            key: 'Sell_MiniMart_Header_TotalQuantity'
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_STOCK_PRICE,
            key: 'Sell_MiniMart_Header_TotalStockPrice'
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_SELL_PRICE,
            key: 'Sell_MiniMart_Header_TotalSellPrice'
        },
        {
            title: language.SELL_MINIMART_HEADER_DISCOUNT,
            key: 'Sell_MiniMart_Header_Discount'
        },
        {
            title: language.SELL_MINIMART_HEADER_VAT,
            key: 'Sell_MiniMart_Header_Vat'
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_PRICE,
            key: 'Sell_MiniMart_Header_TotalPrice'
        },
        {
            title: language.SELL_MINIMART_HEADER_PAIDAMOUNT,
            key: 'Sell_MiniMart_Header_PaidAmount'
        },
        {
            title: language.SELL_MINIMART_HEADER_PAIDREMAIN,
            key: 'Sell_MiniMart_Header_PaidRemain'
        },
        {
            title: language.SELL_MINIMART_HEADER_PAYMENT_METHOD,
            key: 'Sell_MiniMart_Header_PaymentMethod'
        },
        {
            title: language.SELL_MINIMART_HEADER_NOTE,
            key: 'Sell_MiniMart_Header_Note'
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
    Sell_MiniMart_Header_Code: '',
    Sell_MiniMart_Header_Employee: [],
    Sell_MiniMart_Header_Date: [],
    Sell_MiniMart_Header_Customer: [],
    Sell_MiniMart_Header_DeliveryMethod: [],
    Sell_MiniMart_Header_TotalQuantity: null,
    Sell_MiniMart_Header_TotalStockPrice: null,
    Sell_MiniMart_Header_TotalSellPrice: null,
    Sell_MiniMart_Header_Discount: null,
    Sell_MiniMart_Header_Fee: null,
    Sell_MiniMart_Header_Vat: null,
    Sell_MiniMart_Header_TotalPrice: null,
    Sell_MiniMart_Header_PaidAmount: null,
    Sell_MiniMart_Header_PaidRemain: null,
    Sell_MiniMart_Header_PaymentMethod: [],
    Sell_MiniMart_Header_Note: '',
    CreatedBy: [],
    CreatedDate: [],
    UpdatedBy: [],
    UpdatedDate: [],
    Status: []
};

// Các giá trị mặc định cho Add/Clone
export const defaultValueModal = {
    _id: '',
    Sell_MiniMart_Header_Code: '',
    Sell_MiniMart_Header_Name: '',
    Sell_MiniMart_Header_Parent: '',
    Sell_MiniMart_Header_Description: '',
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
        return ['Sell_MiniMart_Header_Code'];
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
        return ['Sell_MiniMart_Header_Code', 'Sell_MiniMart_Header_Employee', 'Sell_MiniMart_Header_Date'];
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
        return ['Sell_MiniMart_Header_Code', 'Sell_MiniMart_Header_Employee', 'Sell_MiniMart_Header_Date', 'Status'];
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
        return ['Sell_MiniMart_Header_Code', 'Sell_MiniMart_Header_Name', 'Sell_MiniMart_Header_Description', 'Status'];
    }
    return column;
}
