import React from 'react';
import styled from 'styled-components';

export default function Notice({ notice }) {
    return (
        <NoticeStyled>
            <NoticeImageStyled src={'/images/' + notice.image} />
            <NoticeTitleStyled>{notice.title}</NoticeTitleStyled>
            <NoticeContentStyled>{notice.content}</NoticeContentStyled>
        </NoticeStyled>
    );
}

const NoticeStyled = styled.article``;

const NoticeImageStyled = styled.img`
    filter: grayscale();
`;

const NoticeTitleStyled = styled.h2``;

const NoticeContentStyled = styled.p``;
