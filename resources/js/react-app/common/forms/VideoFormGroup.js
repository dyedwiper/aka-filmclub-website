import React from 'react';
import styled from 'styled-components';
import PositionSelect from './PositionSelect';

export default function VideoFormGroup({ video }) {
    return (
        <VideoFormGroupStyled>
            <LabelStyled>
                Link
                <InputStyled name="source" defaultValue={video && video.source} />
            </LabelStyled>
            <LabelStyled>
                Titel
                <InputStyled name="title" defaultValue={video && video.question} />
            </LabelStyled>
            <LabelStyled>
                Beschreibung (optional)
                <TextareaStyled name="description" defaultValue={video && video.answer} />
            </LabelStyled>
            <PositionLabelStyled>
                Position
                <PositionSelect type="video" disabled={!video} defaultPosition={video && video.position} />
            </PositionLabelStyled>
        </VideoFormGroupStyled>
    );
}

const VideoFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 20px 0;
`;

const PositionLabelStyled = styled.label`
    display: grid;
    grid-template-columns: 80px 100px;
    align-items: center;
`;

const InputStyled = styled.input``;

const TextareaStyled = styled.textarea``;
