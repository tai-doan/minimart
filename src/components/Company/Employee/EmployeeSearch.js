import React, { useState } from 'react';
import jsonQuery from 'json-query';
import { Form, Input, Row, Col, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { TNS_METHOD, ITEM_LAYOUT, TNS_LANGUAGE_COMPONENTS } from '../../../commons';
import { Tns_DateRangePickers } from '../../Tns_Controls/Tns_DateRangePickers/Tns_DateRangePickers';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { Employee_CodeAutocomplete } from './Controls/Employee_Code.Autocomplete';
import { Parameter_Select } from '../../System/Parameter/Controls/Parameter.Select';
import { Branch_Select } from '../Branch/Controls/Branch.Select';
import { User_Select } from '../../System/User/Controls/User.Select';

const { Panel } = Collapse;

const Employee_Search = ({ searchField, value, mainLanguage, onChange, onSearch }) => {
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
    const onEmployeeCodeChange = values => {
        const valueChange = { ...value };
        valueChange.Employee_Code = values;
        formChange(valueChange);
    };

    const onEmployeeNameChange = e => {
        const valueChange = { ...value };
        valueChange.Employee_Name = e.target.value;
        formChange(valueChange);
    };

    const onBranchChange = values => {
        const valueChange = { ...value };
        valueChange.Employee_Branch = values;
        formChange(valueChange);
    };

    const onEmailChange = e => {
        const valueChange = { ...value };
        valueChange.Employee_Email = e.target.value;
        formChange(valueChange);
    };

    const onPhoneChange = e => {
        const valueChange = { ...value };
        valueChange.Employee_NumberPhone = e.target.value;
        formChange(valueChange);
    };

    const onPassportChange = e => {
        const valueChange = { ...value };
        valueChange.Employee_Passport = e.target.value;
        formChange(valueChange);
    };

    const onAddressChange = e => {
        const valueChange = { ...value };
        valueChange.Employee_Address = e.target.value;
        formChange(valueChange);
    };

    const onDescriptionChange = e => {
        const valueChange = { ...value };
        valueChange.Employee_Description = e.target.value;
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
                            <Employee_CodeAutocomplete label={language.EMPLOYEE_CODE}
                                allowClear={true}
                                name='Employee_Code'
                                value={searchValue.Employee_Code}
                                onSelect={onEmployeeCodeChange}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Employee_Code')}`}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Employee_Name')}`}>
                                <Form.Item name='Employee_Name'
                                    label={language.EMPLOYEE_NAME}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Employee_Name}
                                        onChange={onEmployeeNameChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Branch_Select allowClear={true}
                                mode='multiple'
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Employee_Branch')}`}
                                label={language.EMPLOYEE_BRANCH}
                                value={searchValue.Employee_Branch}
                                onChange={onBranchChange}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Employee_Email')}`}>
                                <Form.Item name='Employee_Email'
                                    label={language.EMPLOYEE_EMAIL}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Employee_Email}
                                        onChange={onEmailChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Employee_NumberPhone')}`}>
                                <Form.Item name='Employee_NumberPhone'
                                    label={language.EMPLOYEE_NUMBERPHONE}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Employee_NumberPhone}
                                        onChange={onPhoneChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Employee_Passport')}`}>
                                <Form.Item name='Employee_Passport'
                                    label={language.EMPLOYEE_PASSPORT}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Employee_Passport}
                                        onChange={onPassportChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Employee_Address')}`}>
                                <Form.Item name='Employee_Address'
                                    label={language.EMPLOYEE_ADDRESS}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Employee_Address}
                                        onChange={onAddressChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Employee_Description')}`}>
                                <Form.Item name='Employee_Description'
                                    label={language.EMPLOYEE_DESCRIPTION}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Employee_Description}
                                        onChange={onDescriptionChange}
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

export { Employee_Search };
