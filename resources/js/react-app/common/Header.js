import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
    return (
        <HeaderStyled>
            <HeadlineStyled>Akademischer Filmclub an der Universität Freiburg e.V.</HeadlineStyled>
            <LinkStyled to="/">
                <LogoStyled src="/assets/aka_logo.png" />
            </LinkStyled>
            <NavStyled>
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
                <DropdownContainerStyled>
                    <NavLinkStyled to="/intern">Intern</NavLinkStyled>
                    <SubNavStyled>
                        <SubNavLinkStyled to="/intern/addNotice">News anlegen</SubNavLinkStyled>
                        <SubNavLinkStyled to="/intern/addSerial">Filmreihe anlegen</SubNavLinkStyled>
                        <SubNavLinkStyled to="/intern/addScreening">Vorführung anlegen</SubNavLinkStyled>
                    </SubNavStyled>
                </DropdownContainerStyled>
            </NavStyled>
        </HeaderStyled>
    );
}

const HeaderStyled = styled.header`
    position: fixed;
    top: 0;
    z-index: 10;
    display: grid;
    grid-template-columns: 150px 1fr;
    height: 120px;
    width: 100%;
    padding: 20px 100px;
    background-color: white;
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
`;

const NavStyled = styled.nav`
    padding: 20px;
`;

const DropdownContainerStyled = styled.div`
    display: inline-block;
    position: relative;

    &:hover div {
        display: block;
    }
`;

const NavLinkStyled = styled(NavLink)`
    margin-right: 20px;
    font-size: 2rem;
    font-weight: bold;
`;

const SubNavStyled = styled.div`
    display: none;
    position: absolute;
    background-color: var(--aka-secondary-color);
`;

const SubNavLinkStyled = styled(Link)`
    display: block;
    font-size: 1.5em;
    font-weight: bold;
`;
