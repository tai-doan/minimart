import React, { useState } from 'react';
import jsonQuery from 'json-query';
import { Form, Input, Row, Col, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { TNS_METHOD, ITEM_LAYOUT, TNS_LANGUAGE_COMPONENTS } from '../../../commons';
import { Tns_DateRangePickers } from '../../Tns_Controls/Tns_DateRangePickers/Tns_DateRangePickers';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { Parameter_CodeAutocomplete } from './Controls/Parameter_Code.Autocomplete';
import { Parameter_Select } from './Controls/Parameter.Select';
import { User_Select } from '../User/Controls/User.Select';

const { Panel } = Collapse;

const Parameter_Search = ({ searchField, value, mainLanguage, onChange, onSearch }) => {
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
    const onParameterCodeSelect = values => {
        const valueChange = { ...value };
        valueChange.Parameter_Code = values;
        formChange(valueChange);
    };

    const onParameterNameChange = e => {
        const valueChange = { ...value };
        valueChange.Parameter_Name = e.target.value;
        formChange(valueChange);
    };

    const onDescriptionChange = e => {
        const valueChange = { ...value };
        valueChange.Parameter_Description = e.target.value;
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
                            <Parameter_CodeAutocomplete label={language.PARAMETER_CODE}
                                allowClear={true}
                                name='Parameter_Code'
                                value={searchValue.Parameter_Code}
                                onSelect={onParameterCodeSelect}
                                className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Parameter_Code')}`}
                            />

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Parameter_Name')}`}>
                                <Form.Item name='Parameter_Name'
                                    label={language.PARAMETER_NAME}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Parameter_Name}
                                        onChange={onParameterNameChange}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12} className={`tns-field-item ${TNS_METHOD.checkAvailableField(searchField, 'Parameter_Description')}`}>
                                <Form.Item name='Parameter_Description'
                                    label={language.PARAMETER_DESCRIPTION}
                                >
                                    <Input allowClear={true}
                                        value={searchValue.Parameter_Description}
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

export { Parameter_Search };
