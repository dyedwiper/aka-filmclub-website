import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './common/Footer';
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
            <Footer />
        </AppStyled>
    );
}

const AppStyled = styled.div`
    height: 100vh;
`;
