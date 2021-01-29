import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
    return (
        <HeaderStyled>
            <Link to="/">
                <LogoStyled src="/assets/aka_logo.png" />
            </Link>
            <NavStyled>
                <NavItemStyled>
                    <Link to="/news">News</Link>
                </NavItemStyled>
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
    height: 100px;
    width: 100%;
    background-color: var(--aka-gelb);
`;

const LogoStyled = styled.img`
    height: 100px;
`;

const NavStyled = styled.nav``;

const NavItemStyled = styled.div``;
