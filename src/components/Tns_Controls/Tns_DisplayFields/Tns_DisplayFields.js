import React, { useState } from 'react';
import { Drawer, Button, Checkbox, Row, Col, Tooltip } from 'antd';
import {
    SettingOutlined
} from '@ant-design/icons';
import jsonQuery from 'json-query';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import { TNS_DISPLAY_AREA_KEY, TNS_DISPLAY_AREA_STORAGE } from '../../../commons/index';

const renderSelect = (column, onChange) => (
    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}
        value={column.data}>
        <Row>
            {column.fields.map(col =>
                <Col key={col.key + Math.floor(Math.random() * 100)} span={12}>
                    <Checkbox key={col.key} value={col.key}>{col.title}</Checkbox>
                </Col>
            )}
        </Row>
    </Checkbox.Group>
)

const Tns_DisplayFields = ({ mainLanguage, screenNo, onDisplayChange, columns, className, style }) => {
    const language = jsonQuery(mainLanguage[0], { data: LANGUAGE_COMPONENT }).value;

    const [visible, setVisible] = useState(false);

    const onShowDrawer = () => {
        setVisible(true);
    };

    const hiddenDrawer = () => {
        setVisible(false);
    };

    const onReset = () => {
        const displayModalFormKey = screenNo + TNS_DISPLAY_AREA_KEY.modalForm;
        const displayModalFormDetail = screenNo + TNS_DISPLAY_AREA_KEY.modalFormDetail;
        localStorage.removeItem(displayModalFormKey);
        localStorage.removeItem(displayModalFormDetail);
        if (onDisplayChange) {
            onDisplayChange(null);
        }
    };

    const handleDisplayFieldOnModalFormChange = values => {
        const displayModalFormKey = screenNo + TNS_DISPLAY_AREA_KEY.modalForm;
        localStorage.setItem(displayModalFormKey, JSON.stringify(values));
        onDisplayChange(TNS_DISPLAY_AREA_STORAGE.editField, values);
    };

    const handleDisplayFieldOnDetailResultChange = values => {
        const displayModalFormKey = screenNo + TNS_DISPLAY_AREA_KEY.detailModalKeys;
        localStorage.setItem(displayModalFormKey, JSON.stringify(values));
        onDisplayChange(TNS_DISPLAY_AREA_STORAGE.detailModalKeys, values);
    };

    return (
        <span className={className} style={style}>
            <Tooltip placement='leftBottom' title={language.TITLE} >
                <SettingOutlined onClick={onShowDrawer} style={{ marginBottom: 5, fontSize: 25, verticalAlign: 'middle' }} />
            </Tooltip>

            <Drawer title={language.TITLE}
                width={'30vw'}
                closable={false}
                onClose={hiddenDrawer}
                visible={visible}
                footer={[
                    <div>
                        <Button onClick={onReset}>
                            {language.RESET}
                        </Button>
                        <Button onClick={hiddenDrawer} type='primary' style={{ margin: '0px 5px' }}>
                            {language.CLOSE}
                        </Button>
                    </div>
                ]}
            >
                {
                    columns.map((column, index) =>
                        column.type === TNS_DISPLAY_AREA_STORAGE.modalField ? (
                            //Hiển thị các field mặc định/header của modal
                            <div className='tns-display-column-result' key={index}>
                                <span style={{ fontWeight: 'bold', fontSize: 15 }}>{language.TITLE_MODAL_FORM}</span>
                                {renderSelect(column, handleDisplayFieldOnModalFormChange)}
                            </div>
                        ) : column.type === TNS_DISPLAY_AREA_STORAGE.detailModalKeys ? (
                            // Hiển thị các field của detail (table) nếu có
                            <div className='tns-display-column-detail-result' key={index}>
                                <span style={{ fontWeight: 'bold', fontSize: 15 }}>{language.TITLE_MODAL_FORM}</span>
                                {renderSelect(column, handleDisplayFieldOnDetailResultChange)}
                            </div>
                        ) : null
                    )
                }
            </Drawer>
        </span>
    );
};

export { Tns_DisplayFields };
