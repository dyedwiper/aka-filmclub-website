import React from 'react';
import styled from 'styled-components';

export default function VideoContainer({ video }) {
    return (
        <VideoContainerStyled>
            <iframe src={video.source} width="640" height="361" allow="fullscreen; picture-in-picture" />
            <TitleStyled>{video.title}</TitleStyled>
            {video.description && <DescriptionStyled>{video.description}</DescriptionStyled>}
        </VideoContainerStyled>
    );
}

const VideoContainerStyled = styled.li``;

const TitleStyled = styled.h3``;

const DescriptionStyled = styled.p``;
