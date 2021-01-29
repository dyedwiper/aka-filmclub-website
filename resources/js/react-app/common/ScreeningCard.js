import React from 'react';
import styled from 'styled-components';

export default function ScreeningCard({ screening }) {
    return (
        <ScreeningCardStyled>
            <ScreeningImageStyled src={'/images/' + screening.image} />
            <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
            <ScreeningDateStyled>
                {new Date(screening.date).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })}
            </ScreeningDateStyled>
            <HorizontalLineStyled />
            <ScreeningSynopsisStyled>
                {screening.synopsis}
            </ScreeningSynopsisStyled>
        </ScreeningCardStyled>
    );
}

const ScreeningCardStyled = styled.div`
    width: 240px;
`;

const ScreeningImageStyled = styled.img`
    width: 100%;
    filter: grayscale();
`;

const ScreeningTitleStyled = styled.div`
    font-weight: bold;
`;

const ScreeningDateStyled = styled.div`
    font-weight: bold;
`;

const HorizontalLineStyled = styled.div`
    height: 10px;
    width: 80%;
    background-color: var(--aka-gelb);
`;

const ScreeningSynopsisStyled = styled.p``;
