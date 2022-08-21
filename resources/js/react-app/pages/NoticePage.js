import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CopyrightContainer from '../common/misc/CopyrightContainer';
import UpdateInfo from '../common/misc/UpdateInfo';
import { PageStyled, VerticalLineStyled } from '../common/styledElements';
import {
    PAGE_TITLE_NEWS,
    ROUTE_INTERN_ADD_IMAGE_NOTICE,
    ROUTE_INTERN_EDIT_IMAGE,
    ROUTE_INTERN_EDIT_NOTICE,
    ROUTE_NOT_FOUND,
    STORAGE_FOLDER,
} from '../constants';
import Context from '../Context';
import { formatToDateString } from '../utils/dateFormatters';
import { showNoticeImage } from '../utils/imageUtils';
import { getNoticeByUuid } from '../utils/services/noticeServices';
import LoadingPage from './LoadingPage';

export default function NoticePage() {
    const [notice, setNotice] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [noNoticeFound, setNoNoticeFound] = useState(false);

    const { isUserEditor, setPageTitle } = useContext(Context);

    const { uuid } = useParams();

    useEffect(() => {
        document.title = notice.title + ' | aka-Filmclub';
        setPageTitle(PAGE_TITLE_NEWS);
    }, [isLoading]);

    useEffect(() => {
        getNoticeByUuid(uuid).then((res) => {
            if (!res.data.uuid) {
                setNoNoticeFound(true);
            }
            setNotice(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

    if (isLoading) return <LoadingPage />;

    if (noNoticeFound) return <Redirect to={ROUTE_NOT_FOUND} />;

    return (
        <PageStyled>
            {showNoticeImage(notice) ? (
                <ImageAndCopyrightContainerStyled>
                    <ImageStyled src={STORAGE_FOLDER + notice.image.path} alt={notice.image.alt_text} />
                    <CopyrightContainer image={notice.image} />
                </ImageAndCopyrightContainerStyled>
            ) : (
                <CushionStyled />
            )}
            <DateStyled>{formatToDateString(notice.date)}</DateStyled>
            <TitleStyled>{notice.title}</TitleStyled>
            <ContentStyled dangerouslySetInnerHTML={{ __html: notice.content }} />
            {isUserEditor && (
                <>
                    <hr />
                    <LinkStyled to={ROUTE_INTERN_EDIT_NOTICE + notice.uuid}>News bearbeiten</LinkStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    {notice.image ? (
                        <LinkStyled to={ROUTE_INTERN_EDIT_IMAGE + notice.image.uuid}>Bild bearbeiten</LinkStyled>
                    ) : (
                        <LinkStyled to={ROUTE_INTERN_ADD_IMAGE_NOTICE + notice.uuid}>Bild hinzufügen</LinkStyled>
                    )}
                    <UpdateInfo entity={notice} />
                </>
            )}
        </PageStyled>
    );
}

const ImageAndCopyrightContainerStyled = styled.div`
    position: relative;
    margin: 20px 0;
`;

const ImageStyled = styled.img`
    width: 100%;
`;

const CushionStyled = styled.div`
    height: 30px;
`;

const DateStyled = styled.div``;

const TitleStyled = styled.h2`
    margin: 0;
`;

const ContentStyled = styled.div``;

const LinkStyled = styled(Link)``;
