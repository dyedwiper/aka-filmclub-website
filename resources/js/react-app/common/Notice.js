import React from 'react';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../constants';

export default function Notice({ notice }) {
    return (
        <NoticeStyled>
            <HorizontalLineStyled />
            <NoticeTitleStyled>{notice.title}</NoticeTitleStyled>
            {notice.image && <NoticeImageStyled src={STORAGE_FOLDER + notice.image.source} />}
            <NoticeContentStyled>{notice.content}</NoticeContentStyled>
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

const NoticeImageStyled = styled.img`
    filter: grayscale();
`;

const NoticeTitleStyled = styled.h3``;

const NoticeContentStyled = styled.p``;
