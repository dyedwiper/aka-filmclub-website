import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { STORAGE_FOLDER } from '../constants';
import missingImage from '../assets/missing.jpg';

export default function NoticeCard({ notice }) {
    return (
        <NoticeCardStyled>
            <Link to={'/news/' + notice.uuid}>
                <ImageStyled src={notice.image ? STORAGE_FOLDER + notice.image.path : missingImage} />
                <TitleStyled>{notice.title}</TitleStyled>
            </Link>
            <ContentStyled>{notice.content}</ContentStyled>
        </NoticeCardStyled>
    );
}

const NoticeCardStyled = styled.li``;

const ImageStyled = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`;

const TitleStyled = styled.h4`
    margin: 10px 0;
`;

const ContentStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;
