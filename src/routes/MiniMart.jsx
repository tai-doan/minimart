import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
const Sell_MiniMartList = lazy(() => import('../components/MiniMart/Sell_MiniMart/Sell_MiniMartList'));
const Sell_MiniMartAdd = lazy(() => import('../components/MiniMart/Sell_MiniMart/Sell_MiniMartAdd'));
const Sell_MiniMartEdit = lazy(() => import('../components/MiniMart/Sell_MiniMart/Sell_MiniMartEdit'));

const routes = [
    { path: '/admin/MiniMart', exact: false, component: Sell_MiniMartList },
    { path: '/admin/Sell_MiniMartAdd', exact: false, component: Sell_MiniMartAdd },
    { path: '/admin/Sell_MiniMartEdit', exact: false, component: Sell_MiniMartEdit }
];

const MiniMartModule = () => {
    return (
        <div>
            {routes.map(m => (<Route key={m.path} path={m.path} exact={m.exact ? m.exact : false} component={m.component} />))}
        </div>
    );
};

export { MiniMartModule };
