import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from './common/Header';
import HomePage from './pages/HomePage';

export default function App() {
    return (
        <AppStyled>
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </Router>
        </AppStyled>
    );
}

const AppStyled = styled.div`
    height: 100vh;
    background-color: deeppink;
`;
