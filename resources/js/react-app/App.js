import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './common/Footer';
import Header from './common/Header';
import HomePage from './pages/HomePage';
import NoticesPage from './pages/NoticesPage';
import ProgramPage from './pages/ProgramPage';

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
                    <Route exact path="/program">
                        <ProgramPage />
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
