import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
const BranchList = lazy(() => import('../components/Company/Branch/BranchList'));
const EmployeeList = lazy(() => import('../components/Company/Employee/EmployeeList'));
const CustomerList = lazy(() => import('../components/Company/Customer/CustomerList'));

const routes = [
    { path: '/admin/Branch', exact: false, component: BranchList },
    { path: '/admin/Customer', exact: false, component: CustomerList },
    { path: '/admin/Employee', exact: false, component: EmployeeList }
];

const CompanyModule = () => {
    return (
        <div>
            {routes.map(m => (<Route key={m.path} path={m.path} exact={m.exact ? m.exact : false} component={m.component} />))}
        </div>
    );
};

export { CompanyModule };
