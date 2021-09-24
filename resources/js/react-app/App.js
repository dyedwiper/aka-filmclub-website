import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './common/Footer';
import Header from './common/Header';
import PrivateRoute from './common/PrivateRoute';
import {
    AUTH_LEVEL_ADMIN,
    AUTH_LEVEL_EDITOR,
    ROUTE_ABOUT,
    ROUTE_ARCHIVE,
    ROUTE_AWARDS,
    ROUTE_CONTACT,
    ROUTE_ERROR,
    ROUTE_FAQS,
    ROUTE_HOME,
    ROUTE_IMPRINT,
    ROUTE_INTERN,
    ROUTE_INTERN_ADD_BILLING,
    ROUTE_INTERN_ADD_DISTRIBUTOR,
    ROUTE_INTERN_ADD_FAQ,
    ROUTE_INTERN_ADD_IMAGE,
    ROUTE_INTERN_ADD_LICENSE,
    ROUTE_INTERN_ADD_NOTICE,
    ROUTE_INTERN_ADD_SCREENING,
    ROUTE_INTERN_ADD_SELFMADE_FILM,
    ROUTE_INTERN_ADD_SERIAL,
    ROUTE_INTERN_ADD_USER,
    ROUTE_INTERN_ADMISSIONS,
    ROUTE_INTERN_BILLING,
    ROUTE_INTERN_DISTRIBUTORS,
    ROUTE_INTERN_EDIT_BILLING,
    ROUTE_INTERN_EDIT_DISTRIBUTOR,
    ROUTE_INTERN_EDIT_FAQ,
    ROUTE_INTERN_EDIT_IMAGE,
    ROUTE_INTERN_EDIT_LICENSE,
    ROUTE_INTERN_EDIT_NOTICE,
    ROUTE_INTERN_EDIT_PASSWORD,
    ROUTE_INTERN_EDIT_SCREENING,
    ROUTE_INTERN_EDIT_SELFMADE_FILM,
    ROUTE_INTERN_EDIT_SERIAL,
    ROUTE_INTERN_EDIT_TEXT,
    ROUTE_INTERN_EDIT_USER,
    ROUTE_INTERN_LICENSES,
    ROUTE_INTERN_USERS,
    ROUTE_LINKS,
    ROUTE_LOGIN,
    ROUTE_NEWS,
    ROUTE_NOTICE,
    ROUTE_NOT_FOUND,
    ROUTE_PRESS,
    ROUTE_PROGRAM,
    ROUTE_PROGRAM_OVERVIEW,
    ROUTE_SCREENING,
    ROUTE_SELFMADE_FILMS,
    ROUTE_SERIAL,
    ROUTE_SERIALS,
} from './constants';
import Context from './Context';
import AboutPage from './pages/AboutPage';
import ArchivePage from './pages/ArchivePage';
import AwardsPage from './pages/AwardsPage';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';
import FaqsPage from './pages/FaqsPage';
import HomePage from './pages/HomePage';
import ImprintPage from './pages/ImprintPage';
import AddBillingPage from './pages/intern/AddBillingPage';
import AddDistributorPage from './pages/intern/AddDistributorPage';
import AddFaqPage from './pages/intern/AddFaqPage';
import AddImagePage from './pages/intern/AddImagePage';
import AddLicensePage from './pages/intern/AddLicensePage';
import AddNoticePage from './pages/intern/AddNoticePage';
import AddScreeningPage from './pages/intern/AddScreeningPage';
import AddSelfmadeFilmPage from './pages/intern/AddSelfmadeFilmPage';
import AddSerialPage from './pages/intern/AddSerialPage';
import AddUserPage from './pages/intern/AddUserPage';
import AdmissionsPage from './pages/intern/AdmissionsPage';
import BillingPage from './pages/intern/BillingPage';
import DistributorsPage from './pages/intern/DistributorsPage';
import EditBillingPage from './pages/intern/EditBillingPage';
import EditDistributorPage from './pages/intern/EditDistributorPage';
import EditFaqPage from './pages/intern/EditFaqPage';
import EditImagePage from './pages/intern/EditImagePage';
import EditLicensePage from './pages/intern/EditLicensePage';
import EditNoticePage from './pages/intern/EditNoticePage';
import EditPasswordPage from './pages/intern/EditPasswordPage';
import EditScreeningPage from './pages/intern/EditScreeningPage';
import EditSelfmadeFilmPage from './pages/intern/EditSelfmadeFilmPage';
import EditSerialPage from './pages/intern/EditSerialPage';
import EditTextPage from './pages/intern/EditTextPage';
import EditUserPage from './pages/intern/EditUserPage';
import InternPage from './pages/intern/InternPage';
import LicensesPage from './pages/intern/LicensesPage';
import TempPdfPage from './pages/intern/TempPdfPage';
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
import SelfmadeFilmsPage from './pages/SelfmadeFilmsPage';
import SerialPage from './pages/SerialPage';
import SerialsPage from './pages/SerialsPage';
import { computeSemester } from './utils/semesterUtils';
import { getCurrentUser } from './utils/services/userServices';

export default function App() {
    const [user, setUser] = useState({});
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isUserEditor, setIsUserEditor] = useState(false);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [pageTitle, setPageTitle] = useState('aka-Filmclub');
    const [currentSemester, setCurrentSemester] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((res) => {
            setUser(res.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        setIsUserLoggedIn(Object.keys(user).length !== 0);
        setIsUserEditor(user.level >= AUTH_LEVEL_EDITOR);
        setIsUserAdmin(user.level >= AUTH_LEVEL_ADMIN);
    }, [user]);

    useEffect(() => {
        setCurrentSemester(computeSemester(new Date()));
    }, []);

    if (isLoading)
        return (
            <AppStyled>
                <LoadingPage />
            </AppStyled>
        );

    return (
        <AppStyled>
            <Context.Provider
                value={{
                    user,
                    setUser,
                    isUserLoggedIn,
                    isUserEditor,
                    isUserAdmin,
                    pageTitle,
                    setPageTitle,
                    currentSemester,
                }}
            >
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path={ROUTE_HOME}>
                            <HomePage />
                        </Route>
                        <Route exact path={ROUTE_NEWS}>
                            <NoticesPage />
                        </Route>
                        <Route path={ROUTE_NOTICE}>
                            <NoticePage />
                        </Route>
                        <Route exact path={ROUTE_PROGRAM}>
                            <ProgramPage />
                        </Route>
                        <Route exact path={ROUTE_PROGRAM_OVERVIEW}>
                            <ProgramOverviewPage />
                        </Route>
                        <Route exact path={ROUTE_ARCHIVE}>
                            <ArchivePage />
                        </Route>
                        <Route path={ROUTE_SCREENING}>
                            <ScreeningPage />
                        </Route>
                        <Route exact path={ROUTE_SERIALS}>
                            <SerialsPage />
                        </Route>
                        <Route path={ROUTE_SERIAL}>
                            <SerialPage />
                        </Route>
                        <Route exact path={ROUTE_ABOUT}>
                            <AboutPage />
                        </Route>
                        <Route exact path={ROUTE_FAQS}>
                            <FaqsPage />
                        </Route>
                        <Route exact path={ROUTE_PRESS}>
                            <PressReviewPage />
                        </Route>
                        <Route exact path={ROUTE_AWARDS}>
                            <AwardsPage />
                        </Route>
                        <Route exact path={ROUTE_SELFMADE_FILMS}>
                            <SelfmadeFilmsPage />
                        </Route>
                        <Route exact path={ROUTE_CONTACT}>
                            <ContactPage />
                        </Route>
                        <Route exact path={ROUTE_IMPRINT}>
                            <ImprintPage />
                        </Route>
                        <Route exact path={ROUTE_LINKS}>
                            <LinksPage />
                        </Route>
                        <Route exact path={ROUTE_LOGIN}>
                            <LoginPage />
                        </Route>
                        <PrivateRoute exact path={ROUTE_INTERN}>
                            <InternPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_USERS}>
                            <UsersPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_ADD_USER}>
                            <AddUserPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_USER}>
                            <EditUserPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_PASSWORD}>
                            <EditPasswordPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_ADD_SERIAL}>
                            <AddSerialPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_SERIAL}>
                            <EditSerialPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_ADD_SCREENING}>
                            <AddScreeningPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_SCREENING}>
                            <EditScreeningPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_ADD_NOTICE}>
                            <AddNoticePage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_NOTICE}>
                            <EditNoticePage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_ADD_IMAGE}>
                            <AddImagePage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_IMAGE}>
                            <EditImagePage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_ADD_FAQ}>
                            <AddFaqPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_FAQ}>
                            <EditFaqPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_ADD_SELFMADE_FILM}>
                            <AddSelfmadeFilmPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_SELFMADE_FILM}>
                            <EditSelfmadeFilmPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_TEXT}>
                            <EditTextPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_ADMISSIONS}>
                            <AdmissionsPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_BILLING}>
                            <BillingPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_ADD_BILLING}>
                            <AddBillingPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_BILLING}>
                            <EditBillingPage />
                        </PrivateRoute>
                        <PrivateRoute path="/intern/tempPdf">
                            <TempPdfPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_DISTRIBUTORS}>
                            <DistributorsPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_ADD_DISTRIBUTOR}>
                            <AddDistributorPage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_DISTRIBUTOR}>
                            <EditDistributorPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_LICENSES}>
                            <LicensesPage />
                        </PrivateRoute>
                        <PrivateRoute exact path={ROUTE_INTERN_ADD_LICENSE}>
                            <AddLicensePage />
                        </PrivateRoute>
                        <PrivateRoute path={ROUTE_INTERN_EDIT_LICENSE}>
                            <EditLicensePage />
                        </PrivateRoute>
                        <Route path={ROUTE_ERROR}>
                            <ErrorPage />
                        </Route>
                        <Route path={ROUTE_NOT_FOUND}>
                            <NotFoundPage />
                        </Route>
                        <Redirect to={ROUTE_NOT_FOUND} />
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
