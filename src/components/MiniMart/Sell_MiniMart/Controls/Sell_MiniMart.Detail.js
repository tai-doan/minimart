import React, { useState } from 'react';
import { Row, PageHeader, Card, Button, Table } from 'antd';
import jsonQuery from 'json-query';

import { TNS_RESULT_CODE, TNS_DISPLAY_AREA_STORAGE, TNS_SCREEN } from '../../../../commons';
import { Tns_DisplayFields, EditableCell, EditableRow } from '../../../Tns_Controls';
import { Tns_ResultTable } from '../../../Tns_Controls/Tns_ResultTable/Tns_ResultTable';

import { defaultColumnInResultTableSelected, setFieldInTable, getFieldInTable, defaultFieldDetail } from '../Models/Sell_MiniMart.DetailModel';
import { Product_Service } from '../../../Product/Product/Services/Product.Services';
import { Sell_MiniMart_Header_ProductList } from './Sell_MiniMart.ProductList';
import { Sell_MiniMart_Header_ProductSearch } from './Sell_MiniMart.ProductSearch';

const Sell_MiniMart_Detail = ({ language, commonLanguage, mainLanguage, value, onChange, onSaveDraft }) => {
    const [displayDefaultFieldOnTable, setDisplayDefaultFieldOnTable] = useState(getFieldInTable());
    const displayFieldOnTable = defaultFieldDetail(language);

    const onDisplayChange = (type, values) => {
        if (type !== null && values !== undefined) {
            setFieldInTable(values);
            setDisplayDefaultFieldOnTable(values);
        } else {
            setDisplayDefaultFieldOnTable(getFieldInTable());
        }
    };

    const onSelectProduct = id => {
        Promise.all([Product_Service.getByID(id)]).then(resultProductAdd => {
            if (resultProductAdd[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                const list = jsonQuery('docs[**]', { data: value }).value;
                const data = jsonQuery('data[0]', { data: resultProductAdd }).value;
                const index = list.findIndex(x => x._id === data._id);
                if (index === -1) {
                    list.push({
                        _id: data._id,
                        Product_Code: data.Product_Code,
                        Product_Name: data.Product_Name,
                        Product_SalePrice: data.Product_SalePrice,
                        Product_StockPrice: data.Product_StockPrice,
                        Product_Quantity: 1,
                        Product_Discount: 0,
                        Product_Category: data.Product_Category,
                        Product_CategoryObject: data.Product_CategoryObject
                    });
                } else {
                    list[index].Product_Quantity = list[index].Product_Quantity + 1;
                }
                onChange({
                    docs: list,
                    totalDocs: list.length
                });
            }
        });
    };

    const onDelete = id => {
        const data = jsonQuery('docs[**]', { data: value }).value;
        const newData = data.filter(item => item._id !== id);
        onChange({
            docs: newData,
            totalDocs: newData.length
        });
    };

    const onSave = row => {
        const newData = jsonQuery('docs[**]', { data: value }).value;
        const index = newData.findIndex(i => row._id === i._id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        onChange({
            docs: newData,
            totalDocs: newData.length
        });
    };

    const dataSource = value;
    const columnResultTable = defaultColumnInResultTableSelected(language, commonLanguage, getFieldInTable(), onDelete);
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    };
    const columns = columnResultTable.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                onSave,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                type: col.type
            })
        };
    });

    return (
        <div>
            <Row className='minimart-detail' style={{ margin: 5, borderRadius: 5 }}>
                <Card key='card0' bodyStyle={{ padding: '0px 5px', margin: '5px 0', width: '100%' }} style={{ width: '100%', borderRadius: 5 }}>
                    <PageHeader style={{ padding: 0, margin: 10 }}
                        className="site-page-header"
                        subTitle={language.CHOOSE_PRODUCT}
                        extra={[
                            <Sell_MiniMart_Header_ProductSearch key='searchProduct'
                                value={''}
                                allowClear={true}
                                placeholder={language.SEARCH_PRODUCT}
                                onAddProduct={onSelectProduct}
                            />,
                            <Button key='saveDraft' type='primary' onClick={onSaveDraft}>{commonLanguage.DRAFT}</Button>
                            // <Tns_DisplayFields //style={{ position: 'absolute', right: '15px', 'zIndex': '1' }}
                            //     columns={[{ fields: displayFieldOnTable, type: TNS_DISPLAY_AREA_STORAGE.detailModalKeys, data: displayDefaultFieldOnTable }]}
                            //     screenNo={TNS_SCREEN.Sell_MiniMart}
                            //     onDisplayChange={onDisplayChange}
                            //     mainLanguage={mainLanguage} />
                        ]}
                    />
                    <Table bordered
                        components={components}
                        rowClassName={() => 'editable-row'}
                        rowKey='_id'
                        pagination={false}
                        hiddenSelection={true}
                        dataSource={dataSource.docs}
                        columns={columns}
                        scroll={{ y: '40vh' }}
                    />
                    {/* <Tns_ResultTable columns={columns}
                        data={dataSource}
                        component={components}
                        pagination={false}
                        hiddenSelection={true}
                        scrollY='40vh'
                    /> */}
                </Card>
            </Row>
            <Sell_MiniMart_Header_ProductList language={language}
                onAddProduct={onSelectProduct} />
        </div>
    );
};


export { Sell_MiniMart_Detail };
