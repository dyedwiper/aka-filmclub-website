import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import akaLogoGrau from '../../assets/aka_logo_grau.png';
import { ROUTE_NOTICE, STORAGE_FOLDER } from '../../constants';
import { showNoticeImage } from '../../utils/imageUtils';
import { stripHtml } from '../../utils/stringUtils';

export default function NoticeCard({ notice }) {
    return (
        <NoticeCardStyled>
            <Link to={ROUTE_NOTICE + notice.uuid}>
                <ImageStyled
                    src={showNoticeImage(notice) ? STORAGE_FOLDER + notice.image.path : akaLogoGrau}
                    alt={notice.image && notice.image.alt_text}
                />
                <TitleStyled>{notice.title}</TitleStyled>
            </Link>
            <ContentStyled>{stripHtml(notice.content)}</ContentStyled>
            <Link to={ROUTE_NOTICE + notice.uuid}>[mehr]</Link>
        </NoticeCardStyled>
    );
}

const NoticeCardStyled = styled.li``;

const ImageStyled = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;

    @media (max-width: 767px) {
        height: initial;
    }
`;

const TitleStyled = styled.h4`
    margin: 10px 0;
`;

const ContentStyled = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;
