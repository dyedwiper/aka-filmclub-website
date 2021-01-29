import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './common/Footer';
import Header from './common/Header';
import HomePage from './pages/HomePage';
import NoticesPage from './pages/NoticesPage';

export default function App() {
    return (
        <AppStyled>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/news">
                        <NoticesPage />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </AppStyled>
    );
}

const AppStyled = styled.div`
    height: 100vh;
`;
