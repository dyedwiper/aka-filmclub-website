import React from 'react';
import styled from 'styled-components';

export default function HamburgerButton({ isNavOpen, setIsNavOpen }) {
    return (
        <HamburgerButtonStyled onClick={() => setIsNavOpen(!isNavOpen)}>
            <HamburgerStyled isNavOpen={isNavOpen}>
                <LineStyled isNavOpen={isNavOpen} />
                <LineStyled isNavOpen={isNavOpen} />
                <LineStyled isNavOpen={isNavOpen} />
            </HamburgerStyled>
        </HamburgerButtonStyled>
    );
}

const HamburgerButtonStyled = styled.button`
    display: none;

    @media (max-width: 901px) {
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 0 0 auto;
        padding: 10px;
        border: none;
        box-shadow: none;
    }
`;

const HamburgerStyled = styled.span`
    position: relative;
    display: block;
    height: 40px;
`;

const LineStyled = styled.div`
    position: absolute;
    left: 0;
    height: 5px;
    width: 40px;
    background-color: black;
    transition: 1s;

    &:nth-child(1) {
        top: 7.5px;
        transform: ${(props) => (props.isNavOpen ? 'translateY(10px) rotate(-45deg)' : 'none')};
    }
    &:nth-child(2) {
        top: 17.5px;
        opacity: ${(props) => (props.isNavOpen ? '0' : '1')};
    }
    &:nth-child(3) {
        top: 27.5px;
        transform: ${(props) => (props.isNavOpen ? 'translateY(-10px) rotate(45deg)' : 'none')};
    }
`;
