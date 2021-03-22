import React, { useEffect, useState } from 'react';
import { AutoComplete, Form, Col } from 'antd';
import jsonQuery from 'json-query';

import { Product_Category_Service } from '../Services/Product_Category.Services';

const Product_Category_CodeAutocomplete = ({ value, className, name, label, required, message, allowClear, onSelect }) => {
    const [option, setOption] = useState([]);

    const renderItem = (values, labels) => {
        return {
            value: values,
            label: (
                <div className='label-autocomplete' title={labels}>
                    {values}
                </div>
            )
        };
    };

    function convertDataToOptions(data) {
        return data.reduce((array, item) => {
            return [...array,
            ...[renderItem(item.Product_Category_Code, item.Product_Category_Name)]
            ];
        }, []);
    }

    const handleSearch = values => {
        const searchModel = {
            Status: 'active',
            value: values
        };
        Promise.all([Product_Category_Service.getDataFilter(searchModel)]).then(result => {
            const data = jsonQuery('data[**]docs', { data: result }).value;
            const converted = convertDataToOptions(data);
            setOption(converted);
        });
    };

    const handleSelect = (values, options) => {
        onSelect(values);
    };

    useEffect(() => {
        Promise.all([Product_Category_Service.getDataFilter({})]).then(result => {
            const data = jsonQuery('data[**]docs', { data: result }).value;
            const converted = convertDataToOptions(data);
            setOption(converted);
        });
    }, []);

    return (
        <Col span={12} className={className}>
            <Form.Item name={name}
                label={label}
                rules={[
                    {
                        required: !!required ? required : false,
                        message: !!message ? message : ''
                    }
                ]}
            >
                <AutoComplete
                    style={{
                        width: '100%'
                    }}
                    allowClear={allowClear ? allowClear : false}
                    value={value}
                    options={option}
                    onSelect={handleSelect}
                    onChange={handleSelect}
                    onSearch={handleSearch}
                >
                </AutoComplete>
            </Form.Item>
        </Col>
    );
};

export { Product_Category_CodeAutocomplete };
