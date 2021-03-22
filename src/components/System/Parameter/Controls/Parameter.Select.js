import React, { useEffect, useState } from 'react';
import { Select, Form, Col } from 'antd';
import jsonQuery from 'json-query';

import { Parameter_Service } from '../Services/Parameter.Services';

const { Option } = Select;

const Parameter_Select = ({ type, span, bordered, className, name, label, required, message, disabled, mode, allowClear, placeholer, value, mainLanguage, style, onChange }) => {
    const [selectValue, setSelectValue] = useState(value);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        Promise.all([Parameter_Service.getDataFilter({ type })]).then(result => {
            const data = jsonQuery('data[**]docs', { data: result }).value;
            setSelectValue(value);
            setDataSource(data);
        });
    }, [value, name]);

    const handleChange = values => {
        setSelectValue(values);
        onChange(values);
    };

    return (
        <Col span={!!span ? span : 12} className={className} style={style}>
            <Form.Item name={name}
                shouldUpdate={true}
                label={label}
                rules={[
                    {
                        required: !!required ? required : false,
                        message: !!message ? message : ''
                    }
                ]}
            >
                <Select mode={mode ? mode : null}
                    allowClear={allowClear ? allowClear : false}
                    showSearch
                    bordered={bordered}
                    optionFilterProp="children"
                    disabled={(disabled) ? disabled : false}
                    placeholer={(placeholer) ? placeholer : ''}
                    onChange={handleChange}
                    value={selectValue}
                >
                    {dataSource.map(child => <Option key={child.Parameter_Code} value={child.Parameter_Code}>{child.Parameter_Name}</Option>)}
                </Select>
            </Form.Item>
        </Col>
    );
};

export { Parameter_Select };
