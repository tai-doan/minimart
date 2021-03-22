import React, { useEffect, useState } from 'react';
import { Select, Form, Col } from 'antd';
import jsonQuery from 'json-query';

import { Employee_Service } from '../Services/Employee.Services';

const { Option } = Select;

const Employee_Select = ({ span, className, name, bordered, label, required, message, disabled, mode, allowClear, placeholer, value, mainLanguage, style, onChange }) => {
    const [selectValue, setSelectValue] = useState(value);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        Promise.all([Employee_Service.getDataFilter({})]).then(result => {
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
                    bordered={bordered}
                    style={{ position: 'absolute', right: 0 }}
                    allowClear={allowClear ? allowClear : false}
                    style={style}
                    showSearch
                    optionFilterProp="children"
                    disabled={(disabled) ? disabled : false}
                    placeholer={(placeholer) ? placeholer : ''}
                    onChange={handleChange}
                    value={selectValue}
                >
                    {dataSource.map(child => <Option key={child.Employee_Code} value={child.Employee_Code}>{child.Employee_Name}</Option>)}
                </Select>
            </Form.Item>
        </Col>
    );
};

export { Employee_Select };
