import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../constants';
import { HorizontalLineStyled } from './styledElements';

export default function SerialRow({ serial }) {
    return (
        <SerialRowStyled>
            <HorizontalLineStyled />
            <SerialContainerStyled>
                <LinkStyled to={'/serial/' + serial.uuid}>
                    {serial.image && <ImageStyled src={STORAGE_FOLDER + serial.image.path} />}
                </LinkStyled>
                <InfoContainerStyled>
                    <LinkStyled to={'/serial/' + serial.uuid}>
                        <TitleStyled>{serial.title}</TitleStyled>
                    </LinkStyled>
                    <SubTitleStyled>{serial.subtitle}</SubTitleStyled>
                    <ArticleStyled>{serial.article}</ArticleStyled>
                </InfoContainerStyled>
            </SerialContainerStyled>
        </SerialRowStyled>
    );
}

const SerialRowStyled = styled.li``;

const SerialContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 360px 480px;
`;

const ImageStyled = styled.img`
    height: 200px;
`;

const InfoContainerStyled = styled.div``;

const LinkStyled = styled(Link)``;

const TitleStyled = styled.h3``;

const SubTitleStyled = styled.p`
    width: 100%;
    font-weight: bold;
`;

const ArticleStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;
