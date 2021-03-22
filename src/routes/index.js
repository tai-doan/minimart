import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Admin_Layout } from '../layouts/Admin_Layout';
import { Public_Layout } from '../layouts/Public_Layout';
import { Dashboard } from '../layouts/Dashboard';

import { CompanyModule } from './Company';
import { SystemModule } from './System';
import { ProductModule } from './Product';
import { MiniMartModule } from './MiniMart';

const LoginPage = lazy(() => import('../authenticates/Login/Login'));

const Routers = () => {
    return (
        <div className="trinhatslution-app">
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <Switch>
                        <Route path='/login' exact component={LoginPage} />
                        <Route path='/admin/:path?' exact>
                            <Admin_Layout>
                                {/* <Switch> */}
                                <Route path='/admin' exact component={Dashboard} />
                                <CompanyModule />
                                <SystemModule />
                                <ProductModule />
                                <MiniMartModule />
                                {/* </Switch> */}
                            </Admin_Layout>
                        </Route>
                        <Route>
                            <Public_Layout>
                                <Switch>
                                    <Route path='/' exact component={LoginPage} />
                                </Switch>
                            </Public_Layout>
                        </Route>
                    </Switch>
                </Router>
            </Suspense>
        </div>
    );
}

export { Routers };
