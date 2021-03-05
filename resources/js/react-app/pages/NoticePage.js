import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled, PageStyled, VerticalLineStyled } from '../common/styledElements';
import { AUTH_LEVEL_EDITOR, STORAGE_FOLDER } from '../constants';
import Context from '../Context';
import { formatToDateString } from '../utils/dateFormatters';
import { deleteImage } from '../utils/imageServices';
import { getNoticeByUuid } from '../utils/noticeServices';
import { getLastParameterFromPath } from '../utils/pathUtils';
import LoadingPage from './LoadingPage';

export default function NoticePage() {
    const [notice, setNotice] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDeletingImage, setIsDeletingImage] = useState(false);

    const { user } = useContext(Context);
    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getNoticeByUuid(uuid).then((res) => {
            setNotice(res.data);
            setIsLoading(false);
        });
    }, [isDeletingImage]);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            {notice.image && <ImageStyled src={STORAGE_FOLDER + notice.image.path} />}
            <DateStyled>{formatToDateString(notice.date)}</DateStyled>
            <TitleStyled>{notice.title}</TitleStyled>
            <ContentStyled>{notice.content}</ContentStyled>
            {isAuthorized && (
                <>
                    <HorizontalLineStyled />
                    <LinkStyled to={'/intern/editNotice/' + notice.uuid}>News bearbeiten</LinkStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    {notice.image ? (
                        <>
                            <LinkStyled to={'/intern/editImage/' + notice.image.uuid}>Bild bearbeiten</LinkStyled>
                            <ButtonStyled type="button" onClick={handleImageDelete}>
                                Bild löschen
                            </ButtonStyled>
                        </>
                    ) : (
                        <LinkStyled to={'/intern/addImage/notice/' + notice.uuid}>Bild hinzufügen</LinkStyled>
                    )}
                </>
            )}
        </PageStyled>
    );

    function handleImageDelete() {
        setIsDeletingImage(true);
        deleteImage(notice.image.uuid).then(() => {
            setIsDeletingImage(false);
        });
    }
}

const ImageStyled = styled.img`
    max-width: 100%;
`;

const DateStyled = styled.div``;

const TitleStyled = styled.h2``;

const ContentStyled = styled.p``;

const LinkStyled = styled(Link)``;

const ButtonStyled = styled.button``;
