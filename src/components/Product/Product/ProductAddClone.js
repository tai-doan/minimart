import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

const ProductAddCloneModel = ({ visible, value, onCreate, onCancel, mainLanguage, language, commonLanguage, mode }) => {
    const { t } = useTranslation()
    const [form] = Form.useForm();
    const [displayDefaultFieldOnAddCloneForm, setDisplayDefaultFieldOnAddCloneForm] = useState(getFieldModal());
    const [defaultModel, setDefaultModel] = useState(value);
    const disable = true;
    const displayFieldOnaddForm = defaultFieldModal(language, commonLanguage);
    const screenName = (mode === TNS_MODE.Create) ? language.PRODUCT_NEW_PAGE : language.PRODUCT_CLONE_PAGE;

    useEffect(() => {
        form.setFieldsValue(value);
        setDefaultModel(value);
    }, [value]);

    const onDisplayChange = (type, values) => {
        if (type !== null && values !== undefined) {
            setFieldModal(values);
            setDisplayDefaultFieldOnAddCloneForm(values);
        } else {
            setDisplayDefaultFieldOnAddCloneForm(getFieldModal());
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

    const onCategoryChange = values => {
        defaultModel.Product_Category = values;
        setDefaultModel(defaultModel);
    };

    const onSizeChange = values => {
        defaultModel.Product_Size = values;
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
                name='addclone-form'
                labelAlign='left'
                initialValues={value}
            >
                <Tns_DisplayFields style={{ position: 'absolute', right: '15px', 'zIndex': '1' }}
                    columns={[{ fields: displayFieldOnaddForm, type: TNS_DISPLAY_AREA_STORAGE.modalField, data: displayDefaultFieldOnAddCloneForm }]}
                    screenNo={screenNo}
                    onDisplayChange={onDisplayChange}
                    mainLanguage={mainLanguage} />
                <Tabs defaultActiveKey='1' >
                    <TabPane tab={language.PRODUCT_GENERAL_INFOR} key='1'>
                        <Row gutter={[16, 0]}>
                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_Code')}`}>
                                <Form.Item name='Product_Code'
                                    tooltip={t('product_code_require')}
                                    shouldUpdate={true}
                                    label={language.PRODUCT_CODE}
                                    rules={[
                                        {
                                            required: true,
                                            message: ''
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_Name')}`}>
                                <Form.Item name='Product_Name'
                                    tooltip={t('product_name_require')}
                                    shouldUpdate={true}
                                    label={language.PRODUCT_NAME}
                                    rules={[
                                        {
                                            required: true,
                                            message: ''
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Tns_InputNumber className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_StockPrice')}`}
                                name='Product_StockPrice'
                                require={true}
                                min={0}
                                value={value.Product_StockPrice}
                                label={language.PRODUCT_STOCKPRICE}
                                onChange={onStockPriceChange}
                            />

                            <Tns_InputNumber className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_SalePrice')}`}
                                name='Product_SalePrice'
                                require={true}
                                min={0}
                                value={value.Product_SalePrice}
                                label={language.PRODUCT_SALEPRICE}
                                onChange={onSalePriceChange}
                            />

                            <Product_SizeSelectMultiple
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_Size')}`}
                                label={language.PRODUCT_SIZE}
                                value={value.Product_Size}
                                onChange={onSizeChange}
                            />

                            <Product_Category_Select
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_Category')}`}
                                label={language.PRODUCT_CATEGORY}
                                value={value.Product_Category}
                                onChange={onCategoryChange}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_Description')}`}>
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
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Parameter_Select type={'status'}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Status')}`}
                                label={commonLanguage.STATUS}
                                value={value.Status}
                                onChange={onStatusChange}
                            />

                            <User_Select disabled={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'CreatedBy')}`}
                                name='CreatedBy'
                                label={commonLanguage.CREATED_BY}
                                value={defaultModel.CreatedBy}
                            />

                            <Tns_DatePickers className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'CreatedDate')}`}
                                name='CreatedDate'
                                label={commonLanguage.CREATED_DATE}
                                value={Date.now()}
                                disabled={disable}
                            />

                            <User_Select disabled={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'UpdatedBy')}`}
                                name='UpdatedBy'
                                label={commonLanguage.UPDATED_BY}
                                value={defaultModel.UpdatedBy}
                            />

                            <Tns_DatePickers className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'UpdatedDate')}`}
                                name='UpdatedDate'
                                label={commonLanguage.UPDATED_DATE}
                                disabled={disable}
                            />
                        </Row>
                    </TabPane>
                    <TabPane tab={language.PRODUCT_IMAGE} key='2'>
                        <Row gutter={[16, 0]}>
                            <Tns_UploadImages multiple={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_Image')}`}
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

const ProductAddClone = ({ allowAccess, actionLabel, mode, onSave, mainLanguage, value }) => {
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;
    const [visible, setVisible] = useState(false);
    const [defaultValue, setDefaultValue] = useState({ ...defaultValueModal });

    const checkShowModel = () => {
        if (mode === TNS_MODE.Clone) {
            if (value.length > 1) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Chỉ chọn 1 dòng dữ liệu để sao chép');
            } else {
                if (value.length < 1) {
                    TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Không có dữ liệu để sao chép');
                } else {
                    Promise.all([Product_Service.getByID(value[0]._id)]).then(result => {
                        if (result[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                            const data = jsonQuery('data[0]', { data: result }).value;
                            data.Product_Code = '';
                            setDefaultValue(data);
                            setVisible(true);
                        } else {
                            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'Có lỗi', 'Dữ liệu bị lỗi hoặc đã bị xóa');
                        }
                    });
                }
            }
        } else {
            setDefaultValue({ ...defaultValueModal });
            setVisible(true);
        }
    };

    const onCreate = values => {
        Promise.all([Product_Service.createModel(values)]).then(resultCreate => {
            if (resultCreate[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                setVisible(false);
                onSave();
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.SUCCESS, 'Tạo thành công', 'Sản phẩm đã được thêm vào hệ thống');
            } else {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'Dữ liệu bị lỗi', 'Mã sản phẩm đã tồn tại');
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
            <ProductAddCloneModel mainLanguage={mainLanguage}
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

export { ProductAddClone };
