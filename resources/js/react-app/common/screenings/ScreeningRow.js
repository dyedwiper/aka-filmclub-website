import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../../constants';
import { formatToDateTimeString } from '../../utils/dateFormatters';

export default function ScreeningRow({ screening }) {
    return (
        <ScreeningRowStyled>
            <HorizontalLineStyled />
            <ScreeningContainerStyled>
                <LinkStyled to={'/screening/' + screening.uuid}>
                    {screening.image && <ScreeningImageStyled src={STORAGE_FOLDER + screening.image.path} />}
                </LinkStyled>
                <InfoContainerStyled>
                    <DateStyled>{formatToDateTimeString(screening.date)}</DateStyled>
                    <LinkStyled to={'/screening/' + screening.uuid}>
                        <TitleStyled>{screening.title}</TitleStyled>
                    </LinkStyled>
                    <SynopsisStyled dangerouslySetInnerHTML={{ __html: screening.synopsis }} />
                </InfoContainerStyled>
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
    grid-template-columns: minmax(0, 3fr) minmax(0, 4fr);
    grid-gap: 20px;

    @media (max-width: 767px) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto auto;
    }
`;

const LinkStyled = styled(Link)``;

const ScreeningImageStyled = styled.img`
    width: 100%;
    object-fit: cover;
`;

const InfoContainerStyled = styled.div``;

const DateStyled = styled.div``;

const TitleStyled = styled.h3``;

const SynopsisStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    margin-top: 10px;
`;
