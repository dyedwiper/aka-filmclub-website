import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../../constants';
import { formatToDateString } from '../../utils/dateFormatters';

export default function ScreeningCard({ screening }) {
    return (
        <ScreeningCardStyled>
            <Link to={'/screening/' + screening.uuid}>
                {screening.image && <ScreeningImageStyled src={STORAGE_FOLDER + screening.image.path} />}
                <TitleStyled>{screening.title}</TitleStyled>
            </Link>
            <DateStyled>{formatToDateString(screening.date)}</DateStyled>
            <SynopsisStyled>{screening.synopsis}</SynopsisStyled>
        </ScreeningCardStyled>
    );
}

const ScreeningCardStyled = styled.li`
    width: 240px;
`;

const ScreeningImageStyled = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`;

const TitleStyled = styled.h4`
    margin: 10px 0;
`;

const DateStyled = styled.div`
    font-weight: bold;
`;

const SynopsisStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;
