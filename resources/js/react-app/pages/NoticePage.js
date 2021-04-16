import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalRuleStyled, PageStyled, VerticalLineStyled } from '../common/styledElements';
import {
    AUTH_LEVEL_EDITOR,
    ROUTE_INTERN_ADD_IMAGE_NOTICE,
    ROUTE_INTERN_EDIT_IMAGE,
    ROUTE_INTERN_EDIT_NOTICE,
    STORAGE_FOLDER,
} from '../constants';
import Context from '../Context';
import { formatToDateString } from '../utils/dateFormatters';
import { getNoticeByUuid } from '../utils/services/noticeServices';
import { getLastParameterFromPath } from '../utils/pathUtils';
import LoadingPage from './LoadingPage';

export default function NoticePage() {
    const [notice, setNotice] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useContext(Context);
    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

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
            {notice.image && <ImageStyled src={STORAGE_FOLDER + notice.image.path} />}
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

const ImageStyled = styled.img`
    max-width: 100%;
`;

const DateStyled = styled.div``;

const TitleStyled = styled.h2``;

const ContentStyled = styled.div``;

const LinkStyled = styled(Link)``;
