import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../constants';
import { formatToDateString } from '../utils/dateFormatters';

export default function Notice({ notice }) {
    return (
        <NoticeStyled>
            <HorizontalLineStyled />
            <LinkStyled to={'/news/' + notice.uuid}>
                {notice.image && <ImageStyled src={STORAGE_FOLDER + notice.image.path} />}
            </LinkStyled>
            <DateStyled>{formatToDateString(notice.date)}</DateStyled>
            <LinkStyled to={'/news/' + notice.uuid}>
                <TitleStyled>{notice.title}</TitleStyled>
            </LinkStyled>
            <ContentStyled>{notice.content}</ContentStyled>
            <LinkStyled to={'/news/' + notice.uuid}></LinkStyled>
        </NoticeStyled>
    );
}

const NoticeStyled = styled.article``;

const HorizontalLineStyled = styled.div`
    height: 10px;
    width: 80%;
    margin: 20px 0;
    background-color: var(--aka-gelb);
`;

const ImageStyled = styled.img`
    max-width: 100%;
`;

const DateStyled = styled.div``;

const TitleStyled = styled.h3``;

const ContentStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;

const LinkStyled = styled(Link)``;
