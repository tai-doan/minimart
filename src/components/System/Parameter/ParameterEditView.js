import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Row, Col, Tabs } from 'antd';
import jsonQuery from 'json-query';
import { TNS_MODE, TNS_SCREEN, TNS_METHOD, ITEM_LAYOUT, TNS_RESULT_CODE, TNS_NOTICATION_TYPE, TNS_LANGUAGE_COMPONENTS, TNS_DISPLAY_AREA_STORAGE } from '../../../commons';
import { Tns_DisplayFields, Tns_DatePickers } from '../../Tns_Controls';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { defaultFieldModal, getFieldModal, setFieldModal, defaultValueModal } from './Models/Parameter.Models';
import { Parameter_Service } from './Services/Parameter.Services';
import { Parameter_Select } from './Controls/Parameter.Select';
import { User_Select } from '../User/Controls/User.Select';

const { TabPane } = Tabs;
const screenNo = TNS_SCREEN.Parameter;

const ParameterEditViewModel = ({ visible, value, onCreate, onCancel, mainLanguage, language, commonLanguage, mode }) => {
    const [form] = Form.useForm();
    const [displayDefaultFieldOnEditViewForm, setDisplayDefaultFieldOnEditViewForm] = useState(getFieldModal());
    const [defaultModel, setDefaultModel] = useState(value);
    const disable = true;
    const displayFieldOnaddForm = defaultFieldModal(language, commonLanguage);
    const screenName = mode === TNS_MODE.Edit ? language.PARAMETER_EDIT_PAGE : language.PARAMETER_VIEW_PAGE;

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
            defaultModel.Parameter_Code = values.Parameter_Code;
            defaultModel.Parameter_Name = values.Parameter_Name;
            defaultModel.Parameter_Type = values.Parameter_Type;
            defaultModel.Parameter_Description = values.Parameter_Description;
            defaultModel.Parameter_InfoAdditional = values.Parameter_InfoAdditional;
            onReset();
            onCreate(defaultModel);
        }).catch(info => {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'D??? li???u b??? l???i', 'Ph???i ??i???n ?????y ????? c??c tr?????ng b???t bu???c nh???p');
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
                    <TabPane tab={language.PARAMETER_GENERAL_INFOR} key='1'>
                        <Row gutter={[16, 0]}>
                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Parameter_Code')}`}>
                                <Form.Item name='Parameter_Code'
                                    shouldUpdate={true}
                                    label={language.PARAMETER_CODE}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Parameter_Name')}`}>
                                <Form.Item name='Parameter_Name'
                                    shouldUpdate={true}
                                    label={language.PARAMETER_NAME}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Parameter_Type')}`}>
                                <Form.Item name='Parameter_Type'
                                    shouldUpdate={true}
                                    label={language.PARAMETER_TYPE}
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

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(displayDefaultFieldOnEditViewForm, 'Parameter_Description')}`}>
                                <Form.Item name='Parameter_Description'
                                    shouldUpdate={true}
                                    label={language.PARAMETER_DESCRIPTION}
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
                                value={value.CreatedDate}
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

const ParameterEditView = ({ allowAccess, actionLabel, mode, onSave, mainLanguage, value }) => {
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;
    const [visible, setVisible] = useState(false);
    const [defaultValue, setDefaultValue] = useState(defaultValueModal);

    const checkShowModel = () => {
        if (value.length === 1) {
            Promise.all([Parameter_Service.getByID(value[0]._id)]).then(result => {
                if (result[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                    const data = jsonQuery('data[0]', { data: result }).value;
                    setDefaultValue(data);
                    setVisible(true);
                } else {
                    TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'C?? l???i', 'D??? li???u b??? l???i ho???c ???? b??? x??a');
                }
            });
        } else {
            if (value.length > 1) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'C?? l???i', 'Ch??? ch???n 1 d??ng d??? li???u ????? ch???nh s???a');
            } else {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'C?? l???i', 'Kh??ng c?? d??? li???u ????? ch???nh s???a');
            }
        }
    };

    const onCreate = values => {
        Promise.all([Parameter_Service.updateModel(values)]).then(resultCreate => {
            if (resultCreate[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                setVisible(false);
                onSave();
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.SUCCESS, 'C???p nh???t th??nh c??ng', 'S???n ph???m ???? ???????c c???p nh???t');
            } else {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'C???p nh???t b??? l???i', 'C?? m???t s??? l???i trong qu?? tr??nh c???p nh???t d??? li???u, vui l??ng ki???m tra l???i');
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
            <ParameterEditViewModel mainLanguage={mainLanguage}
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

export { ParameterEditView };
