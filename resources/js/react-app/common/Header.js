import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
    return (
        <HeaderStyled>
            <LinkStyled to="/">
                <LogoStyled src="/assets/aka_logo.png" />
            </LinkStyled>
            <NavStyled>
                <NavLinkStyled to="/news">News</NavLinkStyled>
                <NavLinkStyled to="/program">Programm</NavLinkStyled>
                <NavLinkStyled to="/archive">Archiv</NavLinkStyled>
            </NavStyled>
        </HeaderStyled>
    );
}

const HeaderStyled = styled.header`
    position: fixed;
    top: 0;
    z-index: 10;
    display: grid;
    grid-template-columns: 200px 1fr;
    height: 120px;
    width: 100%;
    padding: 20px;
    background-color: white;
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

const NavLinkStyled = styled(NavLink)`
    margin-right: 20px;
    text-decoration: none;
    color: black;
    font-size: 2rem;
    font-weight: bold;

    &.active,
    &:hover {
        text-decoration: underline var(--aka-gelb);
    }
`;
