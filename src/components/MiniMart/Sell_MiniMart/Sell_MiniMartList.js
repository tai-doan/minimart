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

    // G???i ch???y khi nh???n t??m ki???m
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

    // G???i ch???y khi ho??n th??nh c??c t??c v??? add, edit, delete ????? c???p nh???t gi?? tr??? m???i v??o table
    const onSearch = () => {
        onSearchForm(searchModel);
    };

    const onSearchChange = value => {
        setSearchModel(value);
    };

    const onCancel = () => {
        if (selectedModel.length === 0) {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Kh??ng c?? d??? li???u', 'Kh??ng c?? d??? li???u n??o ???????c ch???n ????? h???y');
        } else {
            const IdList = jsonQuery('[_id]', { data: selectedModel }).value;
            onCancelConfirm('B???n c?? ch???c mu???n h???y c??c d??? li???u n??y!', 'Sau khi h???y s??? kh??ng th??? ph???c h???i', IdList);
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
                        TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.SUCCESS, 'X??? l?? ho??n t???t', 'C??c d??? li???u ???? ???????c h???y th??nh c??ng');
                        onSearch();
                    } else {
                        TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'C?? l???i', 'D??? li???u ???????c ch???n c?? l???i, vui l??ng t???i l???i trang v?? h???y l???i');
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
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'C?? l???i', 'Ch??? ch???n 1 d??ng d??? li???u ????? sao ch??p');
        } else {
            if (selectedModel.length === 0) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'C?? l???i', 'Kh??ng c?? d??? li???u ????? sao ch??p');
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
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'C?? l???i', 'Ch??? ch???n 1 d??ng d??? li???u ????? ch???nh s???a');
        } else {
            if (selectedModel.length === 0) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'C?? l???i', 'Kh??ng c?? d??? li???u ????? ch???nh s???a');
            } else {
                if (selectedModel[0].Status !== TNS_MINIMART_STATUS.DRAFT) {
                    TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'C?? l???i', 'Kh??ng th??? ch???nh s???a h??a ????n ???? thanh to??n');
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
