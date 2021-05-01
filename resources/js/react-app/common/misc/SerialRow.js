import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_SERIAL, STORAGE_FOLDER } from '../../constants';
import { HorizontalRuleStyled } from '../styledElements';
import akaLogoGrau from '../../assets/aka_logo_grau.png';

export default function SerialRow({ serial }) {
    return (
        <SerialRowStyled>
            <HorizontalRuleStyled />
            <SerialContainerStyled>
                <LinkStyled to={ROUTE_SERIAL + serial.uuid}>
                    <ImageStyled src={serial.image ? STORAGE_FOLDER + serial.image.path : akaLogoGrau} />
                </LinkStyled>
                <InfoContainerStyled>
                    <LinkStyled to={ROUTE_SERIAL + serial.uuid}>
                        <TitleStyled>{serial.title}</TitleStyled>
                    </LinkStyled>
                    <SubTitleStyled>{serial.subtitle}</SubTitleStyled>
                    <ArticleStyled dangerouslySetInnerHTML={{ __html: serial.article }} />
                </InfoContainerStyled>
            </SerialContainerStyled>
        </SerialRowStyled>
    );
}

const SerialRowStyled = styled.li``;

const SerialContainerStyled = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 4fr);
    grid-gap: 20px;

    @media (max-width: 767px) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto auto;
    }
`;

const ImageStyled = styled.img`
    width: 100%;
    object-fit: cover;
`;

const InfoContainerStyled = styled.div``;

const LinkStyled = styled(Link)``;

const TitleStyled = styled.h3``;

const SubTitleStyled = styled.div`
    width: 100%;
`;

const ArticleStyled = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;
