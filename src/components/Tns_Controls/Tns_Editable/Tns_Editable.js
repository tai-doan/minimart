import React, { useContext, useState, useRef, createContext } from 'react';
import { Form, InputNumber, Input } from 'antd';

const EditableContext = createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({ title, editable, type, children, dataIndex, record, onSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex]
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            onSave({ ...record, ...values });
        } catch (errInfo) {
            // console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ?
            type === 'number' ? (
                <Form.Item style={{ margin: 0 }}
                    name={dataIndex}
                >
                    <InputNumber style={{ width: '100%', backgroundColor: '#dfdfdf' }}
                        min={0}
                        ref={inputRef}
                        onPressEnter={save}
                        onBlur={save}
                    />
                </Form.Item>
            ) : (
                <Form.Item style={{ margin: 0 }}
                    name={dataIndex}
                >
                    <Input style={{ width: '100%', backgroundColor: '#dfdfdf' }}
                        ref={inputRef}
                        onPressEnter={save}
                        onBlur={save}
                    />
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap"
                    style={{
                        padding: '5px 10px',
                        borderRadius: 5,
                        backgroundColor: '#dfdfdf'
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

export { EditableRow, EditableCell };
