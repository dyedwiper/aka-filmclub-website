import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import VideoContainer from '../common/VideoContainer';
import { AUTH_LEVEL_EDITOR } from '../constants';
import Context from '../Context';
import { getVideos } from '../utils/videoServices';
import LoadingPage from './LoadingPage';

export default function VideosPage() {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, pageTitle, setPageTitle } = useContext(Context);

    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        document.title = 'Eigenproduktionen | aka-Filmclub';
        setPageTitle('Eigenproduktionen');
    }, []);

    useEffect(() => {
        getVideos().then((res) => {
            setVideos(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            {isAuthorized && <LinkStyled to="/intern/addVideo">Video hinzufügen</LinkStyled>}
            <VideosListStyled>
                {videos.map((video) => (
                    <VideoContainer key={video.id} video={video} />
                ))}
            </VideosListStyled>
        </PageStyled>
    );
}

const VideosListStyled = styled.ul``;

const LinkStyled = styled(Link)``;
