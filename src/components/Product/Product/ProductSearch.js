import React, { useState } from 'react';
import jsonQuery from 'json-query';
import { Form, Input, Row, Col, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { TNS_METHOD, ITEM_LAYOUT, TNS_LANGUAGE_COMPONENTS } from '../../../commons';
import { Tns_DateRangePickers } from '../../Tns_Controls/Tns_DateRangePickers/Tns_DateRangePickers';
import { Tns_InputNumber } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { Product_CodeAutocomplete } from './Controls/Product_Code.Autocomplete';
import { Product_SizeSelectMultiple } from './Controls/Product_SizeSelectMultiple';
import { Parameter_Select } from '../../System/Parameter/Controls/Parameter.Select';
import { Product_Category_Select } from '../Product_Category/Controls/Product_Category.Select';
import { User_Select } from '../../System/User/Controls/User.Select';

const { Panel } = Collapse;

const Product_Search = ({ searchField, value, mainLanguage, onChange, onSearch }) => {
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState(value);
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;

    //#region lưu và chuyển các giá trị trong form sang components chính sau khi ngừng thao tác 0.5s
    let timeChange = null;
    const formChange = values => {
        if (timeChange !== null) {
            clearTimeout(timeChange);
        }
        timeChange = setTimeout(() => {
            setSearchValue(values);
            onChange(values);
        }, 500); // <== 500 milisecond === 0.5s sau khi nhập/chọn thì 0.5s sau sẽ chuyển giá trị qua components chính
    };
    //#endregion

    //#region Các sự kiện nhập form
    const onProductCodeSelect = values => {
        const valueChange = { ...value };
        valueChange.Product_Code = values;
        formChange(valueChange);
    };

    const onProductNameChange = e => {
        const valueChange = { ...value };
        valueChange.Product_Name = e.target.value;
        formChange(valueChange);
    };

    const onStockPriceChange = values => {
        const valueChange = { ...value };
        valueChange.Product_StockPrice = values;
        formChange(valueChange);
    };

    const onSalePriceChange = values => {
        const valueChange = { ...value };
        valueChange.Product_SalePrice = values;
        formChange(valueChange);
    };

    const onCategoryChange = values => {
        const valueChange = { ...value };
        valueChange.Product_Category = values;
        formChange(valueChange);
    };

    const onSizeChange = values => {
        const valueChange = { ...value };
        valueChange.Product_Size = values;
        formChange(valueChange);
    };

    const onDescriptionChange = e => {
        const valueChange = { ...value };
        valueChange.Product_Description = e.target.value;
        formChange(valueChange);
    };

    const onStatusChange = values => {
        const valueChange = { ...value };
        valueChange.Status = values;
        formChange(valueChange);
    };

    const onCreatedByChange = values => {
        const valueChange = { ...value };
        valueChange.CreatedBy = values;
        formChange(valueChange);
    };

    const onCreatedDateChange = values => {
        const valueChange = { ...value };
        valueChange.CreatedDate = values;
        formChange(valueChange);
    };

    const onUpdatedByChange = values => {
        const valueChange = { ...value };
        valueChange.UpdatedBy = values;
        formChange(valueChange);
    };

    const onUpdatedDateChange = values => {
        const valueChange = { ...value };
        valueChange.UpdatedDate = values;
        formChange(valueChange);
    };
    //#endregion

    const onEnter = e => {
        if (e.keyCode === 13) {
            onSearch(searchValue);
        }
    };

    return (
        <span>
            <Form {...ITEM_LAYOUT}
                form={form}
                name='product_search'
                labelAlign='left'
                onFinish={onSearch}
                onKeyDown={onEnter}
            >
                <Collapse defaultActiveKey={['1']} expandIconPosition='right' expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                    <Panel header={commonLanguage.SEARCH_INFOR} key='1'>
                        <Row gutter={[16, 0]}>
                            <Product_CodeAutocomplete label={language.PRODUCT_CODE}
                                allowClear={true}
                                name='Product_Code'
                                value={searchValue.Product_Code}
                                onSelect={onProductCodeSelect}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Product_Code')}`}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Product_Name')}`}>
                                <Form.Item name='Product_Name'
                                    label={language.PRODUCT_NAME}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Product_Name}
                                        onChange={onProductNameChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Tns_InputNumber className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Product_StockPrice')}`}
                                name='Product_StockPrice'
                                require={true}
                                min={0}
                                value={searchValue.Product_StockPrice}
                                label={language.PRODUCT_STOCKPRICE}
                                onChange={onStockPriceChange}
                            />

                            <Tns_InputNumber className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Product_SalePrice')}`}
                                name='Product_SalePrice'
                                require={true}
                                min={0}
                                value={searchValue.Product_SalePrice}
                                label={language.PRODUCT_SALEPRICE}
                                onChange={onSalePriceChange}
                            />

                            <Product_Category_Select mode='multiple'
                                allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Product_Category')}`}
                                label={language.PRODUCT_CATEGORY}
                                value={value.Product_Category}
                                onChange={onCategoryChange}
                            />

                            <Product_SizeSelectMultiple
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Product_Size')}`}
                                label={language.PRODUCT_SIZE}
                                value={searchValue.Product_Size}
                                onChange={onSizeChange}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Product_Description')}`}>
                                <Form.Item name='Product_Description'
                                    label={language.PRODUCT_DESCRIPTION}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Product_Description}
                                        onChange={onDescriptionChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Parameter_Select type={'status'} mode='multiple'
                                allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Status')}`}
                                label={commonLanguage.STATUS}
                                value={value.Status}
                                onChange={onStatusChange}
                            />

                            <User_Select allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'CreatedBy')}`}
                                name='CreatedBy'
                                mode='multiple'
                                label={commonLanguage.CREATED_BY}
                                value={searchValue.CreatedBy}
                                onChange={onCreatedByChange}
                            />

                            <Tns_DateRangePickers className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'CreatedDate')}`}
                                name='CreatedDate'
                                label={commonLanguage.CREATED_DATE}
                                value={searchValue.CreatedDate}
                                onChange={onCreatedDateChange}
                            />

                            <User_Select allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'UpdatedBy')}`}
                                name='UpdatedBy'
                                mode='multiple'
                                label={commonLanguage.UPDATED_BY}
                                value={searchValue.UpdatedBy}
                                onChange={onUpdatedByChange}
                            />

                            <Tns_DateRangePickers className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'UpdatedDate')}`}
                                name='UpdatedDate'
                                label={commonLanguage.UPDATED_DATE}
                                value={searchValue.UpdatedDate}
                                onChange={onUpdatedDateChange}
                            />
                        </Row>
                    </Panel>
                </Collapse>
            </Form>
        </span>
    );
};

export { Product_Search };
