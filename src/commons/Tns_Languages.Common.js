import React from 'react';
import {
    SettingOutlined,
    CodepenOutlined,
    ShopOutlined
} from '@ant-design/icons';

// Dùng cho hiển thị menu/breadcum/...
const TNS_LANGUAGE_LAYOUT = {
    vi: {
        System: <span className='tns-menu-icon'><SettingOutlined /><span>Hệ thống</span></span>,
        Product: <span className='tns-menu-icon'><CodepenOutlined /><span>Sản phẩm</span></span>,
        MiniMart: <span className='tns-menu-icon'><ShopOutlined /><span>Bán hàng</span></span>
    },
    en: {
        System: <span className='tns-menu-icon'><SettingOutlined /><span>System</span></span>,
        Product: <span className='tns-menu-icon'><CodepenOutlined /><span>Product</span></span>,
        MiniMart: <span className='tns-menu-icon'><ShopOutlined /><span>Mini Mart</span></span>
    }
};

// Dùng chung cho các components
const TNS_LANGUAGE_COMPONENTS = {
    vi: {
        SEARCH: 'Tìm kiếm',
        NEW: 'Thêm mới',
        CLONE: 'Sao chép',
        EDIT: 'Chỉnh sửa',
        VIEW: 'Xem',
        DELETE: 'Xóa',

        SAVE: 'Lưu',
        CANCEL: 'Hủy',
        CLOSE: 'Đóng',
        BACK: 'Quay lại',
        DRAFT: 'Lưu nháp',
        PAYMENT: 'Thanh toán',
        PAYMENT_PRINT: 'Thanh toán và In',

        STATUS: 'Trạng thái',
        CREATED_BY: 'Người tạo',
        CREATED_DATE: 'Ngày tạo',
        UPDATED_BY: 'Người cập nhật',
        UPDATED_DATE: 'Ngày cập nhật',
        SEARCH_INFOR: 'Thông tin tìm kiếm'
    },
    en: {
        SEARCH: 'Search',
        NEW: 'Add new',
        CLONE: 'Clone',
        EDIT: 'Edit',
        VIEW: 'View',
        DELETE: 'Delete',

        SAVE: 'Save',
        CANCEL: 'Cancel',
        CLOSE: 'Close',
        BACK: 'Back',

        STATUS: 'Status',
        CREATED_BY: 'Created by',
        CREATED_DATE: 'Created date',
        UPDATED_BY: 'Updated by',
        UPDATED_DATE: 'Updated date',
        SEARCH_INFOR: 'Search information'
    }
};

export {
    TNS_LANGUAGE_LAYOUT,
    TNS_LANGUAGE_COMPONENTS
};
