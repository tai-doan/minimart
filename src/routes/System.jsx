import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ParameterList = lazy(() => import('../components/System/Parameter/ParameterList'));
const UserList = lazy(() => import('../components/System/User/UserList'));

const routes = [
    { path: '/admin/Parameter', exact: false, component: ParameterList },
    { path: '/admin/User', exact: false, component: UserList }
];

const SystemModule = () => {
    return (
        <div>
            {routes.map(m => (<Route key={m.path} path={m.path} exact={m.exact ? m.exact : false} component={m.component} />))}
        </div>
    );
};

export { SystemModule };
