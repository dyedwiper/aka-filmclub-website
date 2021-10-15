import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import akaLogoGrau from '../../assets/aka_logo_grau.png';
import { ROUTE_SERIAL, STORAGE_FOLDER } from '../../constants';
import { showSerialImage } from '../../utils/imageUtils';
import { stripHtml } from '../../utils/stringUtils';
import { HorizontalRuleStyled } from '../styledElements';

export default function SerialRow({ serial }) {
    return (
        <SerialRowStyled>
            <HorizontalRuleStyled />
            <SerialContainerStyled>
                <LinkStyled to={ROUTE_SERIAL + serial.uuid}>
                    <ImageStyled
                        src={showSerialImage(serial) ? STORAGE_FOLDER + serial.image.path : akaLogoGrau}
                        alt={serial.image && serial.image.alt_text}
                    />
                </LinkStyled>
                <InfoContainerStyled>
                    <LinkStyled to={ROUTE_SERIAL + serial.uuid}>
                        <TitleStyled>{serial.title}</TitleStyled>
                    </LinkStyled>
                    <SubTitleStyled>{serial.subtitle}</SubTitleStyled>
                    <ArticleStyled>{stripHtml(serial.article)}</ArticleStyled>
                    <Link to={ROUTE_SERIAL + serial.uuid}>[mehr]</Link>
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
    max-height: 190px;
    object-fit: cover;

    @media (max-width: 767px) {
        max-height: initial;
    }
`;

const InfoContainerStyled = styled.div``;

const LinkStyled = styled(Link)``;

const TitleStyled = styled.h3``;

const SubTitleStyled = styled.div``;

const ArticleStyled = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    margin-top: 10px;
`;
