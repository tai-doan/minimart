import React, { useState } from 'react';
import jsonQuery from 'json-query';
import { Form, Input, Row, Col, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { TNS_METHOD, ITEM_LAYOUT, TNS_LANGUAGE_COMPONENTS } from '../../../commons';
import { Tns_DateRangePickers } from '../../Tns_Controls/Tns_DateRangePickers/Tns_DateRangePickers';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { Branch_CodeAutocomplete } from './Controls/Branch_Code.Autocomplete';
import { Parameter_Select } from '../../System/Parameter/Controls/Parameter.Select';
import { Branch_Select } from './Controls/Branch.Select';
import { User_Select } from '../../System/User/Controls/User.Select';

const { Panel } = Collapse;

const Branch_Search = ({ searchField, value, mainLanguage, onChange, onSearch }) => {
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
    const onBranchCodeChange = values => {
        const valueChange = { ...value };
        valueChange.Branch_Code = values;
        formChange(valueChange);
    };

    const onBranchNameChange = e => {
        const valueChange = { ...value };
        valueChange.Branch_Name = e.target.value;
        formChange(valueChange);
    };

    const onBranchPhoneChange = values => {
        const valueChange = { ...value };
        valueChange.Branch_NumberPhone = values;
        formChange(valueChange);
    };

    const onBranchTaxChange = values => {
        const valueChange = { ...value };
        valueChange.Branch_Tax = values;
        formChange(valueChange);
    };

    const onBranchFaxChange = values => {
        const valueChange = { ...value };
        valueChange.Branch_Fax = values;
        formChange(valueChange);
    };

    const onBranchEmailChange = values => {
        const valueChange = { ...value };
        valueChange.Branch_Email = values;
        formChange(valueChange);
    };

    const onBranchAddressChange = values => {
        const valueChange = { ...value };
        valueChange.Branch_Address = values;
        formChange(valueChange);
    };

    const onDescriptionChange = e => {
        const valueChange = { ...value };
        valueChange.Branch_Description = e.target.value;
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
                            <Branch_CodeAutocomplete label={language.BRANCH_CODE}
                                allowClear={true}
                                name='Branch_Code'
                                value={searchValue.Branch_Code}
                                onSelect={onBranchCodeChange}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Branch_Code')}`}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Branch_Name')}`}>
                                <Form.Item name='Branch_Name'
                                    label={language.BRANCH_NAME}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Branch_Name}
                                        onChange={onBranchNameChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Branch_Email')}`}>
                                <Form.Item name='Branch_Email'
                                    label={language.BRANCH_EMAIL}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Branch_Email}
                                        onChange={onBranchEmailChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Branch_NumberPhone')}`}>
                                <Form.Item name='Branch_NumberPhone'
                                    label={language.BRANCH_NUMBERPHONE}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Branch_NumberPhone}
                                        onChange={onBranchPhoneChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Branch_Tax')}`}>
                                <Form.Item name='Branch_Tax'
                                    label={language.BRANCH_TAX}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Branch_Tax}
                                        onChange={onBranchTaxChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Branch_Fax')}`}>
                                <Form.Item name='Branch_Fax'
                                    label={language.BRANCH_FAX}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Branch_Fax}
                                        onChange={onBranchFaxChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Branch_Address')}`}>
                                <Form.Item name='Branch_Address'
                                    label={language.BRANCH_ADDRESS}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Branch_Address}
                                        onChange={onBranchAddressChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Branch_Description')}`}>
                                <Form.Item name='Branch_Description'
                                    label={language.BRANCH_DESCRIPTION}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Branch_Description}
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

export { Branch_Search };
