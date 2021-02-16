import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../../constants';
import { formatDateAndTime } from '../../utils/dateFormatters';

export default function ScreeningRow({ screening }) {
    return (
        <ScreeningRowStyled>
            <HorizontalLineStyled />
            <ScreeningContainerStyled>
                <LinkStyled to={'/screening/' + screening.uuid}>
                    {screening.image && <ScreeningImageStyled src={STORAGE_FOLDER + screening.image.path} />}
                </LinkStyled>
                <ScreeningInfoStyled>
                    <ScreeningDateStyled>{formatDateAndTime(screening.date)}</ScreeningDateStyled>
                    <LinkStyled to={'/screening/' + screening.uuid}>
                        <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
                    </LinkStyled>
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

const ScreeningSynopsisStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;
