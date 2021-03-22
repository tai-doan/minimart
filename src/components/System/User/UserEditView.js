import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Row, Col, Tabs } from 'antd';
import jsonQuery from 'json-query';
import { TNS_MODE, TNS_SCREEN, TNS_METHOD, ITEM_LAYOUT, TNS_RESULT_CODE, TNS_NOTICATION_TYPE, TNS_LANGUAGE_COMPONENTS, TNS_DISPLAY_AREA_STORAGE } from '../../../commons';
import { Tns_DisplayFields, Tns_DatePickers } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { defaultFieldModal, getFieldModal, setFieldModal, defaultValueModal } from './Models/User.Models';
import { User_Service } from './Services/User.Services';
import { User_Select } from './Controls/User.Select';
import { Parameter_Select } from '../Parameter/Controls/Parameter.Select';
import { Employee_Select } from '../../Company/Employee/Controls/Employee.Select';

const { TabPane } = Tabs;
const screenNo = TNS_SCREEN.User;

const UserEditViewModel = ({ visible, value, onCreate, onCancel, mainLanguage, language, commonLanguage, mode }) => {
    const [form] = Form.useForm();
    const [displayDefaultFieldOnEditViewForm, setDisplayDefaultFieldOnEditViewForm] = useState(getFieldModal());
    const [defaultModel, setDefaultModel] = useState(value);
    const disable = true;
    const displayFieldOnaddForm = defaultFieldModal(language, commonLanguage);
    const screenName = mode === TNS_MODE.Edit ? language.USER_EDIT_PAGE : language.USER_VIEW_PAGE;

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
            defaultModel.User_Code = values.User_Code;
            defaultModel.User_Name = values.User_Name;
            defaultModel.User_Email = values.User_Email;
            defaultModel.User_Password = values.User_Password;
            defaultModel.User_NumberPhone = values.User_NumberPhone;
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

    const onEmployeeChange = values => {
        defaultModel.User_Employee = values;
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
                    <TabPane tab={language.USER_GENERAL_INFOR} key='1'>
                        <Row gutter={[16, 0]}>
                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'User_Code')}`}>
                                <Form.Item name='User_Code'
                                    shouldUpdate={true}
                                    label={language.USER_CODE}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'User_Name')}`}>
                                <Form.Item name='User_Name'
                                    shouldUpdate={true}
                                    label={language.USER_NAME}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'User_Email')}`}>
                                <Form.Item name='User_Email'
                                    shouldUpdate={true}
                                    label={language.USER_EMAIL}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'User_Password')}`}>
                                <Form.Item name='User_Password'
                                    shouldUpdate={true}
                                    label={language.USER_PASSWORD}
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

                            <Employee_Select required={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'User_Employee')}`}
                                label={language.USER_EMPLOYEE}
                                value={defaultModel.User_Employee}
                                disabled={(mode === TNS_MODE.View) ? disable : !disable}
                                onChange={onEmployeeChange}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'User_NumberPhone')}`}>
                                <Form.Item name='User_NumberPhone'
                                    shouldUpdate={true}
                                    label={language.USER_NUMBERPHONE}
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

                            <Parameter_Select type={'status'} required={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Status')}`}
                                label={commonLanguage.STATUS}
                                value={defaultModel.Status}
                                disabled={(mode === TNS_MODE.View) ? disable : !disable}
                                onChange={onStatusChange}
                            />

                            <User_Select disabled={disable}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'CreatedBy')}`}
                                name='CreatedBy'
                                label={commonLanguage.CREATED_BY}
                                value={defaultModel.CreatedBy}
                            />

                            <Tns_DatePickers className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'CreatedDate')}`}
                                name='CreatedDate'
                                label={commonLanguage.CREATED_DATE}
                                value={value.CreatedDate}
                                disabled={disable}
                            />

                            <User_Select disabled={disable}
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

const UserEditView = ({ allowAccess, actionLabel, mode, onSave, mainLanguage, value }) => {
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;
    const [visible, setVisible] = useState(false);
    const [defaultValue, setDefaultValue] = useState(defaultValueModal);

    const checkShowModel = () => {
        if (value.length === 1) {
            Promise.all([User_Service.getByID(value[0]._id)]).then(result => {
                if (result[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                    const data = jsonQuery('data[0]', { data: result }).value;
                    data.User_Password = '';
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
        Promise.all([User_Service.updateModel(values)]).then(resultCreate => {
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
            <UserEditViewModel mainLanguage={mainLanguage}
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

export { UserEditView };
