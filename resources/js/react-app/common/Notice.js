import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../constants';
import { formatDate } from '../utils/dateFormatters';

export default function Notice({ notice }) {
    return (
        <NoticeStyled>
            <HorizontalLineStyled />
            {notice.image && <ImageStyled src={STORAGE_FOLDER + notice.image.path} />}
            <DateStyled>{formatDate(notice.date)}</DateStyled>
            <TitleStyled>{notice.title}</TitleStyled>
            <ContentStyled>{notice.content}</ContentStyled>
            <LinkStyled to={'/intern/editNotice/' + notice.uuid}>Bearbeiten</LinkStyled>
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

const ImageStyled = styled.img``;

const DateStyled = styled.div``;

const TitleStyled = styled.h3``;

const ContentStyled = styled.p``;

const LinkStyled = styled(Link)``;
