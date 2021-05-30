import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CopyrightContainer from '../common/misc/CopyrightContainer';
import { HorizontalRuleStyled, PageStyled, VerticalLineStyled } from '../common/styledElements';
import {
    AUTH_LEVEL_EDITOR,
    PAGE_TITLE_NEWS,
    ROUTE_INTERN_ADD_IMAGE_NOTICE,
    ROUTE_INTERN_EDIT_IMAGE,
    ROUTE_INTERN_EDIT_NOTICE,
    STORAGE_FOLDER,
} from '../constants';
import Context from '../Context';
import { formatToDateString } from '../utils/dateFormatters';
import { showNoticeImage } from '../utils/imageUtils';
import { getLastParameterFromPath } from '../utils/pathUtils';
import { getNoticeByUuid } from '../utils/services/noticeServices';
import LoadingPage from './LoadingPage';

export default function NoticePage() {
    const [notice, setNotice] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { user, setPageTitle } = useContext(Context);
    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        document.title = notice.title + ' | aka-Filmclub';
        setPageTitle(PAGE_TITLE_NEWS);
    }, [isLoading]);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getNoticeByUuid(uuid).then((res) => {
            setNotice(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            {showNoticeImage(notice) && (
                <ImageAndCopyrightContainerStyled>
                    <ImageStyled src={STORAGE_FOLDER + notice.image.path} />
                    <CopyrightContainer image={notice.image} />
                </ImageAndCopyrightContainerStyled>
            )}
            <DateStyled>{formatToDateString(notice.date)}</DateStyled>
            <TitleStyled>{notice.title}</TitleStyled>
            <ContentStyled dangerouslySetInnerHTML={{ __html: notice.content }} />
            {isAuthorized && (
                <>
                    <HorizontalRuleStyled />
                    <LinkStyled to={ROUTE_INTERN_EDIT_NOTICE + notice.uuid}>News bearbeiten</LinkStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    {notice.image ? (
                        <LinkStyled to={ROUTE_INTERN_EDIT_IMAGE + notice.image.uuid}>Bild bearbeiten</LinkStyled>
                    ) : (
                        <LinkStyled to={ROUTE_INTERN_ADD_IMAGE_NOTICE + notice.uuid}>Bild hinzufügen</LinkStyled>
                    )}
                </>
            )}
        </PageStyled>
    );
}

const ImageAndCopyrightContainerStyled = styled.div`
    margin: 20px 0;
`;

const ImageStyled = styled.img`
    max-width: 100%;
`;

const DateStyled = styled.div``;

const TitleStyled = styled.h2`
    margin: 0;
`;

const ContentStyled = styled.div``;

const LinkStyled = styled(Link)``;
