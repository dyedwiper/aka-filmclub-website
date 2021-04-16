import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR, ROUTE_INTERN_EDIT_SELFMADE_FILM } from '../constants';
import Context from '../Context';
import { HorizontalRuleStyled } from './styledElements';

export default function VideoContainer({ video }) {
    const { user } = useContext(Context);
    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    return (
        <VideoContainerStyled>
            <HorizontalRuleStyled />
            <IFrameContainerStyled>
                <IFrameStyled src={video.source} allow="fullscreen; picture-in-picture" />
            </IFrameContainerStyled>
            <TitleStyled>{video.title}</TitleStyled>
            {video.description && <DescriptionStyled>{video.description}</DescriptionStyled>}
            {isAuthorized && <LinkStyled to={ROUTE_INTERN_EDIT_SELFMADE_FILM + video.uuid}>Bearbeiten</LinkStyled>}
        </VideoContainerStyled>
    );
}

const VideoContainerStyled = styled.li`
    margin: 20px 0 40px 0;
`;

const IFrameContainerStyled = styled.div`
    position: relative;
    /* Padding in percent is calculated of parent's width. 56.25% stands for aspect ration 16:9. */
    padding-bottom: 56.25%;
`;

const IFrameStyled = styled.iframe`
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
`;

const TitleStyled = styled.h3`
    margin-top: 10px;
`;

const DescriptionStyled = styled.p``;

const LinkStyled = styled(Link)``;
