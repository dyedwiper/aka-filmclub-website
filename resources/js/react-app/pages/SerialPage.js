import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import CopyrightContainer from '../common/misc/CopyrightContainer';
import UpdateInfo from '../common/misc/UpdateInfo';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import { HorizontalRuleStyled, PageStyled } from '../common/styledElements';
import {
    PAGE_TITLE_SERIAL,
    ROUTE_INTERN_ADD_IMAGE_SERIAL,
    ROUTE_INTERN_EDIT_IMAGE,
    ROUTE_INTERN_EDIT_SERIAL,
    ROUTE_NOT_FOUND,
    STORAGE_FOLDER,
} from '../constants';
import Context from '../Context';
import { showSerialImage } from '../utils/imageUtils';
import { getLastParameterFromPath } from '../utils/pathUtils';
import { getSerialByUuid } from '../utils/services/serialServices';
import LoadingPage from './LoadingPage';

export default function SerialPage() {
    const [serial, setSerial] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [noSerialFound, SetNoSerialFound] = useState(false);

    const { isUserEditor, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = serial.title + ' | aka-Filmclub';
        setPageTitle(PAGE_TITLE_SERIAL);
    }, [isLoading]);

    useEffect(() => {
        const serialUuid = getLastParameterFromPath();
        getSerialByUuid(serialUuid).then((res) => {
            if (!res.data.uuid) {
                SetNoSerialFound(true);
            }
            setSerial(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    if (noSerialFound) return <Redirect to={ROUTE_NOT_FOUND} />;

    return (
        <PageStyled>
            {showSerialImage(serial) ? (
                <ImageAndCopyrightContainerStyled>
                    <ImageContainerStyled>
                        <ImageStyled src={STORAGE_FOLDER + serial.image.path} />
                        <TitleContainerStyled>
                            <TitleStyled>{serial.title}</TitleStyled>
                            <SubtitleStyled>{serial.subtitle}</SubtitleStyled>
                        </TitleContainerStyled>
                    </ImageContainerStyled>
                    <CopyrightContainer image={serial.image} />
                </ImageAndCopyrightContainerStyled>
            ) : (
                <>
                    <FallbackTitleStyled>{serial.title}</FallbackTitleStyled>
                    <FallbackSubtitleStyled>{serial.subtitle}</FallbackSubtitleStyled>
                </>
            )}
            <TextContainerStyled>
                <ArticleStyled dangerouslySetInnerHTML={{ __html: serial.article }} />
                <AuthorStyled>{serial.author}</AuthorStyled>
                <HorizontalRuleStyled />
                <ScreeningsListStyled>
                    {serial.screenings.map((screening) => (
                        <ScreeningsListItem key={screening.id} screening={screening} />
                    ))}
                </ScreeningsListStyled>
                {isUserEditor && (
                    <>
                        <HorizontalRuleStyled />
                        <LinkStyled to={ROUTE_INTERN_EDIT_SERIAL + serial.uuid}>Reihe bearbeiten</LinkStyled>
                        <VertialLineStyled> | </VertialLineStyled>
                        {serial.image ? (
                            <LinkStyled to={ROUTE_INTERN_EDIT_IMAGE + serial.image.uuid}>Bild bearbeiten</LinkStyled>
                        ) : (
                            <LinkStyled to={ROUTE_INTERN_ADD_IMAGE_SERIAL + serial.uuid}>Bild hinzufügen</LinkStyled>
                        )}
                        <UpdateInfo entity={serial} />
                    </>
                )}
            </TextContainerStyled>
        </PageStyled>
    );
}

const ImageAndCopyrightContainerStyled = styled.div`
    margin: 20px 0;
`;

const ImageContainerStyled = styled.div`
    position: relative;
`;

const ImageStyled = styled.img`
    width: 100%;
`;

const TitleContainerStyled = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 60px 20px 10px 20px;
    color: var(--aka-gelb);
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

    @media (max-width: 767px) {
        padding: 60px 10px 10px 10px;
    }
`;

const TitleStyled = styled.h2`
    display: inline-block;
    margin: 0 20px 0 0;
    color: var(--aka-gelb);
    font-size: 3em;

    @media (max-width: 767px) {
        font-size: 1.5em;
    }
`;

const SubtitleStyled = styled.span``;

const FallbackTitleStyled = styled.h2`
    margin: 10px 0;
    padding: 0 20px;
    font-size: 2.1em;

    @media (max-width: 767px) {
        padding: 0;
    }
`;

const FallbackSubtitleStyled = styled.div`
    margin-bottom: 10px;
    padding: 0 20px;
    font-weight: bold;

    @media (max-width: 767px) {
        padding: 0;
    }
`;

const TextContainerStyled = styled.div`
    padding: 0 20px;

    @media (max-width: 767px) {
        padding: 0;
    }
`;

const ScreeningsListStyled = styled.ul``;

const ArticleStyled = styled.div``;

const AuthorStyled = styled.div`
    font-style: italic;
`;

const LinkStyled = styled(Link)``;

const VertialLineStyled = styled.span`
    color: var(--aka-gelb);
    font-weight: bold;
`;
