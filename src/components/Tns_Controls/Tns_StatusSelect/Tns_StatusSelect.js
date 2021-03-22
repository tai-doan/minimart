import React, { useEffect, useState } from 'react';
import { Select, Form, Col } from 'antd';

const { Option } = Select;

const Tns_StatusSelect = ({ className, name, label, required, message, disabled, mode, allowClear, placeholer, value, mainLanguage, style, onChange }) => {
    const [selectValue, setSelectValue] = useState('');
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if(!!value){
            setSelectValue(value);
        }
    }, [value]);

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
                    <Option value='' ></Option>
                    <Option key='active' value='active'>Active</Option>
                    <Option key='deactive' value='deactive'>Deactive</Option>
                    {/* {dataSource.map(select => <Option key={select.Hr_Employee_Code} value={select.Hr_Employee_Code}>{select.Hr_Employee_Name}</Option>)} */}
                </Select>
            </Form.Item>
        </Col>
    );
};

export { Tns_StatusSelect };
