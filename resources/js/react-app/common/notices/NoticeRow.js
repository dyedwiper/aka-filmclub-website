import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_NOTICE, STORAGE_FOLDER } from '../../constants';
import { formatToDateString } from '../../utils/dateFormatters';
import { HorizontalRuleStyled } from '../styledElements';
import missingImage from '../../assets/missing.jpg';

export default function NoticeRow({ notice }) {
    return (
        <NoticeRowStyled>
            <HorizontalRuleStyled />
            <NoticeContainerStyled>
                <LinkStyled to={ROUTE_NOTICE + notice.uuid}>
                    <ImageStyled src={notice.image ? STORAGE_FOLDER + notice.image.path : missingImage} />
                </LinkStyled>
                <InfoContainerStyled>
                    <DateStyled>{formatToDateString(notice.date)}</DateStyled>
                    <LinkStyled to={ROUTE_NOTICE + notice.uuid}>
                        <TitleStyled>{notice.title}</TitleStyled>
                    </LinkStyled>
                    <ContentStyled dangerouslySetInnerHTML={{ __html: notice.content }} />
                </InfoContainerStyled>
            </NoticeContainerStyled>
        </NoticeRowStyled>
    );
}

const NoticeRowStyled = styled.li``;

const NoticeContainerStyled = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 4fr);
    grid-gap: 20px;

    @media (max-width: 767px) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto auto;
    }
`;

const ImageStyled = styled.img`
    width: 100%;
    object-fit: cover;
`;

const InfoContainerStyled = styled.div``;

const DateStyled = styled.div``;

const LinkStyled = styled(Link)``;

const TitleStyled = styled.h3``;

const ContentStyled = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
`;
