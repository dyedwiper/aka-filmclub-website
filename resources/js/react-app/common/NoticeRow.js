import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../constants';
import { formatToDateString } from '../utils/dateFormatters';
import { HorizontalLineStyled } from './styledElements';

export default function NoticeRow({ notice }) {
    return (
        <NoticeRowStyled>
            <HorizontalLineStyled />
            <NoticeContainerStyled>
                <LinkStyled to={'/news/' + notice.uuid}>
                    {notice.image && <ImageStyled src={STORAGE_FOLDER + notice.image.path} />}
                </LinkStyled>
                <InfoContainerStyled>
                    <DateStyled>{formatToDateString(notice.date)}</DateStyled>
                    <LinkStyled to={'/news/' + notice.uuid}>
                        <TitleStyled>{notice.title}</TitleStyled>
                    </LinkStyled>
                    <ContentStyled>{notice.content}</ContentStyled>
                </InfoContainerStyled>
            </NoticeContainerStyled>
        </NoticeRowStyled>
    );
}

const NoticeRowStyled = styled.li``;

const NoticeContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 360px 480px;
    grid-gap: 20px;

    @media (max-width: 901px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }
`;

const ImageStyled = styled.img`
    height: 200px;
`;

const InfoContainerStyled = styled.div``;

const DateStyled = styled.div``;

const LinkStyled = styled(Link)``;

const TitleStyled = styled.h3``;

const ContentStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
`;
