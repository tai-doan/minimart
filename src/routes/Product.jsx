import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ProductList = lazy(() => import('../components/Product/Product/ProductList'));
const Product_CategoryList = lazy(() => import('../components/Product/Product_Category/Product_CategoryList'));

const routes = [
    { path: '/admin/Product', exact: false, component: ProductList },
    { path: '/admin/Product_Category', exact: false, component: Product_CategoryList }
];

const ProductModule = () => {
    return (
        <div>
            {routes.map(m => (<Route key={m.path} path={m.path} exact={m.exact ? m.exact : false} component={m.component} />))}
        </div>
    );
};

export { ProductModule };
