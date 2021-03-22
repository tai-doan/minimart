import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import jsonQuery from 'json-query';
import { Layout, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Tns_Breadcum } from '../../../layouts';
import { TNS_MODULE, TNS_METHOD, TNS_MODE, TNS_RESULT_CODE, TNS_NOTICATION_TYPE, TNS_LANGUAGE_COMPONENTS, TNS_MINIMART_STATUS } from '../../../commons';
import { Tns_ResultTable, Tns_DisplayFieldOnSearchScreen } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { Sell_MiniMart_Header_Service } from './Services/Sell_MiniMart.Services';
import { getColumnInSearchTable, defaultColumnInResultTable, defaultFieldInSearchForm, setColumnInSearchTable, getFieldSearch, setFieldSearch, getFieldSort, setFieldSort, searchDefaultModel } from './Models/Sell_MiniMart.Models';
import { Sell_MiniMart_Header_Search } from './Sell_MiniMartSearch';
import { Sell_MiniMartView } from './Sell_MiniMartView';

const { Content } = Layout;
const { confirm } = Modal;

const Sell_MiniMartList = () => {
    const mainLanguage = ['vi', 'en'];
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;
    const columns = defaultColumnInResultTable(language, commonLanguage, getColumnInSearchTable());
    const columnSearchForm = defaultFieldInSearchForm(language, commonLanguage);
    const history = useHistory();

    const [fieldOnSearchResult, setFieldOnSearchResult] = useState(getColumnInSearchTable());
    const [fieldOnSearchForm, setFieldOnSearchForm] = useState(getFieldSearch());
    const [selectedModel, setSelectedModel] = useState([]);
    const [searchModel, setSearchModel] = useState(searchDefaultModel);
    const [dataTable, setDataTable] = useState([]);
    const [searchOption, setSearchOption] = useState({
        page: 1,
        limit: 10,
        sortFields: getFieldSort(),
        sortAsc: true
    });

    // Gọi chạy khi nhấn tìm kiếm
    const onSearchForm = (value, option) => {
        setSearchModel(value);
        Promise.all([Sell_MiniMart_Header_Service.searchData(value, !!option ? option : searchOption)]).then(searchResult => {
            if (searchResult[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                const data = jsonQuery('data[0]', { data: searchResult }).value;
                const newOption = { ...searchOption };
                newOption.limit = searchResult[0].data.limit;
                newOption.page = searchResult[0].data.page;
                setDataTable(data);
                setSearchOption(newOption);
            }
        });
    };

    // Gọi chạy khi hoàn thành các tác vụ add, edit, delete để cập nhật giá trị mới vào table
    const onSearch = () => {
        onSearchForm(searchModel);
    };

    const onSearchChange = value => {
        setSearchModel(value);
    };

    const onCancel = () => {
        if (selectedModel.length === 0) {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Không có dữ liệu', 'Không có dữ liệu nào được chọn để hủy');
        } else {
            const IdList = jsonQuery('[_id]', { data: selectedModel }).value;
            onCancelConfirm('Bạn có chắc muốn hủy các dữ liệu này!', 'Sau khi hủy sẽ không thể phục hồi', IdList);
        }
    };

    const onCancelConfirm = (title, content, IdList) => {
        confirm({
            title,
            content,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                return Promise.all([Sell_MiniMart_Header_Service.cancelData(IdList)]).then(resultDelete => {
                    if (resultDelete[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                        TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.SUCCESS, 'Xử lý hoàn tất', 'Các dữ liệu đã được hủy thành công');
                        onSearch();
                    } else {
                        TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'Có lỗi', 'Dữ liệu được chọn có lỗi, vui lòng tải lại trang và hủy lại');
                    }
                });
            },
            onCancel() {
                // console.log('cancel');
            }
        });
    };

    // Gọi chạy khi chuyển trang
    const onPaginationChange = (page, size) => {
        const newOption = { ...searchOption };
        newOption.page = page;
        newOption.limit = size;
        setSearchOption(newOption);
        onSearchForm(searchModel, newOption);
    };

    // Gọi chạy khi chỉnh sửa số lượng hiển thị record trên trang
    const onSizeChange = (page, size) => {
        const newOption = { ...searchOption };
        newOption.page = page;
        newOption.limit = size;
        setSearchOption(newOption);
        onSearchForm(searchModel, newOption);
    };

    // Gọi chạy khi select các record trên table
    const onSelectedChange = row => {
        setSelectedModel(row);
    };

    //#region Tùy chỉnh điều kiện hiển thị cho trang
    const onSortTypeChange = value => {
        const newOption = { ...searchOption };
        newOption.sortAsc = value;
        setSearchOption(newOption);
    };

    const onSortFieldChange = value => {
        const newOption = { ...searchOption };
        newOption.sortFields = value;
        setSearchOption(newOption);
        setFieldSort(value);
    };

    const onSearchFieldChange = value => {
        setFieldOnSearchForm(value);
        setFieldSearch(value);
    };

    const onSearchResultFieldChange = value => {
        setColumnInSearchTable(value);
        setFieldOnSearchResult(value);
    };
    //#endregion

    const onAdd = () => {
        history.push({
            pathname: 'Sell_MiniMartAdd',
            state: {
                mode: TNS_MODE.Add,
                mainLanguage
            }
        });
    };

    const onClone = () => {
        if (selectedModel.length > 1) {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Chỉ chọn 1 dòng dữ liệu để sao chép');
        } else {
            if (selectedModel.length === 0) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Không có dữ liệu để sao chép');
            } else {
                history.push({
                    pathname: 'Sell_MiniMartAdd',
                    state: {
                        mode: TNS_MODE.Clone,
                        code: selectedModel[0].Sell_MiniMart_Header_Code,
                        id: selectedModel[0]._id,
                        mainLanguage
                    }
                });
            }
        }
    };

    const onEdit = () => {
        if (selectedModel.length > 1) {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Chỉ chọn 1 dòng dữ liệu để chỉnh sửa');
        } else {
            if (selectedModel.length === 0) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Không có dữ liệu để chỉnh sửa');
            } else {
                if (selectedModel[0].Status !== TNS_MINIMART_STATUS.DRAFT) {
                    TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Không thể chỉnh sửa hóa đơn đã thanh toán');
                } else {
                    history.push({
                        pathname: 'Sell_MiniMartEdit',
                        state: {
                            mode: TNS_MODE.Edit,
                            code: selectedModel[0].Sell_MiniMart_Header_Code,
                            id: selectedModel[0]._id,
                            mainLanguage
                        }
                    });
                }
            }
        }
    };

    return (
        <Layout style={{ padding: 20 }}>
            <Tns_Breadcum module={TNS_MODULE.MINIMART} screen={language.SELL_MINIMART_HEADER_SEARCH_PAGE} mainLanguage={mainLanguage} />
            <Content className='site-layout-background'>
                <Sell_MiniMart_Header_Search searchField={fieldOnSearchForm}
                    value={searchModel}
                    mainLanguage={mainLanguage}
                    onChange={onSearchChange}
                    onSearch={onSearchForm}
                />
                <span className='main-screen-button-area'>
                    <Button type='primary' onClick={onSearch}>{commonLanguage.SEARCH}</Button>

                    <Button type='primary' onClick={onAdd}>{commonLanguage.NEW}</Button>

                    <Button type='primary' onClick={onClone}>{commonLanguage.CLONE}</Button>

                    <Button type='primary' onClick={onEdit}>{commonLanguage.EDIT}</Button>

                    <Sell_MiniMartView allowAccess={true}
                        actionLabel={commonLanguage.VIEW}
                        mainLanguage={mainLanguage}
                        value={selectedModel} />

                    <Button type='primary' onClick={onCancel}>{commonLanguage.CANCEL}</Button>

                    <Tns_DisplayFieldOnSearchScreen mainLanguage={mainLanguage}
                        className='product-search-screen'
                        columns={columns}
                        searchColumns={columnSearchForm}
                        searchResultColumns={columns}
                        sortType={searchOption.sortAsc}
                        sortField={searchOption.sortFields}
                        searchField={fieldOnSearchForm}
                        searchResultField={fieldOnSearchResult}
                        sortTypeChange={onSortTypeChange}
                        sortFieldChange={onSortFieldChange}
                        searchFieldChange={onSearchFieldChange}
                        searchResultFieldChange={onSearchResultFieldChange}
                    />
                </span>

                <Tns_ResultTable data={dataTable}
                    columns={columns}
                    hiddenSelection={false}
                    keys={1}
                    rowKey={'_id'}
                    currentPage={searchOption.page}
                    onPaginationChange={onPaginationChange}
                    onSizeChange={onSizeChange}
                    onSelectedChange={onSelectedChange}
                />
            </Content>
        </Layout>
    );
};

export { Sell_MiniMartList as default };
