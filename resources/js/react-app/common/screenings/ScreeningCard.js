import React from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/dateFormatters';

export default function ScreeningCard({ screening }) {
    return (
        <ScreeningCardStyled>
            <ScreeningImageStyled src={'/images/' + screening.image} />
            <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
            <ScreeningDateStyled>{formatDate(screening.date)}</ScreeningDateStyled>
            <HorizontalLineStyled />
            <ScreeningSynopsisStyled>{screening.synopsis}</ScreeningSynopsisStyled>
        </ScreeningCardStyled>
    );
}

const ScreeningCardStyled = styled.div`
    width: 240px;
`;

const ScreeningImageStyled = styled.img`
    width: 100%;
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
