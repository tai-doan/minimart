import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Row, Col, Tabs, Select } from 'antd';
import jsonQuery from 'json-query';
import { TNS_SCREEN, TNS_METHOD, ITEM_LAYOUT, TNS_RESULT_CODE, TNS_NOTICATION_TYPE, TNS_LANGUAGE_COMPONENTS, TNS_DISPLAY_AREA_STORAGE } from '../../../commons';
import { Tns_DisplayFields, Tns_DatePickers, Tns_InputNumber, Tns_ResultTable } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { defaultFieldModal, getFieldModal, setFieldModal } from './Models/Sell_MiniMart.Models';
import { defaultColumnInResultTableView } from './Models/Sell_MiniMart.DetailModel';
import { Sell_MiniMart_Header_Service } from './Services/Sell_MiniMart.Services';
import { Parameter_Select } from '../../System/Parameter/Controls/Parameter.Select';
import { User_Select } from '../../System/User/Controls/User.Select';
import { Employee_Select } from '../../Company/Employee/Controls/Employee.Select';
import { Customer_Select } from '../../Company/Customer/Controls/Customer.Select';
import { defaultHeaderModel } from './Models/Sell_MiniMart.HeaderModel';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const screenNo = TNS_SCREEN.Sell_MiniMart;

const Sell_MiniMartViewModel = ({ visible, header, detail, onCancel, mainLanguage, language, commonLanguage }) => {
    const [form] = Form.useForm();
    const [displayDefaultFieldOnAddCloneForm, setDisplayDefaultFieldOnAddCloneForm] = useState(getFieldModal());
    const [headerModel, setHeaderModel] = useState(header);
    const [detailModel, setDetailModel] = useState(detail);
    const displayFieldOnViewForm = defaultFieldModal(language, commonLanguage);
    const columnResultDetail = defaultColumnInResultTableView(language, []);
    const screenName = language.SELL_MINIMART_HEADER_VIEW_PAGE;

    useEffect(() => {
        form.setFieldsValue(header);
        setHeaderModel(header);
        setDetailModel(detail);
    }, [header, detail]);

    const onDisplayChange = (type, values) => {
        if (type !== null && values !== undefined) {
            setFieldModal(values);
            setDisplayDefaultFieldOnAddCloneForm(values);
        } else {
            setDisplayDefaultFieldOnAddCloneForm(getFieldModal());
        }
    };

    const onCancelScreen = () => {
        onReset();
        onCancel();
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Modal width={'80vw'}
            forceRender={true}
            visible={visible}
            title={screenName}
            onCancel={onCancelScreen}
            footer={[
                <Button type='primary' onClick={onCancelScreen}>{commonLanguage.CLOSE}</Button>
            ]}
        >
            <Form {...ITEM_LAYOUT}
                form={form}
                name='addclone-form'
                labelAlign='left'
                initialValues={header}
            >
                <Tns_DisplayFields style={{ position: 'absolute', right: '15px', 'zIndex': '1' }}
                    columns={[{ fields: displayFieldOnViewForm, type: TNS_DISPLAY_AREA_STORAGE.modalField, data: displayDefaultFieldOnAddCloneForm }]}
                    screenNo={screenNo}
                    onDisplayChange={onDisplayChange}
                    mainLanguage={mainLanguage} />
                <Tabs defaultActiveKey='1' >
                    <TabPane tab={language.SELL_MINIMART_HEADER_INFOR} key='1'>
                        <Row gutter={[16, 0]}>
                            <Col span={8} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_Code')}`}>
                                <Form.Item name='Sell_MiniMart_Header_Code'
                                    shouldUpdate={true}
                                    label={language.SELL_MINIMART_HEADER_CODE}
                                    rules={[
                                        {
                                            required: true,
                                            message: ''
                                        }
                                    ]}
                                >
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>

                            <Employee_Select span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_Employee'
                                value={headerModel.Sell_MiniMart_Header_Employee}
                                label={language.SELL_MINIMART_HEADER_EMPLOYEE}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_Employee')}`}
                            />

                            <Tns_DatePickers span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_Date'
                                value={headerModel.Sell_MiniMart_Header_Date}
                                label={language.SELL_MINIMART_HEADER_DATE}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_Date')}`}
                            />

                            <Customer_Select span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_Customer'
                                value={headerModel.Sell_MiniMart_Header_Customer}
                                label={language.SELL_MINIMART_HEADER_CUSTOMER}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_Customer')}`}
                            />

                            <Parameter_Select type={'delivery'}
                                span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_DeliveryMethod'
                                value={headerModel.Sell_MiniMart_Header_DeliveryMethod}
                                label={language.SELL_MINIMART_HEADER_DELIVERY_METHOD}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_DeliveryMethod')}`}
                            />

                            <Col span={8}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalQuantity')}`}
                            >
                                <Form.Item name='Sell_MiniMart_Header_TotalQuantity'
                                    shouldUpdate={true}
                                    label={language.SELL_MINIMART_HEADER_TOTAL_QUANTITY}
                                >
                                    <Input disabled={true} />
                                </Form.Item>
                            </Col>

                            <Tns_InputNumber span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_TotalStockPrice'
                                value={headerModel.Sell_MiniMart_Header_TotalStockPrice}
                                label={language.SELL_MINIMART_HEADER_TOTAL_STOCK_PRICE}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalStockPrice')}`}
                            />

                            <Tns_InputNumber span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_TotalSellPrice'
                                value={headerModel.Sell_MiniMart_Header_TotalSellPrice}
                                label={language.SELL_MINIMART_HEADER_TOTAL_SELL_PRICE}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalSellPrice')}`}
                            />

                            <Tns_InputNumber span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_Discount'
                                value={headerModel.Sell_MiniMart_Header_Discount}
                                label={language.SELL_MINIMART_HEADER_DISCOUNT}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_Discount')}`}
                            />

                            <Col span={8}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_Vat')}`}
                            >
                                <Form.Item name='Sell_MiniMart_Header_Vat'
                                    shouldUpdate={true}
                                    label={language.SELL_MINIMART_HEADER_VAT}
                                >
                                    <Select optionFilterProp='children'
                                        disabled={true}
                                    >
                                        <Option key='0' value={0}>0%</Option>
                                        <Option key='5' value={0.05}>5%</Option>
                                        <Option key='10' value={0.1}>10%</Option>
                                        <Option key='15' value={0.15}>15%</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Tns_InputNumber span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_TotalPrice'
                                value={headerModel.Sell_MiniMart_Header_TotalPrice}
                                label={language.SELL_MINIMART_HEADER_TOTAL_PRICE}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_TotalPrice')}`}
                            />

                            <Tns_InputNumber span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_PaidAmount'
                                value={headerModel.Sell_MiniMart_Header_PaidAmount}
                                label={language.SELL_MINIMART_HEADER_PAIDAMOUNT}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_PaidAmount')}`}
                            />

                            <Tns_InputNumber span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_PaidRemain'
                                value={headerModel.Sell_MiniMart_Header_PaidRemain}
                                label={language.SELL_MINIMART_HEADER_PAIDREMAIN}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_PaidRemain')}`}
                            />

                            <Parameter_Select type={'payment'}
                                span={8}
                                disabled={true}
                                name='Sell_MiniMart_Header_PaymentMethod'
                                value={headerModel.Sell_MiniMart_Header_PaymentMethod}
                                label={language.SELL_MINIMART_HEADER_PAYMENT_METHOD}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_PaymentMethod')}`}
                            />

                            <Parameter_Select type={'status'}
                                span={8}
                                disabled={true}
                                name='Status'
                                value={headerModel.Status}
                                label={commonLanguage.STATUS}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Status')}`}
                            />

                            <User_Select disabled={true}
                                span={8}
                                name='CreatedBy'
                                value={headerModel.CreatedBy}
                                label={commonLanguage.CREATED_BY}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'CreatedBy')}`}
                            />

                            <Tns_DatePickers span={8}
                                disabled={true}
                                name='CreatedDate'
                                value={headerModel.CreatedDate}
                                label={commonLanguage.CREATED_DATE}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'CreatedDate')}`}
                            />

                            <User_Select span={8}
                                disabled={true}
                                name='UpdatedBy'
                                value={headerModel.UpdatedBy}
                                label={commonLanguage.UPDATED_BY}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'UpdatedBy')}`}
                            />

                            <Tns_DatePickers span={8}
                                disabled={true}
                                name='UpdatedDate'
                                value={headerModel.UpdatedDate}
                                label={commonLanguage.UPDATED_DATE}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'UpdatedDate')}`}
                            />

                            <Col span={24}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Sell_MiniMart_Header_Note')}`}
                            >
                                <Form.Item name='Sell_MiniMart_Header_Note'
                                    shouldUpdate={true}
                                >
                                    <TextArea maxLength={100}
                                        readOnly={true}
                                        style={{ width: '100%' }}
                                        placeholder='Nhập ghi chú'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={language.SELL_MINIMART_DETAIL_INFOR} key='2'>
                        <Tns_ResultTable data={detailModel}
                            columns={columnResultDetail}
                            hiddenSelection={true}
                            keys={2}
                            rowKey={'_id'}
                            pagination={false}
                        />
                    </TabPane>
                </Tabs>
            </Form>
        </Modal>
    );
};

const Sell_MiniMartView = ({ allowAccess, actionLabel, mainLanguage, value }) => {
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;
    const [visible, setVisible] = useState(false);
    const [headerModel, setHeaderModel] = useState(defaultHeaderModel);
    const [detailModel, setDetailModel] = useState({});

    const checkShowModel = () => {
        if (value.length > 1) {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Chỉ chọn 1 dòng dữ liệu để xem');
        } else {
            if (value.length < 1) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Không có dữ liệu để xem');
            } else {
                Promise.all([Sell_MiniMart_Header_Service.getByID(value[0]._id), Sell_MiniMart_Header_Service.getProductByInvoice(value[0].Sell_MiniMart_Header_Code)]).then(result => {
                    if (result[0].returnCode === TNS_RESULT_CODE.SUCCESS && result[1].returnCode === TNS_RESULT_CODE.SUCCESS) {
                        const headerData = jsonQuery('data[0]', { data: result[0] }).value;
                        const detailData = jsonQuery('data[**]', { data: result[1] }).value;
                        setHeaderModel(headerData);
                        setDetailModel({
                            docs: detailData,
                            totalDocs: detailModel.length
                        });
                        setVisible(true);
                    } else {
                        TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'Có lỗi', 'Dữ liệu bị lỗi hoặc đã bị xóa');
                    }
                });
            }
        }
    };

    if (!allowAccess) {
        return null;
    }

    return (
        <span>
            <Button
                type='primary'
                onClick={checkShowModel}>
                {actionLabel}
            </Button>
            <Sell_MiniMartViewModel mainLanguage={mainLanguage}
                language={language}
                commonLanguage={commonLanguage}
                header={headerModel}
                detail={detailModel}
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </span>
    );
};

export { Sell_MiniMartView };
