import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Card, Pagination } from 'antd';
import jsonQuery from 'json-query';
import { TNS_METHOD, TNS_RESULT_CODE } from '../../../../commons';

import { getFieldSort } from '../../../Product/Product/Models/Product.Models';
import { Product_Service } from '../../../Product/Product/Services/Product.Services';
import { Product_Category_Service } from '../../../Product/Product_Category/Services/Product_Category.Services';

const { TabPane } = Tabs;
const { Meta } = Card;

const Sell_MiniMart_Header_ProductList = ({ language, onAddProduct }) => {
    const [tabSelected, setTabSelected] = useState('all');
    const [categoryList, setCategoryList] = useState([]);
    const [dataSource, setDataSource] = useState({});
    const [productList, setProductList] = useState([]);
    const [searchOption, setSearchOption] = useState({
        page: 1,
        limit: 12,
        sortFields: getFieldSort(),
        sortAsc: true
    });

    const onPaginationChange = (page, size) => {
        const newOption = { ...searchOption };
        newOption.page = page;
        newOption.limit = size;
        setSearchOption(newOption);
        const query = {
            Product_Category: (tabSelected !== 'all') ? tabSelected : null
        };
        loadProduct(query, newOption);
    };

    const extraTab = [
        <Pagination key={'pagination_choose_product'}
            size='small'
            current={searchOption.page}
            pageSize={searchOption.limit}
            total={!!dataSource ? dataSource.totalDocs : 0}
            onChange={onPaginationChange} />
    ];

    useEffect(() => {
        loadAllCategory();
        if (tabSelected !== 'all') {
            loadProduct({ Product_Category: tabSelected });
        } else {
            loadProduct();
        }
    }, []);

    const onTabsChange = key => {
        const newOption = { ...searchOption };
        newOption.limit = 12;
        newOption.page = 1;
        setSearchOption(newOption);
        setTabSelected(key);
        if (key !== 'all') {
            const query = { Product_Category: key };
            loadProduct(query, newOption);
        } else {
            loadProduct({}, newOption);
        }
    };

    const loadProduct = (query, option) => {
        Promise.all([Product_Service.searchData(!!query ? query : {}, !!option ? option : searchOption)]).then(productResult => {
            if (productResult[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                const data = jsonQuery('data[0]', { data: productResult }).value;
                setProductList(data.docs);
                setDataSource(data);
            }
        });
    };

    const loadAllCategory = () => {
        Promise.all([Product_Category_Service.getDataFilter({})]).then(categoryResult => {
            if (categoryResult[0].returnCode === TNS_RESULT_CODE.SUCCESS) {
                const data = jsonQuery('data[**]docs', { data: categoryResult }).value;
                setCategoryList(data);
            }
        });
    };

    const onSelectProduct = e => {
        const id = parseInt(e.target.id, 10);
        if (!Number.isNaN(id)) {
            onAddProduct(id);
        }
    };

    return (
        <Row className='tns-product-select' style={{ margin: 5, borderRadius: 5 }}>
            <Card key='card1' bodyStyle={{ padding: '0px 5px', margin: '5px 0', width: '100%' }} style={{ width: '100%', borderRadius: 5 }}>
                <Tabs defaultActiveKey={tabSelected}
                    tabPosition='top'
                    type='card'
                    onChange={onTabsChange}
                    tabBarExtraContent={extraTab}
                >
                    <TabPane tab={language.ALL_PRODUCT} key='all'>
                        {!!productList ? (
                            <Row gutter={6}>
                                {productList.map(product => (
                                    <Col key={product._id} span='4' onClick={onSelectProduct}>
                                        <Card key={`card-${product._id}`}
                                            style={{ padding: 5, borderRadius: 5, marginBottom: 5 }}
                                            bodyStyle={{ padding: 5 }}
                                            cover={<img alt={product.Product_Name}
                                                src={product.Product_Image[0].thumbUrl}
                                                id={product._id}
                                            />}
                                        >
                                            <Meta title={product.Product_Name} description={TNS_METHOD.convertCurrency(product.Product_SalePrice)} />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : null}
                    </TabPane>
                    {!!categoryList ? (
                        categoryList.map(category => (
                            <TabPane tab={category.Product_Category_Name} key={category.Product_Category_Code}>
                                {!!productList ? (
                                    <Row gutter={6}>
                                        {productList.map(product => (
                                            <Col key={product._id} span='4' onClick={onSelectProduct}>
                                                <Card key={`card-${product._id}`}
                                                    style={{ padding: 5, borderRadius: 5, marginBottom: 5  }}
                                                    bodyStyle={{ padding: 5 }}
                                                    cover={<img alt={product.Product_Name}
                                                        src={product.Product_Image[0].thumbUrl}
                                                        id={product._id}
                                                    />}
                                                >
                                                    <Meta title={product.Product_Name} description={TNS_METHOD.convertCurrency(product.Product_SalePrice)} />
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                ) : null}
                            </TabPane>
                        ))
                    ) : null}
                </Tabs>
            </Card>
        </Row>
    );
};

export { Sell_MiniMart_Header_ProductList };
