import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    CodepenOutlined,
    ShopOutlined,
    PullRequestOutlined,
    UserOutlined,
    AppstoreAddOutlined,
    GoldOutlined,
    HomeOutlined,
    SolutionOutlined,
    TeamOutlined,
    AppstoreOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Tns_SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            {collapsed ? <MenuUnfoldOutlined className='trigger' style={{ color: '#fff', fontSize: 25, margin: '10px 25px' }} onClick={toggle} /> : <MenuFoldOutlined className='trigger' style={{ color: '#fff', fontSize: 25, margin: '10px 25px' }} onClick={toggle} />}
            <div className='logo' style={{ width: '100%', padding: 10, margin: 'auto' }}>
                <img alt='LOGO' style={{ width: '100%' }} src={`https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/95510512_636606040226414_7306354375453048832_o.jpg?_nc_cat=100&ccb=3&_nc_sid=0debeb&_nc_ohc=Qz48mlWNFnEAX94izco&_nc_oc=AQnFGs1RrQtcMOUY93d9iSHLSZf7JL4IR3MzIAXIFQ4QW6NznnPoTu2p3RAtqexKGUI&_nc_ht=scontent-hkt1-1.xx&oh=c6868ce0d19359597d869897e70adb9b&oe=605F401F`} />
            </div>
            <Menu theme='dark' mode='inline' defaultSelectedKeys={['System', 'Products', 'MiniMart']}>
                <SubMenu key='Company' icon={<GoldOutlined />} title='Công ty'>
                    <Menu.Item key='Branch' icon={<HomeOutlined />}>
                        <Link to='/admin/Branch'>Chi nhánh</Link>
                    </Menu.Item>
                    <Menu.Item key='Customer' icon={<SolutionOutlined />}>
                        <Link to='/admin/Customer'>Khách hàng</Link>
                    </Menu.Item>
                    <Menu.Item key='Employee' icon={<TeamOutlined />}>
                        <Link to='/admin/Employee'>Nhân viên</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='System' icon={<SettingOutlined />} title='Hệ thống'>
                    <Menu.Item key='Parameter' icon={<PullRequestOutlined />}>
                        <Link to='/admin/Parameter'>Tham số</Link>
                    </Menu.Item>
                    <Menu.Item key='User' icon={<UserOutlined />}>
                        <Link to='/admin/User'>Người dùng</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='Products' icon={<AppstoreAddOutlined />} title='Sản phẩm'>
                    <Menu.Item key='Product' icon={<CodepenOutlined />}>
                        <Link to='/admin/Product'>Sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key='ProductCategory' icon={<AppstoreOutlined />}>
                        <Link to='/admin/Product_Category'>Danh mục sản phẩm</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='MiniMart' icon={<ShopOutlined />} title='Cửa hàng'>
                    <Menu.Item key='Mart' icon={<ShopOutlined />}>
                        <Link to='/admin/MiniMart'>Cửa hàng</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

export { Tns_SideBar };
