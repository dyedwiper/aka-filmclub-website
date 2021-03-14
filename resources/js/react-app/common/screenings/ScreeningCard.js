import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../../constants';
import { formatToDateString } from '../../utils/dateFormatters';

export default function ScreeningCard({ screening }) {
    return (
        <ScreeningCardStyled>
            <Link to={'/screening/' + screening.uuid}>
                <ImageContainerStyled>
                    {screening.image && <ImageStyled src={STORAGE_FOLDER + screening.image.path} />}
                    <TitleStyled>{screening.title}</TitleStyled>
                </ImageContainerStyled>
                <DateStyled>{formatToDateString(screening.date)}</DateStyled>
                <SynopsisStyled dangerouslySetInnerHTML={{ __html: screening.synopsis }} />
            </Link>
        </ScreeningCardStyled>
    );
}

const ScreeningCardStyled = styled.li``;

const ImageContainerStyled = styled.div`
    position: relative;
    margin-bottom: 10px;
`;

const ImageStyled = styled.img`
    display: block;
    width: 100%;
    height: 150px;
    object-fit: cover;

    @media (max-width: 767px) {
        height: initial;
    }
`;

const TitleStyled = styled.h3`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 20px 10px 5px 10px;
    color: var(--aka-gelb);
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const DateStyled = styled.div`
    font-weight: bold;
`;

const SynopsisStyled = styled.div`
    margin: 10px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;
