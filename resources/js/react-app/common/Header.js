import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR } from '../constants';
import UserContext from '../UserContext';
import { getLogout } from '../utils/userServices';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const { user, setUser } = useContext(UserContext);
    const isLoggedIn = Object.keys(user).length !== 0;
    const isEditor = user.level >= AUTH_LEVEL_EDITOR;

    return (
        <HeaderStyled>
            {/* The headline is hidden. It is set for SEO. */}
            <HeadlineStyled>Akademischer Filmclub an der Universität Freiburg e.V.</HeadlineStyled>
            <LinkStyled to="/">
                <LogoStyled src="/assets/aka_logo.png" />
            </LinkStyled>
            <NavButtonStyled onClick={() => setIsNavOpen(!isNavOpen)}>x</NavButtonStyled>
            <NavStyled isNavOpen={isNavOpen}>
                <NavLinkStyled to="/news">News</NavLinkStyled>
                <DropdownContainerStyled>
                    <NavLinkStyled to="/program">Programm</NavLinkStyled>
                    <SubNavStyled>
                        <SubNavLinkStyled to="/program/overview">Übersicht</SubNavLinkStyled>
                        <SubNavLinkStyled to="/program/serials">Filmreihen</SubNavLinkStyled>
                        <SubNavLinkStyled to="/program/archive">Archiv</SubNavLinkStyled>
                    </SubNavStyled>
                </DropdownContainerStyled>
                <DropdownContainerStyled>
                    <NavLinkStyled to="/about">Über uns</NavLinkStyled>
                    <SubNavStyled>
                        <SubNavLinkStyled to="/faqs">FAQs</SubNavLinkStyled>
                        <SubNavLinkStyled to="/press">Pressespiegel</SubNavLinkStyled>
                    </SubNavStyled>
                </DropdownContainerStyled>
                {isLoggedIn ? (
                    <DropdownContainerStyled>
                        <NavLinkStyled to="/intern">Intern</NavLinkStyled>
                        <SubNavStyled>
                            <SubNavLinkStyled to="/intern/users">Mitglieder</SubNavLinkStyled>
                            {isEditor && (
                                <>
                                    <SubNavLinkStyled to="/intern/addNotice">News anlegen</SubNavLinkStyled>
                                    <SubNavLinkStyled to="/intern/addSerial">Filmreihe anlegen</SubNavLinkStyled>
                                    <SubNavLinkStyled to="/intern/addScreening">Vorführung anlegen</SubNavLinkStyled>
                                </>
                            )}
                            <SubNavLinkStyled to="/" onClick={handleLogout}>
                                Logout
                            </SubNavLinkStyled>
                        </SubNavStyled>
                    </DropdownContainerStyled>
                ) : (
                    <DropdownContainerStyled>
                        <NavLinkStyled to="/login">Login</NavLinkStyled>
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
        height: 60px;
        padding: 10px 20px;
    }
`;

const HeadlineStyled = styled.h1`
    position: fixed;
    visibility: hidden;
`;

const LinkStyled = styled(Link)`
    height: 100%;
`;

const LogoStyled = styled.img`
    height: 80px;

    @media (max-width: 901px) {
        height: 40px;
    }
`;

const NavButtonStyled = styled.button`
    display: none;

    @media (max-width: 901px) {
        display: block;
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
