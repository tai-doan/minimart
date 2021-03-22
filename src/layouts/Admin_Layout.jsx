import React from 'react';
import { Layout } from 'antd';
import { Tns_SideBar, Tns_Header, Tns_Footer } from './index';

const Admin_Layout =  ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Tns_SideBar />
            <Layout className='site-layout'>
                <Tns_Header />
                {children}
                <Tns_Footer />
            </Layout>
        </Layout>
    )
}

export { Admin_Layout };
