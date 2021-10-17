import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import akaLogo from '../assets/aka_logo.png';
import {
    AKA_FORUM_URL,
    AKA_HIGHNOON_URL,
    PAGE_TITLE_ABOUT,
    PAGE_TITLE_ADD_NOTICE,
    PAGE_TITLE_ADD_SCREENING,
    PAGE_TITLE_ADD_SERIAL,
    PAGE_TITLE_ADMISSIONS,
    PAGE_TITLE_ARCHIVE,
    PAGE_TITLE_AWARDS,
    PAGE_TITLE_CONTACT,
    PAGE_TITLE_FAQS,
    PAGE_TITLE_IMPRINT,
    PAGE_TITLE_INTERN,
    PAGE_TITLE_LINKS,
    PAGE_TITLE_LOGIN,
    PAGE_TITLE_NEWS,
    PAGE_TITLE_PRESS,
    PAGE_TITLE_PROGRAM,
    PAGE_TITLE_PROGRAM_OVERVIEW,
    PAGE_TITLE_SELFMADE_FILMS,
    PAGE_TITLE_SERIALS,
    PAGE_TITLE_USERS,
    ROUTE_ABOUT,
    ROUTE_ARCHIVE,
    ROUTE_AWARDS,
    ROUTE_CONTACT,
    ROUTE_FAQS,
    ROUTE_HOME,
    ROUTE_IMPRINT,
    ROUTE_INTERN,
    ROUTE_INTERN_ADD_NOTICE,
    ROUTE_INTERN_ADD_SCREENING,
    ROUTE_INTERN_ADD_SERIAL,
    ROUTE_INTERN_ADMISSIONS,
    ROUTE_INTERN_EDIT_USER,
    ROUTE_INTERN_USERS,
    ROUTE_LINKS,
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
import HamburgerButton from './misc/HamburgerButton';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(120);

    const { user, setUser, isUserLoggedIn, isUserEditor, pageTitle } = useContext(Context);

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
                <PageTitleStyled onClick={() => window.scroll(0, 0)}>{pageTitle}</PageTitleStyled>
                <HamburgerButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
                <NavStyled isNavOpen={isNavOpen}>
                    <DropdownContainerStyled>
                        <NavLinkStyled to={ROUTE_NEWS} onClick={() => setIsNavOpen(false)}>
                            {PAGE_TITLE_NEWS}
                        </NavLinkStyled>
                    </DropdownContainerStyled>
                    <DropdownContainerStyled>
                        <NavLinkStyled to={ROUTE_PROGRAM} onClick={() => setIsNavOpen(false)}>
                            {PAGE_TITLE_PROGRAM}
                        </NavLinkStyled>
                        <SubNavStyled>
                            <SubNavLinkStyled to={ROUTE_PROGRAM_OVERVIEW} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_PROGRAM_OVERVIEW}
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_SERIALS} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_SERIALS}
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_ARCHIVE} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_ARCHIVE}
                            </SubNavLinkStyled>
                        </SubNavStyled>
                    </DropdownContainerStyled>
                    <DropdownContainerStyled>
                        <NavLinkStyled to={ROUTE_ABOUT} onClick={() => setIsNavOpen(false)}>
                            {PAGE_TITLE_ABOUT}
                        </NavLinkStyled>
                        <SubNavStyled>
                            <SubNavLinkStyled to={ROUTE_FAQS} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_FAQS}
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_SELFMADE_FILMS} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_SELFMADE_FILMS}
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_PRESS} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_PRESS}
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_AWARDS} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_AWARDS}
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_LINKS} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_LINKS}
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_CONTACT} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_CONTACT}
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to={ROUTE_IMPRINT} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_IMPRINT}
                            </SubNavLinkStyled>
                        </SubNavStyled>
                    </DropdownContainerStyled>
                    <DropdownContainerStyled>
                        <NavExternalLinkStyled
                            href={AKA_HIGHNOON_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsNavOpen(false)}
                        >
                            Highnoon
                        </NavExternalLinkStyled>
                    </DropdownContainerStyled>
                    {isUserLoggedIn ? (
                        <DropdownContainerStyled>
                            <NavLinkStyled to={ROUTE_INTERN} onClick={() => setIsNavOpen(false)}>
                                {PAGE_TITLE_INTERN}
                            </NavLinkStyled>
                            <SubNavStyled>
                                <SubNavExternalLinkStyled
                                    href={AKA_FORUM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsNavOpen(false)}
                                >
                                    Forum
                                </SubNavExternalLinkStyled>
                                <SubNavLinkStyled to={ROUTE_INTERN_USERS} onClick={() => setIsNavOpen(false)}>
                                    {PAGE_TITLE_USERS}
                                </SubNavLinkStyled>
                                <SubNavLinkStyled to={ROUTE_INTERN_ADMISSIONS} onClick={() => setIsNavOpen(false)}>
                                    {PAGE_TITLE_ADMISSIONS}
                                </SubNavLinkStyled>
                                {isUserEditor && (
                                    <>
                                        <SubNavLinkStyled
                                            to={ROUTE_INTERN_ADD_NOTICE}
                                            onClick={() => setIsNavOpen(false)}
                                        >
                                            {PAGE_TITLE_ADD_NOTICE}
                                        </SubNavLinkStyled>
                                        <SubNavLinkStyled
                                            to={ROUTE_INTERN_ADD_SERIAL}
                                            onClick={() => setIsNavOpen(false)}
                                        >
                                            {PAGE_TITLE_ADD_SERIAL}
                                        </SubNavLinkStyled>
                                        <SubNavLinkStyled
                                            to={ROUTE_INTERN_ADD_SCREENING}
                                            onClick={() => setIsNavOpen(false)}
                                        >
                                            {PAGE_TITLE_ADD_SCREENING}
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
                                {PAGE_TITLE_LOGIN}
                            </NavLinkStyled>
                        </DropdownContainerStyled>
                    )}
                </NavStyled>
            </ContentContainerStyled>
            {isUserLoggedIn && (
                <LoggedInUserContainerStyled>
                    <LoggedInUserLinkStyled to={ROUTE_INTERN_EDIT_USER + user.uuid}>
                        {user.username}
                    </LoggedInUserLinkStyled>
                    <BlackBarStyled />
                    <LogoutLinkStyled to={ROUTE_HOME} onClick={handleLogout}>
                        Logout
                    </LogoutLinkStyled>
                </LoggedInUserContainerStyled>
            )}
        </HeaderStyled>
    );

    function handleLogout() {
        getLogout().then(() => {
            setUser({});
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
    filter: none;

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
        font-size: 1em;
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
        text-decoration-color: white;
    }
`;

const SubNavExternalLinkStyled = styled.a`
    display: block;
    margin: 5px 0;
    color: black;
    font-size: 1.3em;
    font-weight: bold;
    white-space: nowrap;

    &:hover {
        text-decoration-color: white;
    }
`;

const NavExternalLinkStyled = styled.a`
    color: black;
    font-size: 1.7em;
    font-weight: bold;

    @media (max-width: 767px) {
        display: block;
        margin: 10px 0 0 0;
    }
`;

const LoggedInUserContainerStyled = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 20px;
    background-color: var(--aka-gelb);

    @media (max-width: 767px) {
        display: none;
    }
`;

const LoggedInUserLinkStyled = styled(Link)`
    display: block;
    text-align: center;
`;

const BlackBarStyled = styled.div`
    height: 2px;
    margin: 10px 0;
    background-color: black;
`;

const LogoutLinkStyled = styled(Link)`
    display: block;
    text-align: center;
`;
