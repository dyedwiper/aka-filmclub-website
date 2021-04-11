import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR } from '../constants';
import Context from '../Context';
import { getLogout } from '../utils/services/userServices';
import HamburgerButton from './HamburgerButton';
import akaLogo from '../assets/aka_logo.png';

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
                <LinkStyled to="/">
                    <LogoStyled src={akaLogo} headerHeight={headerHeight} />
                </LinkStyled>
                <PageTitleStyled>{pageTitle}</PageTitleStyled>
                <HamburgerButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
                <NavStyled isNavOpen={isNavOpen}>
                    <DropdownContainerStyled>
                        <NavLinkStyled to="/news" onClick={() => setIsNavOpen(false)}>
                            News
                        </NavLinkStyled>
                    </DropdownContainerStyled>
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
                            <SubNavLinkStyled to="/awards" onClick={() => setIsNavOpen(false)}>
                                Auszeichnungen
                            </SubNavLinkStyled>
                            <SubNavLinkStyled to="/videos" onClick={() => setIsNavOpen(false)}>
                                Eigenproduktionen
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
                                <SubNavLinkStyled to="/intern/admissions" onClick={() => setIsNavOpen(false)}>
                                    Besuchszahlen
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
