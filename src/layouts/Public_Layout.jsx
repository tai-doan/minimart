import React from 'react';
import { Layout } from 'antd';

const Public_Layout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {children}
        </Layout>
    )
}

export { Public_Layout };