import { Popconfirm } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { TNS_DISPLAY_AREA_KEY, TNS_METHOD, TNS_SCREEN } from '../../../../commons';

const cell = 'ant-table-cell-ellipsis';
const cell_hidden = 'ant-table-cell-ellipsis-hidden';

const fieldResultKeys = `${TNS_DISPLAY_AREA_KEY.detailModalKeys}_${TNS_SCREEN.Sell_MiniMart}`;

export function defaultColumnInResultTableSelected(language, commonLanguage, defaultColumn, onDelete) {
    return [
        {
            width: 50,
            title: '',
            key: 'delete',
            dataIndex: 'delete',
            align: 'center',
            fixed: 'left',
            editable: false,
            className: cell,
            render: (_, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record._id)}>
                    <DeleteTwoTone twoToneColor="red" />
                </Popconfirm>
            )
        },
        {
            width: 150,
            title: language.PRODUCT_CODE,
            key: 'Product_Code',
            dataIndex: 'Product_Code',
            align: 'left',
            editable: false,
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Product_Code') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.PRODUCT_NAME,
            key: 'Product_Name',
            dataIndex: 'Product_Name',
            align: 'left',
            editable: false,
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Product_Name') ? cell : cell_hidden
        },
        {
            width: 200,
            title: language.PRODUCT_CATEGORY,
            key: 'Product_Category',
            dataIndex: 'Product_CategoryObject',
            align: 'left',
            editable: false,
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Product_Category') ? cell : cell_hidden,
            render: data => (
                !!data ? data.Product_Category_Name : null
            )
        },
        {
            width: 150,
            title: language.PRODUCT_STOCKPRICE,
            key: 'Product_StockPrice',
            dataIndex: 'Product_StockPrice',
            align: 'right',
            editable: false,
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Product_StockPrice') ? cell : cell_hidden,
            render: data => (TNS_METHOD.convertCurrency(data))
        },
        {
            width: 150,
            title: language.PRODUCT_SALEPRICE,
            key: 'Product_SalePrice',
            dataIndex: 'Product_SalePrice',
            align: 'right',
            editable: false,
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Product_SalePrice') ? cell : cell_hidden,
            render: data => (TNS_METHOD.convertCurrency(data))
        },
        {
            width: 100,
            title: language.PRODUCT_QUANTITY,
            key: 'Product_Quantity',
            dataIndex: 'Product_Quantity',
            align: 'right',
            fixed: 'right',
            type: 'number',
            editable: true,
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Product_Quantity') ? cell : cell_hidden
        },
        {
            width: 120,
            title: language.PRODUCT_DISCOUNT,
            key: 'Product_Discount',
            dataIndex: 'Product_Discount',
            align: 'right',
            fixed: 'right',
            type: 'number',
            editable: true,
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Product_Discount') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.PRODUCT_TOTALPRICE,
            key: 'Product_TotalPrice',
            align: 'right',
            fixed: 'right',
            editable: false,
            ellipsis: { showTitle: true },
            className: defaultColumn.includes('Product_TotalPrice') ? cell : cell_hidden,
            render: data => (TNS_METHOD.convertCurrency((data.Product_SalePrice - data.Product_Discount) * data.Product_Quantity))
        }
    ];
}

export function defaultColumnInResultTableView(language, defaultColumn){
    return [
        {
            width: 150,
            title: language.PRODUCT_CODE,
            key: 'Product_Code',
            dataIndex: 'Product_Code',
            align: 'left',
            editable: false,
            ellipsis: { showTitle: true },
            // className: defaultColumn.includes('Product_Code') ? cell : cell_hidden
        },
        {
            width: 250,
            title: language.PRODUCT_NAME,
            key: 'Product_Name',
            dataIndex: 'Product_Name',
            align: 'left',
            editable: false,
            ellipsis: { showTitle: true },
            // className: defaultColumn.includes('Product_Name') ? cell : cell_hidden
        },
        {
            width: 200,
            title: language.PRODUCT_CATEGORY,
            key: 'Product_Category',
            dataIndex: 'Product_CategoryObject',
            align: 'left',
            editable: false,
            ellipsis: { showTitle: true },
            // className: defaultColumn.includes('Product_Category') ? cell : cell_hidden,
            render: data => (
                !!data ? data.Product_Category_Name : null
            )
        },
        {
            width: 150,
            title: language.PRODUCT_STOCKPRICE,
            key: 'Product_StockPrice',
            dataIndex: 'Product_StockPrice',
            align: 'right',
            editable: false,
            ellipsis: { showTitle: true },
            // className: defaultColumn.includes('Product_StockPrice') ? cell : cell_hidden,
            render: data => (TNS_METHOD.convertCurrency(data))
        },
        {
            width: 150,
            title: language.PRODUCT_SALEPRICE,
            key: 'Product_SalePrice',
            dataIndex: 'Product_SalePrice',
            align: 'right',
            editable: false,
            ellipsis: { showTitle: true },
            // className: defaultColumn.includes('Product_SalePrice') ? cell : cell_hidden,
            render: data => (TNS_METHOD.convertCurrency(data))
        },
        {
            width: 100,
            title: language.PRODUCT_QUANTITY,
            key: 'Product_Quantity',
            dataIndex: 'Product_Quantity',
            align: 'right',
            type: 'number',
            editable: true,
            ellipsis: { showTitle: true },
            // className: defaultColumn.includes('Product_Quantity') ? cell : cell_hidden
        },
        {
            width: 120,
            title: language.PRODUCT_DISCOUNT,
            key: 'Product_Discount',
            dataIndex: 'Product_Discount',
            align: 'right',
            type: 'number',
            editable: true,
            ellipsis: { showTitle: true },
            // className: defaultColumn.includes('Product_Discount') ? cell : cell_hidden
        },
        {
            width: 150,
            title: language.PRODUCT_TOTALPRICE,
            key: 'Product_TotalPrice',
            align: 'right',
            editable: false,
            ellipsis: { showTitle: true },
            // className: defaultColumn.includes('Product_TotalPrice') ? cell : cell_hidden,
            render: data => (TNS_METHOD.convertCurrency((data.Product_SalePrice - data.Product_Discount) * data.Product_Quantity))
        }
    ];
}

export function defaultFieldDetail(language) {
    return [
        {
            title: language.PRODUCT_CODE,
            key: 'Product_Code'
        },
        {
            title: language.PRODUCT_NAME,
            key: 'Product_Name'
        },
        {
            title: language.PRODUCT_CATEGORY,
            key: 'Product_Category'
        },
        {
            title: language.PRODUCT_STOCKPRICE,
            key: 'Product_StockPrice'
        },
        {
            title: language.PRODUCT_SALEPRICE,
            key: 'Product_SalePrice'
        },
        {
            title: language.PRODUCT_QUANTITY,
            key: 'Product_Quantity'
        },
        {
            title: language.PRODUCT_TOTALPRICE,
            key: 'Product_TotalPrice'
        }
    ];
}

// Lưu các giá trị tùy chỉnh hiển thị cho bảng kết quả tìm kiếm
export function setFieldInTable(values) {
    localStorage.setItem(fieldResultKeys, JSON.stringify(values));
}

// Lấy danh sách các field cho bảng kết quả tìm kiếm
export function getFieldInTable() {
    const column = JSON.parse(localStorage.getItem(fieldResultKeys));
    //Trả về danh sách các cột mặc định nếu người dùng chưa thiết lập.
    if (column === null) {
        return ['Product_Code', 'Product_Name', 'Product_Category', 'Product_StockPrice', 'Product_SalePrice', 'Product_Discount', 'Product_Quantity', 'Product_TotalPrice'];
    }
    return column;
}
