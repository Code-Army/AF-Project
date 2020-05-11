import React, { useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import createCustomer from '../Frontend/Customer/createCustomer';
import loginCustomer from '../Frontend/Customer/loginCustomer';
import DashBoard from '../Frontend/homepage/Header';
import Auth from "../Authentication/Auth";
import CreateAdminUser from "../backend/admin/createAdminUser";

function Routes() {
    const auth = useContext(Auth);
    return (
        <Switch>
            <RouteRegisteration
                path="/signup"
                component={createCustomer}
                Auth={Auth.auth}
            />
            <RouteRegisteration
                path="/signin"
                component={loginCustomer}
                Auth={Auth.Auth}
            />
            <RouteRegisteration
                path="/AdminSignup"
                component={CreateAdminUser}
                Auth={Auth.Auth}
            />
            <RouteProtected
                path="/Homepage"
                component={DashBoard}
                Auth={Auth.Auth}
            />
        </Switch>
    );
}

const RouteRegisteration = ({ Auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                !Auth ? <Component {...props} /> : <Redirect to="/Homepage" />
            }
        />
    );
};

const RouteProtected = ({ Auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                Auth ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );
};

export default Routes;