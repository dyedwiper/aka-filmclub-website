import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './common/Footer';
import Header from './common/Header';
import ArchivePage from './pages/ArchivePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import NoticesPage from './pages/NoticesPage';
import ProgramPage from './pages/ProgramPage';
import ScreeningPage from './pages/ScreeningPage';

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
                    <Route exact path="/archive">
                        <ArchivePage />
                    </Route>
                    <Route path="/screening">
                        <ScreeningPage />
                    </Route>
                    <Route path="/404">
                        <NotFoundPage />
                    </Route>
                    <Redirect to="/404" />
                </Switch>
                <Footer />
            </Router>
        </AppStyled>
    );
}

const AppStyled = styled.div`
    height: 100vh;
`;
