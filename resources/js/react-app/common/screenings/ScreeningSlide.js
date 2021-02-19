import React from 'react';
import styled from 'styled-components';
import { IMAGE_FOLDER } from '../../constants';
import { formatToDateString } from '../../utils/dateFormatters';

export default function ScreeningSlide({ screening }) {
    return (
        <ScreeningSlideStyled>
            <ScreeningImageStyled src={IMAGE_FOLDER + screening.image} />
            <ScreeningInfoStyled>
                <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
                <ScreeningDateStyled>{formatToDateString(screening.date)}</ScreeningDateStyled>
            </ScreeningInfoStyled>
        </ScreeningSlideStyled>
    );
}

const ScreeningSlideStyled = styled.div`
    position: relative;
    width: 70%;
    margin: 0 auto;
`;

const ScreeningImageStyled = styled.img`
    width: 100%;
`;

const ScreeningInfoStyled = styled.div`
    position: absolute;
    bottom: 20px;
    color: var(--aka-gelb);
`;

const ScreeningTitleStyled = styled.h2`
    display: inline;
    margin: 0 20px;
    font-size: 40px;
`;

const ScreeningDateStyled = styled.span``;
