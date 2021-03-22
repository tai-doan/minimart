import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import jsonQuery from 'json-query';

import { Product_Service } from '../../../Product/Product/Services/Product.Services';

const { Option } = Select;

const Sell_MiniMart_Header_ProductSearch = ({ name, disabled, mode, allowClear, placeholder, value, onChange, onAddProduct }) => {
    const [selectValue, setSelectValue] = useState(!!value ? value : undefined);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        Promise.all([Product_Service.getDataFilter({})]).then(result => {
            const data = jsonQuery('data[**]docs', { data: result }).value;
            setSelectValue(!!value ? value : undefined);
            setDataSource(data);
        });
        return () => {
            setSelectValue(undefined);
            setDataSource([]);
        }
    }, [name, value]);

    const handleChange = values => {
        setSelectValue(values);
        // onChange(values);
    };

    const handleSelect = id => {
        onAddProduct(id);
    };


    return (
        <Select mode={mode ? mode : null}
            showSearch
            style={{ width: 200 }}
            placeholder={!!placeholder ? placeholder : null}
            optionFilterProp='children'
            allowClear={allowClear ? allowClear : false}
            disabled={(disabled) ? disabled : false}
            onChange={handleChange}
            onSelect={handleSelect}
            value={selectValue}
        >
            {dataSource.map(child => <Option key={child._id} value={child._id}>{child.Product_Name}</Option>)}
        </Select>
    );
};

export { Sell_MiniMart_Header_ProductSearch };
