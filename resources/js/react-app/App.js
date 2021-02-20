import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './common/Footer';
import Header from './common/Header';
import AboutPage from './pages/AboutPage';
import ArchivePage from './pages/ArchivePage';
import ErrorPage from './pages/ErrorPage';
import FaqsPage from './pages/FaqsPage';
import HomePage from './pages/HomePage';
import AddImagePage from './pages/intern/AddImagePage';
import AddNoticePage from './pages/intern/AddNoticePage';
import AddScreeningPage from './pages/intern/AddScreeningPage';
import AddSerialPage from './pages/intern/AddSerialPage';
import EditImagePage from './pages/intern/EditImagePage';
import EditNoticePage from './pages/intern/EditNoticePage';
import EditScreeningPage from './pages/intern/EditScreeningPage';
import EditSerialPage from './pages/intern/EditSerialPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import NoticesPage from './pages/NoticesPage';
import PressReviewPage from './pages/PressReviewPage';
import ProgramOverviewPage from './pages/ProgramOverviewPage';
import ProgramPage from './pages/ProgramPage';
import ScreeningPage from './pages/ScreeningPage';
import SerialPage from './pages/SerialPage';
import SerialsPage from './pages/SerialsPage';

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
                    <Route exact path="/program/overview">
                        <ProgramOverviewPage />
                    </Route>
                    <Route exact path="/program/archive">
                        <ArchivePage />
                    </Route>
                    <Route path="/screening">
                        <ScreeningPage />
                    </Route>
                    <Route exact path="/program/serials">
                        <SerialsPage />
                    </Route>
                    <Route path="/serial">
                        <SerialPage />
                    </Route>
                    <Route exact path="/about">
                        <AboutPage />
                    </Route>
                    <Route exact path="/faqs">
                        <FaqsPage />
                    </Route>
                    <Route exact path="/press">
                        <PressReviewPage />
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/intern/addSerial">
                        <AddSerialPage />
                    </Route>
                    <Route path="/intern/editSerial">
                        <EditSerialPage />
                    </Route>
                    <Route exact path="/intern/addScreening">
                        <AddScreeningPage />
                    </Route>
                    <Route path="/intern/editScreening">
                        <EditScreeningPage />
                    </Route>
                    <Route exact path="/intern/addNotice">
                        <AddNoticePage />
                    </Route>
                    <Route path="/intern/editNotice">
                        <EditNoticePage />
                    </Route>
                    <Route path="/intern/addImage">
                        <AddImagePage />
                    </Route>
                    <Route path="/intern/editImage">
                        <EditImagePage />
                    </Route>
                    <Route path="/error">
                        <ErrorPage />
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
