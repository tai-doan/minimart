import React from 'react';
import { InputNumber, Col, Form } from 'antd';

const Tns_InputNumber = ({ span, value, label, bordered, format, parse, disabled, required, message, name, className, onChange, min, max }) => {
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
                <InputNumber disabled={disabled ? disabled : false}
                    bordered={bordered}
                    style={{ width: '100%' }}
                    value={!!value ? value : 0}
                    min={(min !== undefined) ? min : -99999999999}
                    max={(max !== undefined) ? max : 99999999999}
                    formatter={!!format ? format : (values => `$ ${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
                    parser={!!parse ? parse : (values => values.replace(/\$\s?|(,*)/g, ''))}
                    onChange={onChange}
                />
            </Form.Item>
        </Col>
    );
};

export { Tns_InputNumber };
