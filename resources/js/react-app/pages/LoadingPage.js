import React from 'react';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';

export default function LoadingPage() {
    return (
        <PageStyled>
            <BarStyled />
        </PageStyled>
    );
}

const BarStyled = styled.div`
    width: 100%;
    height: 10px;
    margin-top: 33vh;
    background-color: var(--aka-gelb);
    animation: load 5s linear infinite;

    @keyframes load {
        0% {
            transform: scaleX(0);
        }
        10% {
            transform: ${'scaleX(' + Math.random() + ')'};
        }
        20% {
            transform: ${'scaleX(' + Math.random() + ')'};
        }
        30% {
            transform: ${'scaleX(' + Math.random() + ')'};
        }
        40% {
            transform: ${'scaleX(' + Math.random() + ')'};
        }
        50% {
            transform: ${'scaleX(' + Math.random() + ')'};
        }
        60% {
            transform: ${'scaleX(' + Math.random() + ')'};
        }
        70% {
            transform: ${'scaleX(' + Math.random() + ')'};
        }
        80% {
            transform: ${'scaleX(' + Math.random() + ')'};
        }
        90% {
            transform: ${'scaleX(' + Math.random() + ')'};
        }
        100% {
            transform: scaleX(0);
        }
    }
`;
