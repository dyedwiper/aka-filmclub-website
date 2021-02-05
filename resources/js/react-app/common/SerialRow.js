import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled } from './styledElements';

export default function SerialRow({ serial }) {
    return (
        <SerialRowStyled>
            <HorizontalLineStyled />
            <SerialTitleLinkStyled to={'/serial'}>
                <SerialTitleStyled>{serial.title}</SerialTitleStyled>
            </SerialTitleLinkStyled>
            <SerialSubTitleStyled>{serial.subtitle}</SerialSubTitleStyled>
            <SerialArticleStyled>{serial.article}</SerialArticleStyled>
        </SerialRowStyled>
    );
}

const SerialRowStyled = styled.li``;

const SerialTitleLinkStyled = styled(Link)``;

const SerialTitleStyled = styled.h3``;

const SerialSubTitleStyled = styled.p`
    font-weight: bold;
`;

const SerialArticleStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;
