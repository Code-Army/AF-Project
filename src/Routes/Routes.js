import React, { useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from "../Authentication/Auth";
import CreateAdminUser from "../backend/admin/createAdminUser";

function Routes() {
    const auth = useContext(Auth);
    return (
        <Switch>
            <RouteRegisteration
                path="/AdminSignup"
                component={CreateAdminUser}
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