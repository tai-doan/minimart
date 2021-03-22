import React, { useState, useEffect } from 'react';
import { DatePicker, Col, Form, ConfigProvider } from 'antd';
import locale from 'antd/es/date-picker/locale/en_US';
import moment from 'moment';

const { RangePicker } = DatePicker;
const formatDateMonthYear = 'DD-MM-YYYY';

const Tns_DateRangePickers = ({ label, format, value, showTime, className, name, disabled, allowClear, mode, onChange, required, message }) => {
    const [selectValue, setSelectValue] = useState(value);

    useEffect(() => {
        setSelectValue(value);
    }, [value, name]);

    const onDateChange = (date, dateString) => {
        setSelectValue(!!date ? date : []);
        onChange(date);
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
                <ConfigProvider locale={locale}>
                    <RangePicker style={{ width: '100%' }}
                        format={formatDateMonthYear}
                        value={(!!selectValue[0] && !!selectValue[1]) ? [moment(selectValue[0]), moment(selectValue[1])] : [null, null]}
                        onChange={onDateChange}
                    />
                </ConfigProvider>
            </Form.Item>
        </Col>
    );
};

export { Tns_DateRangePickers };
