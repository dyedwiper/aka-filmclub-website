import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IMAGE_FOLDER } from '../../constants';
import { formatDateAndTime } from '../../utils/dateFormatters';

export default function ScreeningRow({ screening }) {
    return (
        <ScreeningRowStyled>
            <HorizontalLineStyled />
            <ScreeningContainerStyled>
                <LinkStyled to={'/screening/' + screening.uuid}>
                    <ScreeningImageStyled src={IMAGE_FOLDER + screening.image} />
                </LinkStyled>
                <ScreeningInfoStyled>
                    <ScreeningDateStyled>{formatDateAndTime(screening.date)}</ScreeningDateStyled>
                    <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
                    <ScreeningSynopsisStyled>{screening.synopsis}</ScreeningSynopsisStyled>
                </ScreeningInfoStyled>
            </ScreeningContainerStyled>
        </ScreeningRowStyled>
    );
}

const ScreeningRowStyled = styled.li``;

const HorizontalLineStyled = styled.div`
    height: 10px;
    width: 80%;
    margin: 20px 0;
    background-color: var(--aka-gelb);
`;

const ScreeningContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 360px 1fr;
`;

const LinkStyled = styled(Link)``;

const ScreeningImageStyled = styled.img`
    height: 200px;
`;

const ScreeningInfoStyled = styled.div``;

const ScreeningDateStyled = styled.div``;

const ScreeningTitleStyled = styled.h3``;

const ScreeningSynopsisStyled = styled.p``;
