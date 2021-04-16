import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Context from '../Context';

export default function PrivateRoute({ children }) {
    const { user } = useContext(Context);
    const loggedIn = Object.keys(user).length !== 0;

    return <Route>{loggedIn ? children : <Redirect to={ROUTE_LOGIN} />}</Route>;
}
