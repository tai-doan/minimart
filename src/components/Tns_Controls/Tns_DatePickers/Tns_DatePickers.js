import React, { useState, useEffect } from 'react';
import { DatePicker, Col, Form, ConfigProvider } from 'antd';
import locale from 'antd/es/date-picker/locale/en_US';
import moment from 'moment';

const formatDateMonthYear = 'DD-MM-YYYY';

const Tns_DatePickers = ({ span, label, bordered, format, value, showTime, className, name, disabled, allowClear, mode, onChange, required, message }) => {
    const [selectValue, setSelectValue] = useState(value);

    useEffect(() => {
        setSelectValue(value);
    }, [value, name]);

    const onDateChange = (date, dateString) => {
        setSelectValue(date);
        onChange(date);
    };

    return (
        <Col span={span ? span : 12} className={className}>
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
                    <DatePicker style={{ width: '100%' }}
                        bordered={bordered}
                        value={!!selectValue ? moment(selectValue) : null}
                        format={!!format ? format : formatDateMonthYear}
                        showTime={!!showTime ? showTime : false}
                        className={!!className ? className : null}
                        disabled={!!disabled ? disabled : null}
                        allowClear={!!allowClear ? allowClear : null}
                        mode={!!mode ? mode : 'date'}
                        onChange={onDateChange}
                    />
                </ConfigProvider>
            </Form.Item>
        </Col>
    );
};

export { Tns_DatePickers };
