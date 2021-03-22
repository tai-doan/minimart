const TNS_MODULE = {
    COMPANY : 'Company',
    SYSTEM: 'System',
    PRODUCT: 'Product',
    MINIMART: 'MiniMart'

}

const TNS_SCREEN = {
    User: 'User',
    Parameter: 'Parameter',
    Product: 'Product',
    Product_Category: 'ProductCategory',
    Branch: 'Branch',
    Customer: 'Customer',
    Employee: 'Employee',
    MiniMart: 'MiniMart',
    Sell_MiniMart: 'Sell_MiniMart'
};

const TNS_MODE = {
    Add: 'Add',
    Clone: 'Clone',
    Edit: 'Edit',
    View: 'View'
};

const TNS_RESULT_CODE = {
    SUCCESS: 1,
    ERROR: -1,
    DATA_EXISTS: -2
};

const TNS_NOTICATION_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    WARN: 'warn',
    INFO: 'info',
    OPEN: 'open'
};

const TNS_DISPLAY_AREA_KEY = {
    sortFieldKeys: 'sortFieldKeys',
    searchFieldKeys: 'searchFieldKeys',
    searchResultFieldKeys: 'searchResultFieldKeys',
    modalForm: 'modalFormKeys',
    modalFormDetail: 'modalFormDetailKeys',
    addForm: 'addFormFieldKeys',
    addFormDetail: 'addFormDetailFieldKeys',
    editForm: 'editFormFieldKeys',
    editFormDetail: 'editFormDetailFieldKeys',
    viewForm: 'viewFormFieldKeys',
    viewFormDetail: 'viewFormDetailFieldKeys',
    headerModalKeys: 'headerModalFieldKeys',
    detailModalKeys: 'detailModalFieldKeys'
};

const TNS_DISPLAY_AREA_STORAGE = {
    sortType: 'changeSortType',
    sortField: 'sortFieldKeys',
    searchField: 'searchFieldKeys',
    searchResult: 'searchResultKeys',
    modalField: 'fieldOnModalFormKeys',
    addField: 'fieldOnAddFormKeys',
    editField: 'fieldOnEditFormKeys',
    viewField: 'fieldOnViewFormKeys',
    detailModalKeys: 'detailModalFieldKeys'
};

const ITEM_LAYOUT = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
    }
};

const TNS_MINIMART_STATUS = {
    DRAFT: 'draft',
    COMPLETE: 'complete'
};

export {
    TNS_MODULE,
    TNS_SCREEN,
    TNS_MODE,
    TNS_RESULT_CODE,
    TNS_NOTICATION_TYPE,
    TNS_DISPLAY_AREA_KEY,
    TNS_DISPLAY_AREA_STORAGE,
    ITEM_LAYOUT,
    TNS_MINIMART_STATUS
};
