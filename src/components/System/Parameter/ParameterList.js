import React, { useState } from 'react';
import jsonQuery from 'json-query';
import { Layout, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Tns_Breadcum } from '../../../layouts';
import { TNS_MODULE, TNS_METHOD, TNS_MODE, TNS_RESULT_CODE, TNS_NOTICATION_TYPE, TNS_LANGUAGE_COMPONENTS } from '../../../commons/index';
import { Tns_ResultTable, Tns_DisplayFieldOnSearchScreen } from '../../Tns_Controls/index';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { Parameter_Service } from './Services/Parameter.Services';
import { getColumnInSearchTable, defaultColumnInResultTable, defaultFieldInSearchForm, setColumnInSearchTable, getFieldSearch, setFieldSearch, getFieldSort, setFieldSort, searchDefaultModel } from './Models/Parameter.Models';
import { Parameter_Search } from './ParameterSearch';
import { ParameterAddClone } from './ParameterAddClone';
import { ParameterEditView } from './ParameterEditView';

const { Content } = Layout;
const { confirm } = Modal;

const ParameterList = () => {
    const mainLanguage = ['vi', 'en'];
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;
    const columns = defaultColumnInResultTable(language, commonLanguage, getColumnInSearchTable());
    const columnSearchForm = defaultFieldInSearchForm(language, commonLanguage);

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
        Promise.all([Parameter_Service.searchData(value, !!option ? option : searchOption)]).then(searchResult => {
            if (searchResult[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                const DataTable = jsonQuery('data[0]', { data: searchResult }).value;
                const newOption = { ...searchOption };
                newOption.limit = searchResult[0].data.limit;
                newOption.page = searchResult[0].data.page;
                setDataTable(DataTable);
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

    const onDelete = () => {
        if (selectedModel.length === 0) {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Không có dữ liệu', 'Không có dữ liệu nào được chọn để xóa');
        } else {
            const IdList = jsonQuery('[_id]', { data: selectedModel }).value;
            onDeleteConfirm('Bạn có chắc muốn xóa các dữ liệu này!', 'Sau khi xóa sẽ không thể phục hồi', IdList);
        }
    };

    const onDeleteConfirm = (title, content, IdList) => {
        confirm({
            title,
            content,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                return Promise.all([Parameter_Service.deleteModel(IdList)]).then(resultDelete => {
                    if (resultDelete[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                        TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.SUCCESS, 'Xử lý hoàn tất', 'Các dữ liệu đã được xóa thành công');
                        onSearch();
                    } else {
                        TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'Có lỗi', 'Dữ liệu được chọn có lỗi, vui lòng tải lại trang và xóa lại');
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

    return (
        <Layout style={{ padding: 20 }}>
            <Tns_Breadcum module={TNS_MODULE.SYSTEM} screen={language.PARAMETER_SEARCH_PAGE} mainLanguage={mainLanguage} />
            <Content className='site-layout-background'>
                <Parameter_Search searchField={fieldOnSearchForm}
                    value={searchModel}
                    mainLanguage={mainLanguage}
                    onChange={onSearchChange}
                    onSearch={onSearchForm}
                />
                <span className='main-screen-button-area'>
                    <Button type='primary' onClick={onSearch}>{commonLanguage.SEARCH}</Button>

                    <ParameterAddClone allowAccess={true}
                        actionLabel={commonLanguage.NEW}
                        mode={TNS_MODE.Add}
                        onSave={onSearch}
                        mainLanguage={mainLanguage}
                        value={selectedModel} />

                    <ParameterAddClone allowAccess={true}
                        actionLabel={commonLanguage.CLONE}
                        mode={TNS_MODE.Clone}
                        onSave={onSearch}
                        mainLanguage={mainLanguage}
                        value={selectedModel} />

                    <ParameterEditView allowAccess={true}
                        actionLabel={commonLanguage.EDIT}
                        mode={TNS_MODE.Edit}
                        onSave={onSearch}
                        mainLanguage={mainLanguage}
                        value={selectedModel} />

                    <ParameterEditView allowAccess={true}
                        actionLabel={commonLanguage.VIEW}
                        mode={TNS_MODE.View}
                        onSave={onSearch}
                        mainLanguage={mainLanguage}
                        value={selectedModel} />

                    <Button type='primary' onClick={onDelete}>{commonLanguage.DELETE}</Button>

                    <Tns_DisplayFieldOnSearchScreen mainLanguage={mainLanguage}
                        className='product-search-screen'
                        columns={columns}
                        searchColumns={columnSearchForm}
                        searchResultColumns={columnSearchForm}
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

export { ParameterList as default };
