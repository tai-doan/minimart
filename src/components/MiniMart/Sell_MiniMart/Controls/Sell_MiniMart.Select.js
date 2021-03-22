import React, { useEffect, useState } from 'react';
import { Select, Form, Col } from 'antd';
import jsonQuery from 'json-query';

import { Sell_MiniMart_Header_Service } from '../Services/Sell_MiniMart.Services';

const { Option } = Select;

const Sell_MiniMart_Header_Select = ({ className, name, label, required, message, disabled, mode, allowClear, placeholer, value, mainLanguage, style, onChange }) => {
    const [selectValue, setSelectValue] = useState(value);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        Promise.all([Sell_MiniMart_Header_Service.getDataFilter({})]).then(result => {
            const data = jsonQuery('data[**]docs', { data: result }).value;
            setSelectValue(value);
            setDataSource(data);
        });
    }, [name, value]);

    const handleChange = values => {
        setSelectValue(values);
        onChange(values);
    };

    return (
        <Col span={12} className={className}>
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
                    {dataSource.map(child => <Option key={child.Sell_MiniMart_Header_Code} value={child.Sell_MiniMart_Header_Code}>{child.Sell_MiniMart_Header_Name}</Option>)}
                </Select>
            </Form.Item>
        </Col>
    );
};

export { Sell_MiniMart_Header_Select };
