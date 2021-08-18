import React, { useState } from 'react';
import { Drawer, Button, Form, Checkbox, Row, Col, Tooltip, Select } from 'antd';
import {
    SettingOutlined,
    SortAscendingOutlined,
    SortDescendingOutlined
} from '@ant-design/icons';
import jsonQuery from 'json-query';
import { LANGUAGE_COMPONENT } from './Languages/languages';

const { Option } = Select;

const Tns_DisplayFieldOnSearchScreen = ({ className, style, mainLanguage, columns, searchColumns, searchResultColumns, sortType, sortField, searchField, searchResultField, sortTypeChange, sortFieldChange, searchFieldChange, searchResultFieldChange }) => {
    const language = jsonQuery(mainLanguage[0], { data: LANGUAGE_COMPONENT }).value;

    const [visible, setVisible] = useState(false);
    const [sorting, setSorting] = useState(sortType);
    const [fieldSort, setFieldSort] = useState(sortField);
    const [fieldSearch, setFieldSearch] = useState(searchField);
    const [fieldSearchResult, setFieldSearchResult] = useState(searchResultField);

    const onShowDrawer = () => {
        setVisible(true);
    };

    const onCloseDrawer = () => {
        setVisible(false);
    };

    const onSortTypeChange = () => {
        setSorting(!sorting);
    };

    const onSortFieldChange = value => {
        setFieldSort(value);
    };

    const onSearchFieldChange = value => {
        setFieldSearch(value);
    };

    const onSearchResultFieldChange = value => {
        setFieldSearchResult(value);
    };

    const onApply = () => {
        sortTypeChange(sorting);
        sortFieldChange(fieldSort);
        searchFieldChange(fieldSearch);
        searchResultFieldChange(fieldSearchResult);
        setVisible(false);
    };

    return (
        <span className={className} style={style}>
            <Tooltip placement='topRight' title={language.TITLE} >
                <SettingOutlined onClick={onShowDrawer} style={{ marginBottom: 5, fontSize: 25, verticalAlign: 'middle' }} />
            </Tooltip>

            <Drawer title={language.TITLE}
                width={'25vw'}
                closable={false}
                onClose={onCloseDrawer}
                visible={visible}
                footer={
                    <div>
                        <Button onClick={onCloseDrawer}>
                            {language.CLOSE}
                        </Button>
                        <Button onClick={onApply} type='primary' style={{ margin: '0px 5px' }}>
                            {language.APPLY}
                        </Button>
                    </div>
                }
            >
                {sortField !== undefined ? (
                    <div className={`${className}-sort-fields`}>
                        <Form.Item>
                            <span style={{ fontWeight: 'bold' }}>{language.TITLE_SORT_TYPE}
                                {sorting ? <SortAscendingOutlined onClick={onSortTypeChange} style={{ fontSize: 20, fontWeight: 'bold', verticalAlign: 'middle' }} /> :
                                    <SortDescendingOutlined onClick={onSortTypeChange} style={{ fontSize: 20, fontWeight: 'bold', verticalAlign: 'middle' }} />}
                            </span>
                            <Select
                                style={{ width: '100%' }}
                                mode='multiple'
                                allowClear={true}
                                defaultValue={fieldSort}
                                onChange={onSortFieldChange}>
                                {columns.map(fields => (fields.className !== 'ant-table-cell-ellipsis-hidden') ? <Option key={fields.key} value={fields.key}>{fields.title}</Option> : '')}
                            </Select>
                        </Form.Item>
                    </div>
                ) : null}

                {searchField !== undefined ? (
                    <div className={`${className}-search-fields`}>
                        <Form.Item>
                            <span style={{ fontWeight: 'bold' }}>{language.TITLE_SEARCH_FORM}</span>
                            <Checkbox.Group value={fieldSearch}
                                style={{ width: '100%', margin: '5px 0px' }}
                                onChange={onSearchFieldChange}>
                                <Row>
                                    {searchColumns.map((fields, index) => (
                                        <Col key={fields + index} span={12} >
                                            <Checkbox key={fields.key} value={fields.key}>{fields.title}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                ) : null}

                {searchResultField !== undefined ? (
                    <div className={`${className}-search-result-fields`}>
                        <Form.Item>
                            <span style={{ fontWeight: 'bold' }}>{language.TITLE_SEARCH_RESULT}</span>
                            <Checkbox.Group value={fieldSearchResult}
                                style={{ width: '100%', margin: '5px 0px' }}
                                onChange={onSearchResultFieldChange}>
                                <Row>
                                    {searchResultColumns.map((fields, index) => (
                                        <Col key={fields + index} span={12} >
                                            <Checkbox key={fields.key} value={fields.key}>{fields.title}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                ) : null}
            </Drawer>
        </span>
    );
};

export { Tns_DisplayFieldOnSearchScreen };
