import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './common/Footer';
import Header from './common/Header';
import PrivateRoute from './common/PrivateRoute';
import Context from './Context';
import AboutPage from './pages/AboutPage';
import ArchivePage from './pages/ArchivePage';
import AwardsPage from './pages/AwardsPage';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';
import FaqsPage from './pages/FaqsPage';
import HomePage from './pages/HomePage';
import AddBillingPage from './pages/intern/AddBillingPage';
import AddDistributorPage from './pages/intern/AddDistributorPage';
import AddFaqPage from './pages/intern/AddFaqPage';
import AddImagePage from './pages/intern/AddImagePage';
import AddNoticePage from './pages/intern/AddNoticePage';
import AddScreeningPage from './pages/intern/AddScreeningPage';
import AddSerialPage from './pages/intern/AddSerialPage';
import AddUserPage from './pages/intern/AddUserPage';
import AddVideoPage from './pages/intern/AddVideoPage';
import AdmissionsPage from './pages/intern/AdmissionsPage';
import BillingPage from './pages/intern/BillingPage';
import DistributorsPage from './pages/intern/DistributorsPage';
import EditBillingPage from './pages/intern/EditBillingPage';
import EditDistributorPage from './pages/intern/EditDistributorPage';
import EditFaqPage from './pages/intern/EditFaqPage';
import EditImagePage from './pages/intern/EditImagePage';
import EditNoticePage from './pages/intern/EditNoticePage';
import EditScreeningPage from './pages/intern/EditScreeningPage';
import EditSerialPage from './pages/intern/EditSerialPage';
import EditTextPage from './pages/intern/EditTextPage';
import EditUserPage from './pages/intern/EditUserPage';
import EditVideoPage from './pages/intern/EditVideoPage';
import InternPage from './pages/intern/InternPage';
import UsersPage from './pages/intern/UsersPage';
import LinksPage from './pages/LinksPage';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import NoticePage from './pages/NoticePage';
import NoticesPage from './pages/NoticesPage';
import PressReviewPage from './pages/PressReviewPage';
import ProgramOverviewPage from './pages/ProgramOverviewPage';
import ProgramPage from './pages/ProgramPage';
import ScreeningPage from './pages/ScreeningPage';
import SerialPage from './pages/SerialPage';
import SerialsPage from './pages/SerialsPage';
import VideosPage from './pages/VideosPage';
import { getCurrentUser } from './utils/services/userServices';

export default function App() {
    const [user, setUser] = useState({});
    const [pageTitle, setPageTitle] = useState('aka-Filmclub');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
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
            <Context.Provider value={{ user, setUser, pageTitle, setPageTitle }}>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/news">
                            <NoticesPage />
                        </Route>
                        <Route path="/news/">
                            <NoticePage />
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
                        <Route exact path="/awards">
                            <AwardsPage />
                        </Route>
                        <Route exact path="/videos">
                            <VideosPage />
                        </Route>
                        <Route exact path="/contact">
                            <ContactPage />
                        </Route>
                        <Route exact path="/links">
                            <LinksPage />
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
                        <PrivateRoute exact path="/intern/addUser">
                            <AddUserPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editUser">
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
                        <PrivateRoute exact path="/intern/addFaq">
                            <AddFaqPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editFaq">
                            <EditFaqPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/intern/addVideo">
                            <AddVideoPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editVideo">
                            <EditVideoPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editText">
                            <EditTextPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/intern/admissions">
                            <AdmissionsPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/billing">
                            <BillingPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/addBilling">
                            <AddBillingPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editBilling">
                            <EditBillingPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/intern/distributors">
                            <DistributorsPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/intern/distributors">
                            <DistributorsPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/intern/addDistributor">
                            <AddDistributorPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/editDistributor">
                            <EditDistributorPage />
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
            </Context.Provider>
        </AppStyled>
    );
}
const AppStyled = styled.div`
    height: 100vh;
`;
