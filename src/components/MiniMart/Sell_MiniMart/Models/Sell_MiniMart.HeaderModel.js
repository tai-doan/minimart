import { TNS_DISPLAY_AREA_KEY, TNS_SCREEN } from '../../../../commons';

const cell = 'ant-table-cell-ellipsis';
const cell_hidden = 'ant-table-cell-ellipsis-hidden';
const fieldHeaderKeys = `${TNS_DISPLAY_AREA_KEY.headerModalKeys}_${TNS_SCREEN.Sell_MiniMart}`;

export function defaultColumnInHeader(language, defaultColumn) {
    return [
        {
            title: language.SELL_MINIMART_HEADER_EMPLOYEE,
            key: 'Sell_MiniMart_Header_Employee',
            className: defaultColumn.includes('Sell_MiniMart_Header_Employee') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_DATE,
            key: 'Sell_MiniMart_Header_Date',
            className: defaultColumn.includes('Sell_MiniMart_Header_Date') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_CUSTOMER,
            key: 'Sell_MiniMart_Header_Customer',
            className: defaultColumn.includes('Sell_MiniMart_Header_Customer') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_DELIVERY_METHOD,
            key: 'Sell_MiniMart_Header_DeliveryMethod',
            className: defaultColumn.includes('Sell_MiniMart_Header_DeliveryMethod') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_QUANTITY,
            key: 'Sell_MiniMart_Header_TotalQuantity',
            className: defaultColumn.includes('Sell_MiniMart_Header_TotalQuantity') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_SELL_PRICE,
            key: 'Sell_MiniMart_Header_TotalSellPrice',
            className: defaultColumn.includes('Sell_MiniMart_Header_TotalSellPrice') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_STOCK_PRICE,
            key: 'Sell_MiniMart_Header_TotalStockPrice',
            className: defaultColumn.includes('Sell_MiniMart_Header_TotalStockPrice') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_DISCOUNT,
            key: 'Sell_MiniMart_Header_Discount',
            className: defaultColumn.includes('Sell_MiniMart_Header_Discount') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_FEE,
            key: 'Sell_MiniMart_Header_Fee',
            className: defaultColumn.includes('Sell_MiniMart_Header_Fee') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_VAT,
            key: 'Sell_MiniMart_Header_Vat',
            className: defaultColumn.includes('Sell_MiniMart_Header_Vat') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_TOTAL_PRICE,
            key: 'Sell_MiniMart_Header_TotalPrice',
            className: defaultColumn.includes('Sell_MiniMart_Header_TotalPrice') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_PAIDAMOUNT,
            key: 'Sell_MiniMart_Header_PaidAmount',
            className: defaultColumn.includes('Sell_MiniMart_Header_PaidAmount') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_PAIDREMAIN,
            key: 'Sell_MiniMart_Header_PaidRemain',
            className: defaultColumn.includes('Sell_MiniMart_Header_PaidRemain') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_PAYMENT_METHOD,
            key: 'Sell_MiniMart_Header_PaymentMethod',
            className: defaultColumn.includes('Sell_MiniMart_Header_PaymentMethod') ? cell : cell_hidden
        },
        {
            title: language.SELL_MINIMART_HEADER_NOTE,
            key: 'Sell_MiniMart_Header_Note',
            className: defaultColumn.includes('Sell_MiniMart_Header_Note') ? cell : cell_hidden
        }
    ];
}

// Các giá trị mặc định cho khung nhập liệu
export const defaultHeaderModel = {
    Sell_MiniMart_Header_Employee: '',
    Sell_MiniMart_Header_Date: '',
    Sell_MiniMart_Header_Customer: '',
    Sell_MiniMart_Header_DeliveryMethod: 'delivery_false',
    Sell_MiniMart_Header_TotalQuantity: 0,
    Sell_MiniMart_Header_TotalSellPrice: 0,
    Sell_MiniMart_Header_TotalStockPrice: 0,
    Sell_MiniMart_Header_Discount: 0,
    Sell_MiniMart_Header_Fee: 0,
    Sell_MiniMart_Header_Vat: 0,
    Sell_MiniMart_Header_TotalPrice: 0,
    Sell_MiniMart_Header_PaidAmount: 0,
    Sell_MiniMart_Header_PaidRemain: 0,
    Sell_MiniMart_Header_PaymentMethod: 'cash',
    Sell_MiniMart_Header_Note: '',
    Status: ''
};

// Lưu các giá trị tùy chọn sắp xếp cho bảng kết quả tìm kiếm
export function setFieldHeader(values) {
    localStorage.setItem(fieldHeaderKeys, JSON.stringify(values));
}

// Lấy danh sách các field tùy chọn sắp xếp cho bảng kết quả tìm kiếm
export function getFieldHeader() {
    const column = JSON.parse(localStorage.getItem(fieldHeaderKeys));
    if (column === null) {
        return ['Sell_MiniMart_Header_Employee', 'Sell_MiniMart_Header_Date', 'Sell_MiniMart_Header_Customer', 'Sell_MiniMart_Header_DeliveryMethod',
            'Sell_MiniMart_Header_TotalQuantity', 'Sell_MiniMart_Header_TotalSellPrice', 'Sell_MiniMart_Header_Discount', 'Sell_MiniMart_Header_Fee',
            'Sell_MiniMart_Header_Vat', 'Sell_MiniMart_Header_TotalPrice', 'Sell_MiniMart_Header_PaidAmount', 'Sell_MiniMart_Header_PaidRemain'];
    }
    return column;
};
