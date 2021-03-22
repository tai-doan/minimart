import React from 'react';
import { Layout, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { authenticationService } from '../authenticates/Services/Authentication.Service';

const Tns_Header = () => {
    const { Header } = Layout;
    const history = useHistory();

    if (!authenticationService.isLogin()) {
        history.push('/login');
        return '';
    }

    const logout = () => {
        authenticationService.logout();
        history.push('/login');
    };

    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Button onClick={logout}>Đăng xuất</Button>
        </Header>
    );
};

export { Tns_Header };

