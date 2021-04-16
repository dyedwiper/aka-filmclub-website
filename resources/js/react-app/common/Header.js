import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import akaLogo from '../assets/aka_logo.png';
import {
    AUTH_LEVEL_EDITOR,
    ROUTE_ABOUT,
    ROUTE_ARCHIVE,
    ROUTE_AWARDS,
    ROUTE_FAQS,
    ROUTE_HOME,
    ROUTE_INTERN,
    ROUTE_INTERN_ADD_NOTICE,
    ROUTE_INTERN_ADD_SCREENING,
    ROUTE_INTERN_ADD_SERIAL,
    ROUTE_INTERN_ADMISSIONS,
    ROUTE_INTERN_USERS,
    ROUTE_LOGIN,
    ROUTE_NEWS,
    ROUTE_PRESS,
    ROUTE_PROGRAM,
    ROUTE_PROGRAM_OVERVIEW,
    ROUTE_SELFMADE_FILMS,
    ROUTE_SERIALS,
} from '../constants';
import Context from '../Context';
import { getLogout } from '../utils/services/userServices';
import HamburgerButton from './HamburgerButton';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(120);

    const { user, setUser, pageTitle } = useContext(Context);
    const isLoggedIn = Object.keys(user).length !== 0;
    const isEditor = user.level >= AUTH_LEVEL_EDITOR;

    window.addEventListener('scroll', () => {
        const height = window.scrollY < 160 ? 120 - window.scrollY / 4 : 80;
        setHeaderHeight(height);
    });

    return (
        <HeaderStyled>
            <ContentContainerStyled headerHeight={headerHeight}>
                <LinkStyled to={ROUTE_HOME}>
                    <LogoStyled src={akaLogo} headerHeight={headerHeight} />
                </LinkStyled>
                <PageTitleStyled>{pageTitle}</PageTitleStyled>
                <HamburgerButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
                <NavStyled isNavOpen={isNavOpen}>
                    <DropdownContainerStyled>
                        <NavLinkStyled to={ROUTE_NEWS} onClick={() => setIsNavOpen(false)}>
                            News
                        </NavLinkStyled>
                    </DropdownContainerStyled>
                    <DropdownContainerStyled>
                        <NavLinkStyled to={ROUTE_PROGRAM} onClick={() => setIsNavOpen(false)}>
                            Programm
                        </NavLinkStyled>
                        <SubNavStyled>
                            <SubNavLinkStyled to={ROUTE_PROGRAM_OVERVIEW} onClick={() => setIsNavOpen(false)}>
                                Übersicht
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_SERIALS} onClick={() => setIsNavOpen(false)}>
                                Filmreihen
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_ARCHIVE} onClick={() => setIsNavOpen(false)}>
                                Archiv
                            </SubNavLinkStyled>
                        </SubNavStyled>
                    </DropdownContainerStyled>
                    <DropdownContainerStyled>
                        <NavLinkStyled to={ROUTE_ABOUT} onClick={() => setIsNavOpen(false)}>
                            Über uns
                        </NavLinkStyled>
                        <SubNavStyled>
                            <SubNavLinkStyled to={ROUTE_FAQS} onClick={() => setIsNavOpen(false)}>
                                FAQs
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_PRESS} onClick={() => setIsNavOpen(false)}>
                                Pressespiegel
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_AWARDS} onClick={() => setIsNavOpen(false)}>
                                Auszeichnungen
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_SELFMADE_FILMS} onClick={() => setIsNavOpen(false)}>
                                Eigenproduktionen
                            </SubNavLinkStyled>
                        </SubNavStyled>
                    </DropdownContainerStyled>
                    {isLoggedIn ? (
                        <DropdownContainerStyled>
                            <NavLinkStyled to={ROUTE_INTERN} onClick={() => setIsNavOpen(false)}>
                                Intern
                            </NavLinkStyled>
                            <SubNavStyled>
                                <SubNavLinkStyled to={ROUTE_INTERN_USERS} onClick={() => setIsNavOpen(false)}>
                                    Mitglieder
                                </SubNavLinkStyled>
                                <SubNavLinkStyled to={ROUTE_INTERN_ADMISSIONS} onClick={() => setIsNavOpen(false)}>
                                    Besuchszahlen
                                </SubNavLinkStyled>
                                {isEditor && (
                                    <>
                                        <SubNavLinkStyled
                                            to={ROUTE_INTERN_ADD_NOTICE}
                                            onClick={() => setIsNavOpen(false)}
                                        >
                                            News anlegen
                                        </SubNavLinkStyled>
                                        <SubNavLinkStyled
                                            to={ROUTE_INTERN_ADD_SERIAL}
                                            onClick={() => setIsNavOpen(false)}
                                        >
                                            Filmreihe anlegen
                                        </SubNavLinkStyled>
                                        <SubNavLinkStyled
                                            to={ROUTE_INTERN_ADD_SCREENING}
                                            onClick={() => setIsNavOpen(false)}
                                        >
                                            Vorführung anlegen
                                        </SubNavLinkStyled>
                                    </>
                                )}
                                <SubNavLinkStyled to={ROUTE_HOME} onClick={handleLogout}>
                                    Logout
                                </SubNavLinkStyled>
                            </SubNavStyled>
                        </DropdownContainerStyled>
                    ) : (
                        <DropdownContainerStyled>
                            <NavLinkStyled to={ROUTE_LOGIN} onClick={() => setIsNavOpen(false)}>
                                Login
                            </NavLinkStyled>
                        </DropdownContainerStyled>
                    )}
                </NavStyled>
            </ContentContainerStyled>
        </HeaderStyled>
    );

    function handleLogout() {
        getLogout()
            .then(() => {
                setUser({});
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

const HeaderStyled = styled.header`
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    background-color: white;
`;

const ContentContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 180px 1fr;
    align-items: center;
    height: ${(props) => props.headerHeight + 'px'};
    max-width: 1024px;
    padding: 0 20px;
    margin: 0 auto;

    @media (max-width: 767px) {
        grid-template-columns: 80px 1fr 80px;
        justify-items: center;
        height: 60px;
        padding: 0;
    }
`;

const LinkStyled = styled(Link)`
    @media (max-width: 767px) {
        justify-self: left;
        margin-left: 20px;
    }
`;

const LogoStyled = styled.img`
    height: ${(props) => props.headerHeight - 20 + 'px'};

    @media (max-width: 767px) {
        height: 40px;
    }
`;

const PageTitleStyled = styled.h2`
    display: none;

    @media (max-width: 767px) {
        display: block;
        margin: 0;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const NavStyled = styled.nav`
    padding: 20px;
    background-color: white;

    @media (max-width: 767px) {
        display: ${(props) => (props.isNavOpen ? 'block' : 'none')};
        position: absolute;
        top: 60px;
        overflow: auto;
        height: calc(100vh - 60px);
        width: 100vw;
        padding: 20px;
        padding-bottom: 50px;
        background-color: var(--aka-gelb);
        opacity: 0.9;
        text-align: right;
    }
`;

const DropdownContainerStyled = styled.div`
    display: inline-block;
    position: relative;
    margin-right: 30px;

    &:last-child {
        margin-right: 0;
    }

    @media (min-width: 767px) {
        &:hover div {
            display: block;
        }
    }

    @media (max-width: 767px) {
        margin-right: 0;
        display: block;
    }
`;

const NavLinkStyled = styled(NavLink)`
    color: black;
    font-size: 1.7em;
    font-weight: bold;

    @media (max-width: 767px) {
        display: block;
        margin: 10px 0 0 0;
    }
`;

const SubNavStyled = styled.div`
    display: none;
    position: absolute;
    margin-right: 20px;
    padding: 10px;
    background-color: var(--aka-gelb);
    opacity: 0.9;

    @media (max-width: 767px) {
        position: relative;
        display: block;
        margin-right: 0;
        padding: 0;
    }
`;

const SubNavLinkStyled = styled(Link)`
    display: block;
    margin: 5px 0;
    color: black;
    font-size: 1.3em;
    font-weight: bold;
    white-space: nowrap;

    &:hover {
        text-decoration: underline white;
    }
`;
