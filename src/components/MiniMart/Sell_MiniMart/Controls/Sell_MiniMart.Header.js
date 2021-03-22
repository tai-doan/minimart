import React, { useState, useEffect } from 'react';
import { Form, Input, Row, Col, Card, Select, InputNumber, Button } from 'antd';
import { Tns_DatePickers, Tns_InputNumber } from '../../../Tns_Controls';
import { ITEM_LAYOUT, TNS_MODE } from '../../../../commons/Tns_Constant.Common';

import { Employee_Select } from '../../../Company/Employee/Controls/Employee.Select';
import { Customer_Select } from '../../../Company/Customer/Controls/Customer.Select';
import { Parameter_Select } from '../../../System/Parameter/Controls/Parameter.Select';

const { Option } = Select;
const { TextArea } = Input;

const Sell_MiniMart_Header = ({ value, mode, language, commonLanguage, onChange, onPayment, onPaymentPrint }) => {
    const [form] = Form.useForm();
    const [defaultModel, setDefaultModel] = useState(value);
    let timeChange = null;

    useEffect(() => {
        form.setFieldsValue(value);
        setDefaultModel(value);
    }, [value]);

    const headerChange = values => {
        clearTimeout(timeChange);
        timeChange = setTimeout(() => {
            onChange({ ...defaultModel, ...values });
        }, 500); //0.5s sau sẽ gửi dữ liệu mới sang component cha
    };

    const onCustomerChange = values => {
        headerChange({ Sell_MiniMart_Header_Customer: values });
    };

    const onDeliveryMethodChange = values => {
        headerChange({ Sell_MiniMart_Header_DeliveryMethod: values });
    };

    const onVATChange = values => {
        headerChange({
            Sell_MiniMart_Header_Vat: values,
            Sell_MiniMart_Header_TotalPrice: (values !== 0) ? Math.floor((defaultModel.Sell_MiniMart_Header_TotalSellPrice - defaultModel.Sell_MiniMart_Header_Discount) * (1 + values)) : Math.floor(defaultModel.Sell_MiniMart_Header_TotalSellPrice - defaultModel.Sell_MiniMart_Header_Discount),
            Sell_MiniMart_Header_PaidRemain: ((values !== 0) ? Math.floor((defaultModel.Sell_MiniMart_Header_TotalSellPrice - defaultModel.Sell_MiniMart_Header_Discount) * (1 + values)) : Math.floor(defaultModel.Sell_MiniMart_Header_TotalSellPrice - defaultModel.Sell_MiniMart_Header_Discount)) - defaultModel.Sell_MiniMart_Header_PaidAmount
        });
    };

    const onPaidAmountChange = values => {
        headerChange({
            Sell_MiniMart_Header_PaidAmount: values,
            Sell_MiniMart_Header_PaidRemain: Math.floor(defaultModel.Sell_MiniMart_Header_TotalPrice - values)
        });
    };

    const onNoteChange = e => {
        headerChange({ Sell_MiniMart_Header_Note: e.target.value });
    };

    const onPaymentMethodChange = values => {
        headerChange({ Sell_MiniMart_Header_PaymentMethod: values });
    };

    return (
        <Row className='minimart-header' style={{ margin: 5, borderRadius: 5 }}>
            <Form form={form}
                style={{ width: '100%' }}
                {...ITEM_LAYOUT}
                name='addclone-form'
                labelAlign='left'
                initialValues={value}
            >
                <Row gutter={[16, 0]}>
                    <Card key='card-header-1' size='small' title='Thông tin nhân viên' bodyStyle={{ padding: '0px 5px', margin: '5px 0', width: '100%' }} style={{ width: '100%', borderRadius: 5, marginBottom: '2px' }}>
                        <Employee_Select span={24}
                            bordered={false}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Status')}`}
                            label={language.SELL_MINIMART_HEADER_EMPLOYEE}
                            value={defaultModel.Sell_MiniMart_Header_Employee}
                            disabled={true}
                        />

                        <Tns_DatePickers span={24}
                            bordered={false}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'UpdatedDate')}`}
                            name='Sell_MiniMart_Header_Date'
                            label={language.SELL_MINIMART_HEADER_DATE}
                            value={Date.now()}
                            disabled={true}
                        />
                    </Card>
                    <Card key='card-header-2' size='small' title='Thông tin khách hàng' bodyStyle={{ padding: '0px 5px', margin: '5px 0', width: '100%' }} style={{ width: '100%', borderRadius: 5, marginBottom: '2px' }}>
                        <Customer_Select span={24}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_Customer')}`}
                            bordered={false}
                            require={true}
                            disabled={(!!mode && mode === TNS_MODE.Edit) ? true : false}
                            placeholer='Chọn khách hàng'
                            label={language.SELL_MINIMART_HEADER_CUSTOMER}
                            value={defaultModel.Sell_MiniMart_Header_Customer}
                            onChange={onCustomerChange}
                        />

                        <Parameter_Select type={'delivery'}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_DeliveryMethod')}`}
                            span={24}
                            bordered={false}
                            label={language.SELL_MINIMART_HEADER_DELIVERY_METHOD}
                            style={{ marginBottom: '5px' }}
                            require={true}
                            name='Sell_MiniMart_Header_DeliveryMethod'
                            onChange={onDeliveryMethodChange}
                        />
                    </Card>

                    <Card key='card-header-3' size='small' title='Thông tin thanh toán' bodyStyle={{ padding: '0px 5px', margin: '5px 0', width: '100%' }} style={{ width: '100%', borderRadius: 5, marginBottom: '2px' }}>
                        <Col span={24}
                        // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalQuantity')}`}
                        >
                            <Form.Item name='Sell_MiniMart_Header_TotalQuantity'
                                shouldUpdate={true}
                                label={language.SELL_MINIMART_HEADER_TOTAL_QUANTITY}
                            >
                                <Input bordered={false} disabled={true} />
                            </Form.Item>
                        </Col>

                        <Tns_InputNumber span={24}
                            bordered={false}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalStockPrice')}`}
                            name='Sell_MiniMart_Header_TotalStockPrice'
                            label={language.SELL_MINIMART_HEADER_TOTAL_STOCK_PRICE}
                            disabled={true}
                        />

                        <Tns_InputNumber span={24}
                            bordered={false}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalSellPrice')}`}
                            name='Sell_MiniMart_Header_TotalSellPrice'
                            label={language.SELL_MINIMART_HEADER_TOTAL_SELL_PRICE}
                            disabled={true}
                        />

                        <Tns_InputNumber span={24}
                            bordered={false}
                            disabled={true}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalStockPrice')}`}
                            name='Sell_MiniMart_Header_Discount'
                            label={language.SELL_MINIMART_HEADER_DISCOUNT}
                        />

                        <Col span={24}
                        // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalQuantity')}`}
                        >
                            <Form.Item name='Sell_MiniMart_Header_VAT'
                                shouldUpdate={true}
                                label={language.SELL_MINIMART_HEADER_VAT}
                            >
                                <Row>
                                    <Col span={9}>
                                        <Select optionFilterProp='children'
                                            bordered={false}
                                            value={defaultModel.Sell_MiniMart_Header_Vat}
                                            onChange={onVATChange}
                                        >
                                            <Option key='0' value={0}>0%</Option>
                                            <Option key='5' value={0.05}>5%</Option>
                                            <Option key='10' value={0.1}>10%</Option>
                                            <Option key='15' value={0.15}>15%</Option>
                                        </Select>
                                    </Col>
                                    <Col span={15}>
                                        <InputNumber disabled={true}
                                            bordered={false}
                                            style={{ width: '100%' }}
                                            parser={values => values.replace(/\$\s?|(,*)/g, '')}
                                            formatter={values => `$ ${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            value={Math.floor((defaultModel.Sell_MiniMart_Header_TotalSellPrice - defaultModel.Sell_MiniMart_Header_Discount) * defaultModel.Sell_MiniMart_Header_Vat)}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>

                        <Tns_InputNumber span={24}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalPrice')}`}
                            bordered={false}
                            name='Sell_MiniMart_Header_TotalPrice'
                            label={language.SELL_MINIMART_HEADER_TOTAL_PRICE}
                            disabled={true}
                        />

                        <Tns_InputNumber span={24}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_PaidAmount')}`}
                            bordered={false}
                            name='Sell_MiniMart_Header_PaidAmount'
                            label={language.SELL_MINIMART_HEADER_PAIDAMOUNT}
                            value={defaultModel.Sell_MiniMart_Header_PaidAmount}
                            onChange={onPaidAmountChange}
                        />

                        <Tns_InputNumber span={24}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_PaidRemain')}`}
                            bordered={false}
                            name='Sell_MiniMart_Header_PaidRemain'
                            label={language.SELL_MINIMART_HEADER_PAIDREMAIN}
                            disabled={true}
                        />

                        <Parameter_Select type={'payment'}
                            // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Status')}`}
                            span={24}
                            style={{ marginBottom: '5px' }}
                            require={true}
                            name='Sell_MiniMart_Header_PaymentMethod'
                            onChange={onPaymentMethodChange}
                        />

                        <Col span={24}
                        // className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_Note')}`}
                        >
                            <Form.Item name='Sell_MiniMart_Header_Note'
                                shouldUpdate={true}
                            >
                                <TextArea maxLength={100}
                                    style={{ width: '100%' }}
                                    placeholder='Nhập ghi chú'
                                    onChange={onNoteChange} />
                            </Form.Item>
                        </Col>

                        <Button type='primary' onClick={onPayment} style={{ width: '48%', margin: '1%' }} >{commonLanguage.PAYMENT}</Button>
                        <Button type='ghost' onClick={onPaymentPrint} style={{ width: '48%', margin: '1%' }}>{commonLanguage.PAYMENT_PRINT}</Button>
                    </Card>
                </Row>
            </Form>
        </Row>
    );
};

export { Sell_MiniMart_Header };
