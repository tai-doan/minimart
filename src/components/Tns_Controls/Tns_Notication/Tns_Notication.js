import React from 'react';
import { Button, notification, Divider, Space } from 'antd';
import {
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
} from '@ant-design/icons';

const Context = React.createContext({ name: 'Default' });

const Tns_Notication = ({ type, message, description }) => {
    const [api, contextHolder] = notification.useNotification();
    if (type === 'success' || type === 'error' || type === 'info' || type === 'warning' || type === 'open') {
        api.type({
            message,
            description: <Context.Consumer>{description}</Context.Consumer>,
            placement: 'topLeft',
            duration: 1
        })
    }

    return (
        <Context.Provider>
            {contextHolder}
        </Context.Provider>
    )
}

const Demo = () => {
    const [api, contextHolder] = notification.useNotification();

    const createNotification = placement => {
        api.info({
            message: `Notification ${placement}`,
            description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
            placement,
        });
    };

    return (
        <Context.Provider value={{ name: 'Ant Design' }}>
            {contextHolder}
            <Space>
                <Button type="primary" onClick={() => createNotification('topLeft')}>
                    <RadiusUpleftOutlined />
          topLeft
        </Button>
                <Button type="primary" onClick={() => createNotification('topRight')}>
                    <RadiusUprightOutlined />
          topRight
        </Button>
            </Space>
            <Divider />
            <Space>
                <Button type="primary" onClick={() => createNotification('bottomLeft')}>
                    <RadiusBottomleftOutlined />
          bottomLeft
        </Button>
                <Button type="primary" onClick={() => createNotification('bottomRight')}>
                    <RadiusBottomrightOutlined />
          bottomRight
        </Button>
            </Space>
        </Context.Provider>
    );
};

export { Tns_Notication };
