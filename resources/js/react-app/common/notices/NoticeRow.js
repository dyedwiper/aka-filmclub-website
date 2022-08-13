import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import akaLogoGrau from '../../assets/aka_logo_grau.png';
import { ROUTE_NOTICE, STORAGE_FOLDER } from '../../constants';
import { formatToDateString } from '../../utils/dateFormatters';
import { showNoticeImage } from '../../utils/imageUtils';
import { stripHtml } from '../../utils/stringUtils';

export default function NoticeRow({ notice }) {
    return (
        <NoticeRowStyled>
            <hr />
            <NoticeContainerStyled>
                <InfoContainerStyled>
                    <DateStyled>{formatToDateString(notice.date)}</DateStyled>
                    <LinkStyled to={ROUTE_NOTICE + notice.uuid}>
                        <TitleStyled>{notice.title}</TitleStyled>
                    </LinkStyled>
                    <ContentStyled>{stripHtml(notice.content)}</ContentStyled>
                    <Link to={ROUTE_NOTICE + notice.uuid}>[mehr]</Link>
                </InfoContainerStyled>
                <LinkStyled to={ROUTE_NOTICE + notice.uuid}>
                    <ImageStyled
                        src={showNoticeImage(notice) ? STORAGE_FOLDER + notice.image.path : akaLogoGrau}
                        alt={notice.image && notice.image.alt_text}
                    />
                </LinkStyled>
            </NoticeContainerStyled>
        </NoticeRowStyled>
    );
}

const NoticeRowStyled = styled.li``;

const NoticeContainerStyled = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(0, 3fr);
    grid-gap: 20px;

    @media (max-width: 767px) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto auto;
    }
`;

const InfoContainerStyled = styled.div`
    @media (max-width: 767px) {
        order: 1;
    }
`;

const DateStyled = styled.div``;

const LinkStyled = styled(Link)``;

const TitleStyled = styled.h3``;

const ContentStyled = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    margin-top: 10px;
`;

const ImageStyled = styled.img`
    width: 100%;
    max-height: 190px;
    object-fit: cover;

    @media (max-width: 767px) {
        max-height: initial;
        order: 2;
    }
`;
