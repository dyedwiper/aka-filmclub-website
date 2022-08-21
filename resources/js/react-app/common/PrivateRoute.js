import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTE_LOGIN } from '../constants';
import Context from '../Context';

export default function PrivateRoute({ path, children }) {
    const { isUserLoggedIn } = useContext(Context);

    return <Route path={path}>{isUserLoggedIn ? children : <Redirect to={ROUTE_LOGIN} />}</Route>;
}
