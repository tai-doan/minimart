import React, { useState, useEffect } from 'react';
import { Col, Select, Form } from 'antd';
import jsonQuery from 'json-query';

import { Product_Service } from '../Services/Product.Services';

const { Option } = Select;

const Product_Select = ({ className, name, label, required, message, disabled, mode, allowClear, placeholer, value, mainLanguage, style, onChange, onAddProduct }) => {
    const [selectValue, setSelectValue] = useState(value);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        Promise.all([Product_Service.getDataFilter({})]).then(result => {
            const data = jsonQuery('data[**]docs', { data: result }).value;
            console.log(data);
            setSelectValue(value);
            setDataSource(data);
        });
        return () => {
            setSelectValue(undefined);
            setDataSource([]);
        }
    }, [name, value]);

    const handleChange = values => {
        setSelectValue(values);
        onChange(values);
    };

    const handleSelect = values => {
        console.log(values);
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
                    onSelect={handleSelect}
                    value={selectValue}
                >
                    {dataSource.map(child => <Option key={child.Sell_MiniMart_Code} value={child.Sell_MiniMart_Code}>{child.Sell_MiniMart_Name}</Option>)}
                </Select>
            </Form.Item>
        </Col>
    );
};

export { Product_Select };
