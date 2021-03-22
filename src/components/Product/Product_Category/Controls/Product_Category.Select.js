import React, { useEffect, useState } from 'react';
import { Select, Form, Col } from 'antd';
import jsonQuery from 'json-query';

import { Product_Category_Service } from '../Services/Product_Category.Services';

const { Option } = Select;

const Product_Category_Select = ({ className, name, label, required, message, disabled, mode, allowClear, placeholer, value, mainLanguage, style, onChange }) => {
    const [selectValue, setSelectValue] = useState(value);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        Promise.all([Product_Category_Service.getDataFilter({})]).then(result => {
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
                    {dataSource.map(child => <Option key={child.Product_Category_Code} value={child.Product_Category_Code}>{child.Product_Category_Name}</Option>)}
                </Select>
            </Form.Item>
        </Col>
    );
};

export { Product_Category_Select };
