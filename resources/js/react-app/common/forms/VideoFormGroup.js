import React from 'react';
import styled from 'styled-components';
import PositionSelect from './PositionSelect';

export default function VideoFormGroup({ video }) {
    return (
        <VideoFormGroupStyled>
            <LabelStyled>
                Link
                <HintSyled>
                    Hinweis: Der Link muss die Form <em>https://player.vimeo.com/video/467070172</em> haben.
                </HintSyled>
                <InputStyled name="source" defaultValue={video && video.source} />
            </LabelStyled>
            <LabelStyled>
                Titel
                <InputStyled name="title" defaultValue={video && video.title} />
            </LabelStyled>
            <LabelStyled>
                Beschreibung (optional)
                <TextareaStyled name="description" defaultValue={video && video.description} />
            </LabelStyled>
            {video && (
                <PositionLabelStyled>
                    Position
                    <PositionSelect type="video" defaultPosition={video.position} />
                </PositionLabelStyled>
            )}
        </VideoFormGroupStyled>
    );
}

const VideoFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 20px 0;
`;

const HintSyled = styled.div`
    font-size: 0.7em;
`;

const PositionLabelStyled = styled.label`
    display: grid;
    grid-template-columns: 80px 100px;
    align-items: center;
`;

const InputStyled = styled.input``;

const TextareaStyled = styled.textarea`
    height: 160px;
`;
