import React from 'react';
import jsonQuery from 'json-query';
import { Breadcrumb } from 'antd';
import { TNS_LANGUAGE_LAYOUT } from '../commons';

const Tns_Breadcum = ({ mainLanguage, module, screen }) => {
    const language = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_LAYOUT }).value;
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item> {jsonQuery(['[?]', module], { data: language }).value}</Breadcrumb.Item>
            <Breadcrumb.Item>{screen} </Breadcrumb.Item>
        </Breadcrumb>
    );
};

export { Tns_Breadcum };
