import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Row, Col, Tabs } from 'antd';
import jsonQuery from 'json-query';
import { TNS_MODE, TNS_SCREEN, TNS_METHOD, ITEM_LAYOUT, TNS_RESULT_CODE, TNS_NOTICATION_TYPE, TNS_LANGUAGE_COMPONENTS, TNS_DISPLAY_AREA_STORAGE } from '../../../commons';
import { Tns_DisplayFields, Tns_DatePickers } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { defaultFieldModal, getFieldModal, setFieldModal, defaultValueModal } from './Models/Product_Category.Models';
import { Product_Category_Service } from './Services/Product_Category.Services';
import { Parameter_Select } from '../../System/Parameter/Controls/Parameter.Select';
import { User_Select } from '../../System/User/Controls/User.Select';
import { Product_Category_Select } from './Controls/Product_Category.Select';

const { TabPane } = Tabs;
const screenNo = TNS_SCREEN.Product_Category;

const Product_CategoryAddCloneModel = ({ visible, value, onCreate, onCancel, mainLanguage, language, commonLanguage, mode }) => {
    const [form] = Form.useForm();
    const [displayDefaultFieldOnAddCloneForm, setDisplayDefaultFieldOnAddCloneForm] = useState(getFieldModal());
    const [defaultModel, setDefaultModel] = useState(value);
    const disable = true;
    const displayFieldOnaddForm = defaultFieldModal(language, commonLanguage);
    const screenName = (mode === TNS_MODE.Create) ? language.PRODUCT_CATEGORY_NEW_PAGE : language.PRODUCT_CATEGORY_CLONE_PAGE;

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
            defaultModel.Product_Category_Code = values.Product_Category_Code;
            defaultModel.Product_Category_Name = values.Product_Category_Name;
            defaultModel.Product_Category_Description = values.Product_Category_Description;
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

    const onStatusChange = values => {
        defaultModel.Status = values;
        setDefaultModel(defaultModel);
    };

    const onParentChange = values => {
        defaultModel.Product_Category_Parent = values;
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
                    <TabPane tab={language.PRODUCT_CATEGORY_GENERAL_INFOR} key='1'>
                        <Row gutter={[16, 0]}>
                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_Category_Code')}`}>
                                <Form.Item name='Product_Category_Code'
                                    shouldUpdate={true}
                                    label={language.PRODUCT_CATEGORY_CODE}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_Category_Name')}`}>
                                <Form.Item name='Product_Category_Name'
                                    shouldUpdate={true}
                                    label={language.PRODUCT_CATEGORY_NAME}
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

                            <Product_Category_Select
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Status')}`}
                                label={language.PRODUCT_CATEGORY_PARENT}
                                value={defaultModel.Product_Category_Parent}
                                onChange={onParentChange}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnAddCloneForm, 'Product_Category_Description')}`}>
                                <Form.Item name='Product_Category_Description'
                                    shouldUpdate={true}
                                    label={language.PRODUCT_CATEGORY_DESCRIPTION}
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
                                value={defaultModel.Status}
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
                </Tabs>
            </Form>
        </Modal>
    );
};

const Product_CategoryAddClone = ({ allowAccess, actionLabel, mode, onSave, mainLanguage, value }) => {
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;
    const [visible, setVisible] = useState(false);
    const [defaultValue, setDefaultValue] = useState({...defaultValueModal});

    const checkShowModel = () => {
        if (mode === TNS_MODE.Clone) {
            if (value.length > 1) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Chỉ chọn 1 dòng dữ liệu để sao chép');
            } else {
                if (value.length < 1) {
                    TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Có lỗi', 'Không có dữ liệu để sao chép');
                } else {
                    Promise.all([Product_Category_Service.getByID(value[0]._id)]).then(result => {
                        if (result[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                            const data = jsonQuery('data[0]', { data: result }).value;
                            data.Product_Category_Code = '';
                            setDefaultValue(data);
                            setVisible(true);
                        } else {
                            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'Có lỗi', 'Dữ liệu bị lỗi hoặc đã bị xóa');
                        }
                    });
                }
            }
        } else {
            setDefaultValue({...defaultValueModal});
            setVisible(true);
        }
    };

    const onCreate = values => {
        Promise.all([Product_Category_Service.createModel(values)]).then(resultCreate => {
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
            <Product_CategoryAddCloneModel mainLanguage={mainLanguage}
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

export { Product_CategoryAddClone };
