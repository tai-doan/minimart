import React, { useState } from 'react';
import jsonQuery from 'json-query';
import { Form, Input, Row, Col, Collapse, InputNumber, Select } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { TNS_METHOD, ITEM_LAYOUT, TNS_LANGUAGE_COMPONENTS } from '../../../commons';
import { Tns_DateRangePickers, Tns_InputNumber } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { Sell_MiniMart_Header_CodeAutocomplete } from './Controls/Sell_MiniMart.Autocomplete';
import { Parameter_Select } from '../../System/Parameter/Controls/Parameter.Select';
import { User_Select } from '../../System/User/Controls/User.Select';
import { Employee_Select } from '../../Company/Employee/Controls/Employee.Select';
import { Customer_Select } from '../../Company/Customer/Controls/Customer.Select';

const { Panel } = Collapse;
const { Option } = Select;

const Sell_MiniMart_Header_Search = ({ searchField, value, mainLanguage, onChange, onSearch }) => {
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
    const onCodeChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_Code = values;
        formChange(valueChange);
    };

    const onEmployeeChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_Employee = values;
        formChange(valueChange);
    };

    const onDateChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_Date = values;
        formChange(valueChange);
    };

    const onCustomerChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_Customer = values;
        formChange(valueChange);
    };

    const onDeliveryChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_DeliveryMethod = values;
        formChange(valueChange);
    };

    const onQuantityChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_TotalQuantity = values;
        formChange(valueChange);
    };

    const onStockPriceChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_TotalStockPrice = values;
        formChange(valueChange);
    };

    const onSellPriceChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_TotalSellPrice = values;
        formChange(valueChange);
    };

    const onDiscountChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_Discount = values;
        formChange(valueChange);
    };

    const onVATChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_Vat = values;
        formChange(valueChange);
    };

    const onTotalPriceChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_TotalPrice = values;
        formChange(valueChange);
    };

    const onPaidAmountChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_PaidAmount = values;
        formChange(valueChange);
    };

    const onPaidRemainChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_PaidRemain = values;
        formChange(valueChange);
    };

    const onPaymentChange = values => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_PaymentMethod = values;
        formChange(valueChange);
    };

    const onNoteChange = e => {
        const valueChange = { ...value };
        valueChange.Sell_MiniMart_Header_Note = e.target.value;
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
                            <Sell_MiniMart_Header_CodeAutocomplete label={language.SELL_MINIMART_HEADER_CODE}
                                allowClear={true}
                                name='Sell_MiniMart_Header_Code'
                                value={searchValue.Sell_MiniMart_Header_Code}
                                onSelect={onCodeChange}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_Code')}`}
                            />

                            <Employee_Select mode='multiple'
                                allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_Employee')}`}
                                label={language.SELL_MINIMART_HEADER_EMPLOYEE}
                                value={searchValue.Sell_MiniMart_Header_Employee}
                                onChange={onEmployeeChange}
                            />

                            <Tns_DateRangePickers className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_Date')}`}
                                name='Sell_MiniMart_Header_Date'
                                label={language.SELL_MINIMART_HEADER_DATE}
                                value={searchValue.Sell_MiniMart_Header_Date}
                                onChange={onDateChange}
                            />

                            <Customer_Select mode='multiple'
                                allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_Customer')}`}
                                label={language.SELL_MINIMART_HEADER_CUSTOMER}
                                value={searchValue.Sell_MiniMart_Header_Customer}
                                onChange={onCustomerChange}
                            />

                            <Parameter_Select type={'delivery'} mode='multiple'
                                allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_DeliveryMethod')}`}
                                label={language.SELL_MINIMART_HEADER_DELIVERY_METHOD}
                                value={searchValue.Sell_MiniMart_Header_DeliveryMethod}
                                onChange={onDeliveryChange}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_TotalQuantity')}`}>
                                <Form.Item name='Sell_MiniMart_Header_TotalQuantity'
                                    label={language.SELL_MINIMART_HEADER_TOTAL_QUANTITY}
                                >
                                    <InputNumber allowClear={true}
                                        style={{ width: '100%' }}
                                        min={0}
                                        value={searchValue.Sell_MiniMart_Header_TotalQuantity}
                                        onChange={onQuantityChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Tns_InputNumber
                                min={0}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_TotalStockPrice')}`}
                                name='Sell_MiniMart_Header_TotalStockPrice'
                                label={language.SELL_MINIMART_HEADER_TOTAL_STOCK_PRICE}
                                value={searchValue.Sell_MiniMart_Header_TotalStockPrice}
                                onChange={onStockPriceChange}
                            />

                            <Tns_InputNumber
                                min={0}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_TotalSellPrice')}`}
                                name='Sell_MiniMart_Header_TotalSellPrice'
                                label={language.SELL_MINIMART_HEADER_TOTAL_SELL_PRICE}
                                value={searchValue.Sell_MiniMart_Header_TotalSellPrice}
                                onChange={onSellPriceChange}
                            />

                            <Tns_InputNumber
                                min={0}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_Discount')}`}
                                name='Sell_MiniMart_Header_Discount'
                                label={language.SELL_MINIMART_HEADER_DISCOUNT}
                                value={searchValue.Sell_MiniMart_Header_Discount}
                                onChange={onDiscountChange}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_Vat')}`}>
                                <Form.Item name='Sell_MiniMart_Header_Vat'
                                    label={language.SELL_MINIMART_HEADER_VAT}
                                >
                                    <Select optionFilterProp='children'
                                        onChange={onVATChange}
                                    >
                                        <Option key='0' value={null}></Option>
                                        <Option key='5' value={0.05}>5%</Option>
                                        <Option key='10' value={0.1}>10%</Option>
                                        <Option key='15' value={0.15}>15%</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Tns_InputNumber
                                min={0}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_TotalPrice')}`}
                                name='Sell_MiniMart_Header_TotalPrice'
                                label={language.SELL_MINIMART_HEADER_TOTAL_PRICE}
                                value={searchValue.Sell_MiniMart_Header_TotalPrice}
                                onChange={onTotalPriceChange}
                            />

                            <Tns_InputNumber
                                min={0}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_PaidAmount')}`}
                                name='Sell_MiniMart_Header_PaidAmount'
                                label={language.SELL_MINIMART_HEADER_PAIDAMOUNT}
                                value={searchValue.Sell_MiniMart_Header_PaidAmount}
                                onChange={onPaidAmountChange}
                            />

                            <Tns_InputNumber
                                min={0}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_PaidRemain')}`}
                                name='Sell_MiniMart_Header_PaidRemain'
                                label={language.SELL_MINIMART_HEADER_PAIDREMAIN}
                                value={searchValue.Sell_MiniMart_Header_PaidRemain}
                                onChange={onPaidRemainChange}
                            />

                            <Parameter_Select type={'payment'} mode='multiple'
                                allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_PaymentMethod')}`}
                                label={language.SELL_MINIMART_HEADER_PAYMENT_METHOD}
                                value={searchValue.Sell_MiniMart_Header_PaymentMethod}
                                onChange={onPaymentChange}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Sell_MiniMart_Header_Note')}`}>
                                <Form.Item name='Sell_MiniMart_Header_Note'
                                    label={language.SELL_MINIMART_HEADER_NOTE}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Sell_MiniMart_Header_Note}
                                        onChange={onNoteChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Parameter_Select type={'status'} mode='multiple'
                                allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Status')}`}
                                label={commonLanguage.STATUS}
                                value={searchValue.Status}
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

export { Sell_MiniMart_Header_Search };
