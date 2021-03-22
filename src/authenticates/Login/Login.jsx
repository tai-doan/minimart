import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import jsonQuery from 'json-query';
import { authenticationService } from '../Services/Authentication.Service';
import { LANGUAGE_COMPONENT } from './Languages/languages';
import './Css/login.css';

const LoginPage = () => {
    const mainLanguage = 'vi';
    const language = jsonQuery([mainLanguage], { data: LANGUAGE_COMPONENT }).value;
    const history = useHistory();
    const onFinish = ({ username, password }) => {
        Promise.all([authenticationService.login(username, password)]).then(result => {
            if (result[0].success) {
                Promise.all([authenticationService.getUserAuthorization()]).then(ok => {
                    history.push('admin');
                });
            }
        });
    };

    if(authenticationService.isLogin()){
        history.push('admin');
        return '';
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <Row style={{marginTop: '20vh'}}>
                <Col span='8' offset='8'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={language.USERNAME} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder={language.PASSWORD}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>{language.REMEMBER}</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {language.LOGIN}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export { LoginPage as default };
