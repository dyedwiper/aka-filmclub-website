import React from 'react';
import styled from 'styled-components';

export default function Header() {
    return (
        <HeaderStyled>
            <LogoStyled src="/assets/aka_logo.png" />
            <NavStyled></NavStyled>
        </HeaderStyled>
    );
}

const HeaderStyled = styled.header`
    position: fixed;
    top: 0;
    height: 100px;
    width: 100%;
    background-color: var(--aka-gelb);
`;

const LogoStyled = styled.img`
    height: 100%;
`;

const NavStyled = styled.nav``;
