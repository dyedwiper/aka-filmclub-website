import React from 'react';
import styled from 'styled-components';

export default function Footer() {
    return <FooterStyled></FooterStyled>;
}

const FooterStyled = styled.footer`
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: var(--aka-gelb);
`;
