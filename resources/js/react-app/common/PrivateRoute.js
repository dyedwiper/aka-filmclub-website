import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../UserContext';

export default function PrivateRoute({ children }) {
    const { user } = useContext(UserContext);
    const loggedIn = Object.keys(user).length !== 0;

    return <Route>{loggedIn ? children : <Redirect to="/login" />}</Route>;
}
