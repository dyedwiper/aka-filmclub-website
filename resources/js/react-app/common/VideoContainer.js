import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR } from '../constants';
import Context from '../Context';
import { HorizontalRuleStyled } from './styledElements';

export default function VideoContainer({ video }) {
    const { user } = useContext(Context);
    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    return (
        <VideoContainerStyled>
            <HorizontalRuleStyled />
            <iframe src={video.source} width="640" height="361" allow="fullscreen; picture-in-picture" />
            <TitleStyled>{video.title}</TitleStyled>
            {video.description && <DescriptionStyled>{video.description}</DescriptionStyled>}
            {isAuthorized && <LinkStyled to={'/intern/editVideo/' + video.uuid}>Bearbeiten</LinkStyled>}
        </VideoContainerStyled>
    );
}

const VideoContainerStyled = styled.li`
    margin: 40px 0;
`;

const TitleStyled = styled.h3``;

const DescriptionStyled = styled.p``;

const LinkStyled = styled(Link)``;
