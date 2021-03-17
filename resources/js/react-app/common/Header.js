import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR } from '../constants';
import Context from '../Context';
import { getLogout } from '../utils/userServices';
import HamburgerButton from './HamburgerButton';
import akaLogo from '../assets/aka_logo.png';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const { user, setUser, pageTitle } = useContext(Context);
    const isLoggedIn = Object.keys(user).length !== 0;
    const isEditor = user.level >= AUTH_LEVEL_EDITOR;

    return (
        <HeaderStyled>
            <ContentContainerStyled>
                <LinkStyled to="/">
                    <LogoStyled src={akaLogo} />
                </LinkStyled>
                <PageTitleStyled>{pageTitle}</PageTitleStyled>
                <HamburgerButton isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
                <NavStyled isNavOpen={isNavOpen} windowHeight={window.innerHeight}>
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
    width: 100vw;
    background-color: white;
`;

const ContentContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 180px 1fr;
    align-items: center;
    height: 120px;
    max-width: 1024px;
    margin: 0 auto;

    @media (max-width: 767px) {
        grid-template-columns: 80px 1fr 80px;
        justify-items: center;
        height: 60px;
    }
`;

const LinkStyled = styled(Link)``;

const LogoStyled = styled.img`
    height: 100px;

    @media (max-width: 767px) {
        height: 45px;
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
        height: ${(props) => props.windowHeight - 60 + 'px'};
        width: 100vw;
        padding-bottom: 50px;
        background-color: var(--aka-gelb);
        opacity: 0.9;
        text-align: right;
    }
`;

const DropdownContainerStyled = styled.div`
    display: inline-block;
    position: relative;

    @media (min-width: 767px) {
        &:hover div {
            display: block;
        }
    }

    @media (max-width: 767px) {
        display: block;
    }
`;

const NavLinkStyled = styled(NavLink)`
    margin-right: 30px;
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
