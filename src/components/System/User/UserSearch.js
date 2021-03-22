import React, { useState } from 'react';
import jsonQuery from 'json-query';
import { Form, Input, Row, Col, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { TNS_METHOD, ITEM_LAYOUT, TNS_LANGUAGE_COMPONENTS } from '../../../commons';
import { Tns_DateRangePickers } from '../../Tns_Controls/Tns_DateRangePickers/Tns_DateRangePickers';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { User_CodeAutocomplete } from './Controls/User_Code.Autocomplete';
import { Parameter_Select } from '../Parameter/Controls/Parameter.Select';
import { User_Select } from './Controls/User.Select';
import { Employee_Select } from '../../Company/Employee/Controls/Employee.Select';

const { Panel } = Collapse;

const User_Search = ({ searchField, value, mainLanguage, onChange, onSearch }) => {
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
    const onUserCodeSelect = values => {
        const valueChange = { ...value };
        valueChange.User_Code = values;
        formChange(valueChange);
    };

    const onUserNameChange = e => {
        const valueChange = { ...value };
        valueChange.User_Name = e.target.value;
        formChange(valueChange);
    };

    const onEmailChange = e => {
        const valueChange = { ...value };
        valueChange.User_Email = e.target.value;
        formChange(valueChange);
    };

    const onEmployeeChange = values => {
        const valueChange = { ...value };
        valueChange.User_Employee = values;
        formChange(valueChange);
    };

    const onPhoneChange = e => {
        const valueChange = { ...value };
        valueChange.User_NumberPhone = e.target.value;
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
                            <User_CodeAutocomplete label={language.USER_CODE}
                                allowClear={true}
                                name='User_Code'
                                value={searchValue.User_Code}
                                onSelect={onUserCodeSelect}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'User_Code')}`}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'User_Name')}`}>
                                <Form.Item name='User_Name'
                                    label={language.USER_NAME}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.User_Name}
                                        onChange={onUserNameChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'User_Email')}`}>
                                <Form.Item name='User_Email'
                                    label={language.USER_EMAIL}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.User_Email}
                                        onChange={onEmailChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Employee_Select mode='multiple'
                                allowClear={true}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'User_Employee')}`}
                                label={language.USER_EMPLOYEE}
                                value={searchValue.User_Employee}
                                onChange={onEmployeeChange}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'User_NumberPhone')}`}>
                                <Form.Item name='User_NumberPhone'
                                    label={language.USER_NUMBERPHONE}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.User_NumberPhone}
                                        onChange={onPhoneChange}
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

export { User_Search };
