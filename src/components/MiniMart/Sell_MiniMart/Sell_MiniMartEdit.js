import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Layout, PageHeader } from 'antd';
import jsonQuery from 'json-query';

import { TNS_LANGUAGE_COMPONENTS, TNS_RESULT_CODE, TNS_MINIMART_STATUS, TNS_METHOD, TNS_NOTICATION_TYPE } from '../../../commons';
import { authenticationService } from '../../../authenticates/Services/Authentication.Service';

import { LANGUAGE_COMPONENT } from './Languages/languages';
import { Sell_MiniMart_Detail } from './Controls/Sell_MiniMart.Detail';
import { Sell_MiniMart_Header } from './Controls/Sell_MiniMart.Header';
import { defaultHeaderModel } from './Models/Sell_MiniMart.HeaderModel';
import { Sell_MiniMart_Header_Service } from './Services/Sell_MiniMart.Services';

const { Content } = Layout;

const Sell_MiniMartEdit = () => {
    const history = useHistory();
    const [detailModel, setDetailModel] = useState({});
    const [headerModel, setHeaderModel] = useState(defaultHeaderModel);
    const { mainLanguage, code, id, mode } = history.location.state;
    const language = jsonQuery([mainLanguage[0]], { data: LANGUAGE_COMPONENT }).value;
    const commonLanguage = jsonQuery([mainLanguage[0]], { data: TNS_LANGUAGE_COMPONENTS }).value;

    useEffect(() => {
        const user = authenticationService.getUserLogin();
        Promise.all([Sell_MiniMart_Header_Service.getByID(id), Sell_MiniMart_Header_Service.getProductByInvoice(code)]).then(result => {
            const headerData = jsonQuery('data[0]', { data: result[0] }).value;
            const detailData = jsonQuery('data[**]', { data: result[1] }).value;
            headerData.Sell_MiniMart_Header_Employee = user.User_Employee;
            setHeaderModel(headerData);
            setDetailModel({
                docs: detailData,
                totalDocs: detailData.length
            });
        });
    }, [id, code]);

    const onDetailChange = data => {
        setDetailModel(data);
        const header = { ...headerModel };
        const detailModels = jsonQuery('docs[**]', { data }).value;
        header.Sell_MiniMart_Header_TotalQuantity = detailModels.reduce((arr, cur) => arr + cur.Product_Quantity, 0);
        header.Sell_MiniMart_Header_TotalSellPrice = detailModels.reduce((arr, cur) => arr + (cur.Product_Quantity * cur.Product_SalePrice), 0);
        header.Sell_MiniMart_Header_TotalStockPrice = detailModels.reduce((arr, cur) => arr + (cur.Product_Quantity * cur.Product_StockPrice), 0);
        header.Sell_MiniMart_Header_Discount = detailModels.reduce((arr, cur) => Math.floor(arr + (cur.Product_Discount * cur.Product_Quantity)), 0);
        header.Sell_MiniMart_Header_TotalPrice = Math.floor(header.Sell_MiniMart_Header_TotalSellPrice - header.Sell_MiniMart_Header_Discount);
        header.Sell_MiniMart_Header_PaidRemain = header.Sell_MiniMart_Header_TotalPrice - header.Sell_MiniMart_Header_PaidAmount;
        setHeaderModel(header);
    };

    const onHeaderChange = data => {
        setHeaderModel(data);
    };

    const saveData = header => {
        Promise.all([Sell_MiniMart_Header_Service.updateModel(header), Sell_MiniMart_Header_Service.deleteDetailModel(code)]).then(result => {
            if (result[0].returnCode === TNS_RESULT_CODE.SUCCESS && result[1].returnCode === TNS_RESULT_CODE.SUCCESS) {
                const data = jsonQuery('data', { data: result[0] }).value;
                const detailModels = jsonQuery('docs[**]', { data: detailModel }).value;
                const detail = detailModels.map(x => ({ ...x, ...{ Sell_MiniMart_Header_Code: data.Sell_MiniMart_Header_Code } }));
                Promise.all([Sell_MiniMart_Header_Service.createDetailModel(detail)]);
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.SUCCESS, 'X??? l?? th??nh c??ng', 'H??a ????n ???? ???????c l??u th??nh c??ng');
            } else {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.ERROR, 'X??? l?? th???t b???i', 'C?? l???i trong qu?? tr??nh l??u h??a ????n, vui l??ng th??? l???i sau');
            }
        });
    };

    const refreshData = () => {
        const header = { ...defaultHeaderModel };
        const user = authenticationService.getUserLogin();
        header.Sell_MiniMart_Header_Employee = user.User_Employee;
        setHeaderModel(header);
        setDetailModel({});
    };

    const onSaveDraft = () => {
        const header = { ...headerModel };
        header.Status = TNS_MINIMART_STATUS.DRAFT;
        saveData(header);
    };

    const onPayment = () => {
        if (headerModel.Sell_MiniMart_Header_PaidAmount < headerModel.Sell_MiniMart_Header_TotalPrice) {
            TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'B???n ch??a thanh to??n ????? ti???n', 'Vui l??ng thanh to??n ????? ti???n');
        } else {
            if (!headerModel.Sell_MiniMart_Header_Customer || headerModel.Sell_MiniMart_Header_Customer === '' || headerModel.Sell_MiniMart_Header_Customer === undefined) {
                TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Kh??ch h??ng kh??ng ???????c ????? tr???ng', 'Vui l??ng ch???n kh??ch h??ng');
            } else {
                const detail = jsonQuery('docs[**]', { data: detailModel }).value;
                if (!detail || detail.length === 0) {
                    TNS_METHOD.createNotification(TNS_NOTICATION_TYPE.WARNING, 'Kh??ng c?? s???n ph???m n??o ???????c ch???n', 'Vui l??ng ch???n ??t nh???t m???t s???n ph???m ????? thanh to??n');
                } else {
                    const header = { ...headerModel };
                    header.Status = TNS_MINIMART_STATUS.COMPLETE;
                    saveData(header);
                    refreshData();
                }
            }
        }
    };

    return (
        <Layout style={{ padding: 10 }}>
            <Content className='site-layout-background minimart'>
                <PageHeader style={{ padding: 0 }}
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    subTitle={commonLanguage.BACK}
                />
                <Layout >
                    <Row>
                        <Col span={17}>
                            <Sell_MiniMart_Detail language={language}
                                commonLanguage={commonLanguage}
                                mainLanguage={mainLanguage}
                                value={detailModel}
                                onChange={onDetailChange}
                                onSaveDraft={onSaveDraft}
                            />
                        </Col>
                        <Col span={7}>
                            <Sell_MiniMart_Header language={language}
                                commonLanguage={commonLanguage}
                                mode={mode}
                                value={headerModel}
                                onChange={onHeaderChange}
                                onPayment={onPayment}
                                onPaymentPrint={onPayment}
                            />
                        </Col>
                    </Row>
                </Layout>
            </Content>
        </Layout>
    );
};

export { Sell_MiniMartEdit as default };
