import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR } from '../constants';
import Context from '../Context';
import { getLogout } from '../utils/userServices';
import HamburgerButton from './HamburgerButton';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const { user, setUser, pageTitle } = useContext(Context);
    const isLoggedIn = Object.keys(user).length !== 0;
    const isEditor = user.level >= AUTH_LEVEL_EDITOR;

    return (
        <HeaderStyled>
            {/* The headline is hidden. It is set for SEO. */}
            <HeadlineStyled>Akademischer Filmclub an der Universität Freiburg e.V.</HeadlineStyled>
            <LinkStyled to="/">
                <LogoStyled src="/assets/aka_logo.png" />
            </LinkStyled>
            <PageTitleStyled>{pageTitle}</PageTitleStyled>
            <HamburgerButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
            <NavStyled isNavOpen={isNavOpen}>
                <NavLinkStyled to="/news" onClick={() => setIsNavOpen(false)}>
                    News
                </NavLinkStyled>
                <DropdownContainerStyled>
                    <NavLinkStyled to="/program" onClick={() => setIsNavOpen(false)}>
                        Programm
                    </NavLinkStyled>
                    <SubNavStyled>
                        <SubNavLinkStyled to="/program/overview" onClick={() => setIsNavOpen(false)}>
                            Übersicht
                        </SubNavLinkStyled>
                        <SubNavLinkStyled to="/program/serials" onClick={() => setIsNavOpen(false)}>
                            Filmreihen
                        </SubNavLinkStyled>
                        <SubNavLinkStyled to="/program/archive" onClick={() => setIsNavOpen(false)}>
                            Archiv
                        </SubNavLinkStyled>
                    </SubNavStyled>
                </DropdownContainerStyled>
                <DropdownContainerStyled>
                    <NavLinkStyled to="/about" onClick={() => setIsNavOpen(false)}>
                        Über uns
                    </NavLinkStyled>
                    <SubNavStyled>
                        <SubNavLinkStyled to="/faqs" onClick={() => setIsNavOpen(false)}>
                            FAQs
                        </SubNavLinkStyled>
                        <SubNavLinkStyled to="/press" onClick={() => setIsNavOpen(false)}>
                            Pressespiegel
                        </SubNavLinkStyled>
                    </SubNavStyled>
                </DropdownContainerStyled>
                {isLoggedIn ? (
                    <DropdownContainerStyled>
                        <NavLinkStyled to="/intern" onClick={() => setIsNavOpen(false)}>
                            Intern
                        </NavLinkStyled>
                        <SubNavStyled>
                            <SubNavLinkStyled to="/intern/users" onClick={() => setIsNavOpen(false)}>
                                Mitglieder
                            </SubNavLinkStyled>
                            {isEditor && (
                                <>
                                    <SubNavLinkStyled to="/intern/addNotice" onClick={() => setIsNavOpen(false)}>
                                        News anlegen
                                    </SubNavLinkStyled>
                                    <SubNavLinkStyled to="/intern/addSerial" onClick={() => setIsNavOpen(false)}>
                                        Filmreihe anlegen
                                    </SubNavLinkStyled>
                                    <SubNavLinkStyled to="/intern/addScreening" onClick={() => setIsNavOpen(false)}>
                                        Vorführung anlegen
                                    </SubNavLinkStyled>
                                </>
                            )}
                            <SubNavLinkStyled to="/" onClick={handleLogout}>
                                Logout
                            </SubNavLinkStyled>
                        </SubNavStyled>
                    </DropdownContainerStyled>
                ) : (
                    <DropdownContainerStyled>
                        <NavLinkStyled to="/login" onClick={() => setIsNavOpen(false)}>
                            Login
                        </NavLinkStyled>
                    </DropdownContainerStyled>
                )}
            </NavStyled>
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
    display: grid;
    grid-template-columns: 150px 1fr;
    height: 120px;
    width: 100vw;
    padding: 20px 100px;
    background-color: white;

    @media (max-width: 901px) {
        grid-template-columns: 80px 1fr 80px;
        height: 60px;
        padding: 0;
    }
`;

const HeadlineStyled = styled.h1`
    position: fixed;
    visibility: hidden;
`;

const LinkStyled = styled(Link)`
    height: 100%;
    margin: 10px;
`;

const LogoStyled = styled.img`
    height: 80px;

    @media (max-width: 901px) {
        height: 40px;
    }
`;

const PageTitleStyled = styled.h2`
    display: none;

    @media (max-width: 901px) {
        justify-self: center;
        align-self: center;
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

    @media (max-width: 901px) {
        display: ${(props) => (props.isNavOpen ? 'grid' : 'none')};
        grid-auto-flow: row;
        justify-items: right;
        position: absolute;
        top: 60px;
        width: 100vw;
    }
`;

const DropdownContainerStyled = styled.div`
    display: inline-block;
    position: relative;

    @media (min-width: 901px) {
        &:hover div {
            display: block;
        }
    }

    @media (max-width: 901px) {
        display: grid;
        grid-auto-flow: row;
        justify-items: right;
    }
`;

const NavLinkStyled = styled(NavLink)`
    margin-right: 20px;
    font-size: 2rem;
    font-weight: bold;

    @media (max-width: 901px) {
        display: block;
    }
`;

const SubNavStyled = styled.div`
    display: none;
    position: absolute;
    margin-right: 20px;
    background-color: var(--aka-secondary-color);

    @media (max-width: 901px) {
        position: relative;
        display: grid;
        grid-auto-flow: row;
        justify-items: right;
    }
`;

const SubNavLinkStyled = styled(Link)`
    display: block;
    font-size: 1.5em;
    font-weight: bold;
`;
