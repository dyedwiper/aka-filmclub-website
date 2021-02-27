import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './common/Footer';
import Header from './common/Header';
import PrivateRoute from './common/PrivateRoute';
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
import EditUserPage from './pages/intern/EditUserPage';
import InternPage from './pages/intern/InternPage';
import UsersPage from './pages/intern/UsersPage';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import NoticesPage from './pages/NoticesPage';
import PressReviewPage from './pages/PressReviewPage';
import ProgramOverviewPage from './pages/ProgramOverviewPage';
import ProgramPage from './pages/ProgramPage';
import ScreeningPage from './pages/ScreeningPage';
import SerialPage from './pages/SerialPage';
import SerialsPage from './pages/SerialsPage';
import UserContext from './UserContext';
import { getCurrentUser } from './utils/userServices';

export default function App() {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading)
        return (
            <AppStyled>
                <LoadingPage />
            </AppStyled>
        );

    return (
        <AppStyled>
            <UserContext.Provider value={{ user, setUser }}>
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
                        <PrivateRoute exact path="/intern">
                            <InternPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/intern/users">
                            <UsersPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/user">
                            <EditUserPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/intern/addSerial">
                            <AddSerialPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editSerial">
                            <EditSerialPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/intern/addScreening">
                            <AddScreeningPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editScreening">
                            <EditScreeningPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/intern/addNotice">
                            <AddNoticePage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editNotice">
                            <EditNoticePage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/addImage">
                            <AddImagePage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editImage">
                            <EditImagePage />
                        </PrivateRoute>
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
            </UserContext.Provider>
        </AppStyled>
    );
}
const AppStyled = styled.div`
    height: 100vh;
`;
