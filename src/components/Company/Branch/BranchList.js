import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import jsonQuery from 'json-query';
import { Layout, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Tns_Breadcum } from '../../../layouts';
import { TNS_MODULE, TNS_METHOD, TNS_MODE, TNS_RESULT_CODE, TNS_NOTICATION_TYPE, TNS_LANGUAGE_COMPONENTS } from '../../../commons';
import { Tns_ResultTable, Tns_DisplayFieldOnSearchScreen } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { Branch_Service } from './Services/Branch.Services';
import { getColumnInSearchTable, defaultColumnInResultTable, defaultFieldInSearchForm, setColumnInSearchTable, getFieldSearch, setFieldSearch, getFieldSort, setFieldSort, searchDefaultModel } from './Models/Branch.Models';
import { Branch_Search } from './BranchSearch';
import { BranchAddClone } from './BranchAddClone';
import { BranchEditView } from './BranchEditView';

const { Content } = Layout;
const { confirm } = Modal;

const BranchList = () => {
    const { t } = useTranslation()
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

    useEffect(() => {
        onSearch()
    }, [])

    // G???i ch???y khi nh???n t??m ki???m
    const onSearchForm = (value, option) => {
        setSearchModel(value);
        Promise.all([Branch_Service.searchData(value, !!option ? option : searchOption)]).then(searchResult => {
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

    // G???i ch???y khi ho??n th??nh c??c t??c v??? add, edit, delete ????? c???p nh???t gi?? tr??? m???i v??o table
    const onSearch = () => {
        onSearchForm(searchModel);
    };

    const onSearchChange = value => {
        setSearchModel(value);
    };

    const onDelete = () => {
        if (selectedModel.length === 0) {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Kh??ng c?? d??? li???u', 'Kh??ng c?? d??? li???u n??o ???????c ch???n ????? x??a');
        } else {
            const IdList = jsonQuery('[_id]', { data: selectedModel }).value;
            onDeleteConfirm('B???n c?? ch???c mu???n x??a c??c d??? li???u n??y!', 'Sau khi x??a s??? kh??ng th??? ph???c h???i', IdList);
        }
    };

    const onDeleteConfirm = (title, content, IdList) => {
        confirm({
            title,
            content,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                return Promise.all([Branch_Service.deleteModel(IdList)]).then(resultDelete => {
                    if (resultDelete[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                        TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.SUCCESS, 'X??? l?? ho??n t???t', 'C??c d??? li???u ???? ???????c x??a th??nh c??ng');
                        onSearch();
                    } else {
                        TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'C?? l???i', 'D??? li???u ???????c ch???n c?? l???i, vui l??ng t???i l???i trang v?? x??a l???i');
                    }
                });
            },
            onCancel() {
                // console.log('cancel');
            }
        });
    };

    // G???i ch???y khi chuy???n trang
    const onPaginationChange = (page, size) => {
        const newOption = { ...searchOption };
        newOption.page = page;
        newOption.limit = size;
        setSearchOption(newOption);
        onSearchForm(searchModel, newOption);
    };

    // G???i ch???y khi ch???nh s???a s??? l?????ng hi???n th??? record tr??n trang
    const onSizeChange = (page, size) => {
        const newOption = { ...searchOption };
        newOption.page = page;
        newOption.limit = size;
        setSearchOption(newOption);
        onSearchForm(searchModel, newOption);
    };

    // G???i ch???y khi select c??c record tr??n table
    const onSelectedChange = row => {
        setSelectedModel(row);
    };

    //#region T??y ch???nh ??i???u ki???n hi???n th??? cho trang
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
            <Tns_Breadcum module={TNS_MODULE.COMPANY} screen={language.BRANCH_SEARCH_PAGE} mainLanguage={mainLanguage} />
            <Content className='site-layout-background'>
                <Branch_Search searchField={fieldOnSearchForm}
                    value={searchModel}
                    mainLanguage={mainLanguage}
                    onChange={onSearchChange}
                    onSearch={onSearchForm}
                />
                <span className='main-screen-button-area'>
                    <Button type='primary' onClick={onSearch}>{commonLanguage.SEARCH}</Button>

                    <BranchAddClone allowAccess={true}
                        actionLabel={commonLanguage.NEW}
                        mode={TNS_MODE.Add}
                        onSave={onSearch}
                        mainLanguage={mainLanguage}
                        value={selectedModel} />

                    <BranchAddClone allowAccess={true}
                        actionLabel={commonLanguage.CLONE}
                        mode={TNS_MODE.Clone}
                        onSave={onSearch}
                        mainLanguage={mainLanguage}
                        value={selectedModel} />

                    <BranchEditView allowAccess={true}
                        actionLabel={commonLanguage.EDIT}
                        mode={TNS_MODE.Edit}
                        onSave={onSearch}
                        mainLanguage={mainLanguage}
                        value={selectedModel} />

                    <BranchEditView allowAccess={true}
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

export { BranchList as default };
