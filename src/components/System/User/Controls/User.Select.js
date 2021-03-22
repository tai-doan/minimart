import React, { useEffect, useState } from 'react';
import { Select, Form, Col } from 'antd';
import jsonQuery from 'json-query';

import { User_Service } from '../Services/User.Services';

const { Option } = Select;

const User_Select = ({ className, name, span,  label, required, message, disabled, mode, allowClear, placeholer, value, mainLanguage, style, onChange }) => {
    const [selectValue, setSelectValue] = useState(value);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        Promise.all([User_Service.getDataFilter({value})]).then(result => {
            const data = jsonQuery('data[**]docs', { data: result }).value;
            setSelectValue(value);
            setDataSource(data);
        });
        return () => {
            setSelectValue(undefined);
            setDataSource([]);
        };
    }, [value, name]);

    const handleChange = values => {
        setSelectValue(values);
        onChange(values);
    };

    return (
        <Col span={!!span ? span : 12} className={className}>
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
                    optionFilterProp="children"
                    disabled={(disabled) ? disabled : false}
                    placeholer={(placeholer) ? placeholer : ''}
                    onChange={handleChange}
                    value={selectValue}
                >
                    {dataSource.map(child => <Option key={child.User_Code} value={child.User_Code}>{child.User_Name}</Option>)}
                </Select>
            </Form.Item>
        </Col>
    );
};

export { User_Select };
