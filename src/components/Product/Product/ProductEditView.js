import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Row, Col, Tabs } from 'antd';
import jsonQuery from 'json-query';
import { TNS_MODE, TNS_SCREEN, TNS_METHOD, ITEM_LAYOUT, TNS_RESULT_CODE, TNS_NOTICATION_TYPE, TNS_LANGUAGE_COMPONENTS, TNS_DISPLAY_AREA_STORAGE } from '../../../commons';
import { Tns_DisplayFields, Tns_DatePickers, Tns_InputNumber, Tns_UploadImages } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { defaultFieldModal, getFieldModal, setFieldModal, defaultValueModal } from './Models/Product.Models';
import { Product_Service } from './Services/Product.Services';
import { Product_SizeSelectMultiple } from './Controls/Product_SizeSelectMultiple';
import { Parameter_Select } from '../../System/Parameter/Controls/Parameter.Select';
import { Product_Category_Select } from '../Product_Category/Controls/Product_Category.Select';
import { User_Select } from '../../System/User/Controls/User.Select';

const { TabPane } = Tabs;
const screenNo = TNS_SCREEN.Product;

const ProductEditViewModel = ({ visible, value, onCreate, onCancel, mainLanguage, language, commonLanguage, mode }) => {
    const [form] = Form.useForm();
    const [displayDefaultFieldOnEditViewForm, setDisplayDefaultFieldOnEditViewForm] = useState(getFieldModal());
    const [defaultModel, setDefaultModel] = useState(value);
    const disable = true;
    const displayFieldOnaddForm = defaultFieldModal(language, commonLanguage);
    const screenName = mode === TNS_MODE.Edit ? language.PRODUCT_EDIT_PAGE : language.PRODUCT_VIEW_PAGE;

    useEffect(() => {
        form.setFieldsValue(value);
        setDefaultModel(value);
    }, [value]);

    const onDisplayChange = (type, values) => {
        if (type !== null && values !== undefined) {
            setFieldModal(values);
            setDisplayDefaultFieldOnEditViewForm(values);
        } else {
            setDisplayDefaultFieldOnEditViewForm(getFieldModal());
        }
    };

    const onOk = () => {
        form.validateFields().then(values => {
            defaultModel._id = value._id;
            defaultModel.Product_Code = values.Product_Code;
            defaultModel.Product_Name = values.Product_Name;
            defaultModel.Product_Description = values.Product_Description;
            defaultModel.Product_InfoAdditional = values.Product_InfoAdditional;
            onReset();
            onCreate(defaultModel);
        }).catch(info => {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'Dữ liệu bị lỗi', 'Phải điền đầy đủ các trường bắt buộc nhập');
        });
    };

    const onCancelScreen = () => {
        onReset();
        onCancel();
    };

    const onReset = () => {
        form.resetFields();
    };

    const onStockPriceChange = values => {
        defaultModel.Product_StockPrice = values;
        setDefaultModel(defaultModel);
    };

    const onSalePriceChange = values => {
        defaultModel.Product_SalePrice = values;
        setDefaultModel(defaultModel);
    };

    const onSizeChange = values => {
        defaultModel.Product_Size = values;
        setDefaultModel(defaultModel);
    };

    const onCategoryChange = values => {
        defaultModel.Product_Category = values;
        setDefaultModel(defaultModel);
    };

    const onImageChange = values => {
        defaultModel.Product_Image = values;
        setDefaultModel(defaultModel);
    };

    const onStatusChange = values => {
        defaultModel.Status = values;
        setDefaultModel(defaultModel);
    };

    return (
        <Modal width={1000}
            forceRender={true}
            visible={visible}
            title={screenName}
            okText={commonLanguage.SAVE}
            cancelText={commonLanguage.CANCEL}
            onCancel={onCancelScreen}
            onOk={onOk} >
            <Form {...ITEM_LAYOUT}
                form={form}
                labelAlign='left'
                name='editview-form'
                initialValues={value}
            >
                <Tns_DisplayFields style={{ position: 'absolute', right: '15px', 'zIndex': '1' }}
                    columns={[{ fields: displayFieldOnaddForm, type: TNS_DISPLAY_AREA_STORAGE.modalField, data: displayDefaultFieldOnEditViewForm }]}
                    screenNo={screenNo}
                    onDisplayChange={onDisplayChange}
                    mainLanguage={mainLanguage} />
                <Tabs defaultActiveKey='1' >
                    <TabPane tab={language.PRODUCT_GENERAL_INFOR} key='1'>
                        <Row gutter={[16, 0]}>
                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Product_Code')}`}>
                                <Form.Item name='Product_Code'
                                    shouldUpdate={true}
                                    label={language.PRODUCT_CODE}
                                    rules={[
                                        {
                                            required: true,
                                            message: ''
                                        }
                                    ]}
                                >
                                    <Input disabled={disable} />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Product_Name')}`}>
                                <Form.Item name='Product_Name'
                                    shouldUpdate={true}
                                    label={language.PRODUCT_NAME}
                                    rules={[
                                        {
                                            required: true,
                                            message: ''
                                        }
                                    ]}
                                >
                                    <Input disabled={(mode === TNS_MODE.View) ? disable : !disable} />
                                </Form.Item>
                            </Col>

                            <Tns_InputNumber className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Product_StockPrice')}`}
                                name='Product_StockPrice'
                                require={true}
                                min={0}
                                value={value.Product_StockPrice}
                                label={language.PRODUCT_STOCKPRICE}
                                disabled={(mode === TNS_MODE.View) ? disable : !disable}
                                onChange={onStockPriceChange}
                            />

                            <Tns_InputNumber className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Product_SalePrice')}`}
                                name='Product_SalePrice'
                                require={true}
                                min={0}
                                value={value.Product_SalePrice}
                                label={language.PRODUCT_SALEPRICE}
                                disabled={(mode === TNS_MODE.View) ? disable : !disable}
                                onChange={onSalePriceChange}
                            />

                            <Product_SizeSelectMultiple
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Product_Size')}`}
                                label={language.PRODUCT_SIZE}
                                value={value.Product_Size}
                                disabled={(mode === TNS_MODE.View) ? disable : !disable}
                                onChange={onSizeChange}
                            />

                            <Product_Category_Select
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Product_Category')}`}
                                label={language.PRODUCT_CATEGORY}
                                value={value.Product_Category}
                                onChange={onCategoryChange}
                                disabled={(mode === TNS_MODE.View) ? disable : !disable}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Product_Description')}`}>
                                <Form.Item name='Product_Description'
                                    shouldUpdate={true}
                                    label={language.PRODUCT_DESCRIPTION}
                                    rules={[
                                        {
                                            required: false,
                                            message: ''
                                        }
                                    ]}
                                >
                                    <Input disabled={(mode === TNS_MODE.View) ? disable : !disable} />
                                </Form.Item>
                            </Col>

                            <Parameter_Select type={'status'}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Status')}`}
                                label={commonLanguage.STATUS}
                                value={value.Status}
                                disabled={(mode === TNS_MODE.View) ? disable : !disable}
                                onChange={onStatusChange}
                            />

                            <User_Select disabled={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'CreatedBy')}`}
                                name='CreatedBy'
                                label={commonLanguage.CREATED_BY}
                                value={defaultModel.CreatedBy}
                            />

                            <Tns_DatePickers className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'CreatedDate')}`}
                                name='CreatedDate'
                                label={commonLanguage.CREATED_DATE}
                                value={Date.now()}
                                disabled={disable}
                            />

                            <User_Select disabled={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'UpdatedBy')}`}
                                name='UpdatedBy'
                                label={commonLanguage.UPDATED_BY}
                                value={defaultModel.UpdatedBy}
                            />

                            <Tns_DatePickers className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'UpdatedDate')}`}
                                name='UpdatedDate'
                                label={commonLanguage.UPDATED_DATE}
                                value={value.UpdatedDate}
                                disabled={disable}
                            />
                        </Row>
                    </TabPane>
                    <TabPane tab={language.PRODUCT_IMAGE} key='2'>
                        <Row gutter={[16, 0]}>
                            <Tns_UploadImages multiple={true}
                                disabled={mode === TNS_MODE.Edit ? !disable : disable}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Product_Image')}`}
                                onChange={onImageChange}
                                sources={defaultModel.Product_Image}
                            />
                        </Row>
                    </TabPane>
                </Tabs>
            </Form>
        </Modal>
    );
};

const ProductEditView = ({ allowAccess, actionLabel, mode, onSave, mainLanguage, value }) => {
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;
    const [visible, setVisible] = useState(false);
    const [defaultValue, setDefaultValue] = useState(defaultValueModal);

    const checkShowModel = () => {
        if (value.length === 1) {
            Promise.all([Product_Service.getByID(value[0]._id)]).then(result => {
                if (result[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                    const data = jsonQuery('data[0]', { data: result }).value;
                    setDefaultValue(data);
                    setVisible(true);
                } else {
                    TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'Có lỗi', 'Dữ liệu bị lỗi hoặc đã bị xóa');
                }
            });
        } else {
            if (value.length > 1) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Chỉ chọn 1 dòng dữ liệu để chỉnh sửa');
            } else {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Không có dữ liệu để chỉnh sửa');
            }
        }
    };

    const onCreate = values => {
        Promise.all([Product_Service.updateModel(values)]).then(resultCreate => {
            if (resultCreate[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                setVisible(false);
                onSave();
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.SUCCESS, 'Cập nhật thành công', 'Sản phẩm đã được cập nhật');
            } else {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'Cập nhật bị lỗi', 'Có một số lỗi trong quá trình cập nhật dữ liệu, vui lòng kiểm tra lại');
            }
        });
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
            <ProductEditViewModel mainLanguage={mainLanguage}
                language={language}
                commonLanguage={commonLanguage}
                mode={mode}
                value={defaultValue}
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </span>
    );
};

export { ProductEditView };
