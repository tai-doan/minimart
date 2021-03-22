import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Row, Col, Tabs } from 'antd';
import jsonQuery from 'json-query';
import { TNS_MODE, TNS_SCREEN, TNS_METHOD, ITEM_LAYOUT, TNS_RESULT_CODE, TNS_NOTICATION_TYPE, TNS_LANGUAGE_COMPONENTS, TNS_DISPLAY_AREA_STORAGE } from '../../../commons';
import { Tns_DisplayFields, Tns_DatePickers } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { defaultFieldModal, getFieldModal, setFieldModal, defaultValueModal } from './Models/Branch.Models';
import { Branch_Service } from './Services/Branch.Services';
import { Parameter_Select } from '../../System/Parameter/Controls/Parameter.Select';
import { User_Select } from '../../System/User/Controls/User.Select';
import { Branch_Select } from './Controls/Branch.Select';

const { TabPane } = Tabs;
const screenNo = TNS_SCREEN.Branch;

const BranchEditViewModel = ({ visible, value, onCreate, onCancel, mainLanguage, language, commonLanguage, mode }) => {
    const [form] = Form.useForm();
    const [displayDefaultFieldOnEditViewForm, setDisplayDefaultFieldOnEditViewForm] = useState(getFieldModal());
    const [defaultModel, setDefaultModel] = useState(value);
    const disable = true;
    const displayFieldOnaddForm = defaultFieldModal(language, commonLanguage);
    const screenName = mode === TNS_MODE.Edit ? language.BRANCH_EDIT_PAGE : language.BRANCH_VIEW_PAGE;

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
            defaultModel.Branch_Code = values.Branch_Code;
            defaultModel.Branch_Name = values.Branch_Name;
            defaultModel.Branch_Email = values.Branch_Email;
            defaultModel.Branch_NumberPhone = values.Branch_NumberPhone;
            defaultModel.Branch_Tax = values.Branch_Tax;
            defaultModel.Branch_Fax = values.Branch_Fax;
            defaultModel.Branch_Address = values.Branch_Address;
            defaultModel.Branch_Description = values.Branch_Description;
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
                    <TabPane tab={language.BRANCH_GENERAL_INFOR} key='1'>
                        <Row gutter={[16, 0]}>
                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Branch_Code')}`}>
                                <Form.Item name='Branch_Code'
                                    shouldUpdate={true}
                                    label={language.BRANCH_CODE}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Branch_Name')}`}>
                                <Form.Item name='Branch_Name'
                                    shouldUpdate={true}
                                    label={language.BRANCH_NAME}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Branch_Email')}`}>
                                <Form.Item name='Branch_Email'
                                    shouldUpdate={true}
                                    label={language.BRANCH_EMAIL}
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                            type: 'email'
                                        }
                                    ]}
                                >
                                    <Input disabled={(mode === TNS_MODE.View) ? disable : !disable} />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Branch_NumberPhone')}`}>
                                <Form.Item name='Branch_NumberPhone'
                                    shouldUpdate={true}
                                    label={language.BRANCH_NUMBERPHONE}
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                            pattern: `(84|0[1-9])+([0-9]{8})`,
                                            max: 10,
                                            min: 10
                                        }
                                    ]}
                                >
                                    <Input disabled={(mode === TNS_MODE.View) ? disable : !disable} />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Branch_Tax')}`}>
                                <Form.Item name='Branch_Tax'
                                    shouldUpdate={true}
                                    label={language.BRANCH_TAX}
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                            pattern: '[0-9]'
                                        }
                                    ]}
                                >
                                    <Input disabled={(mode === TNS_MODE.View) ? disable : !disable} />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Branch_Fax')}`}>
                                <Form.Item name='Branch_Fax'
                                    shouldUpdate={true}
                                    label={language.BRANCH_FAX}
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                            pattern: '[0-9]'
                                        }
                                    ]}
                                >
                                    <Input disabled={(mode === TNS_MODE.View) ? disable : !disable} />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Branch_Address')}`}>
                                <Form.Item name='Branch_Address'
                                    shouldUpdate={true}
                                    label={language.BRANCH_ADDRESS}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Branch_Description')}`}>
                                <Form.Item name='Branch_Description'
                                    shouldUpdate={true}
                                    label={language.BRANCH_DESCRIPTION}
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
                                value={defaultModel.Status}
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
                </Tabs>
            </Form>
        </Modal>
    );
};

const BranchEditView = ({ allowAccess, actionLabel, mode, onSave, mainLanguage, value }) => {
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;
    const [visible, setVisible] = useState(false);
    const [defaultValue, setDefaultValue] = useState(defaultValueModal);

    const checkShowModel = () => {
        if (value.length === 1) {
            Promise.all([Branch_Service.getByID(value[0]._id)]).then(result => {
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
        Promise.all([Branch_Service.updateModel(values)]).then(resultCreate => {
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
            <BranchEditViewModel mainLanguage={mainLanguage}
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

export { BranchEditView };
