import React from 'react';
import styled from 'styled-components';
import PositionSelect from './PositionSelect';

export default function SelfmadeFilmFormGroup({ film }) {
    return (
        <VideoFormGroupStyled>
            <LabelStyled>
                Link
                <HintSyled>
                    Hinweis: Der Link muss die Form <em>https://player.vimeo.com/video/467070172</em> haben.
                </HintSyled>
                <InputStyled name="source" defaultValue={film && film.source} />
            </LabelStyled>
            <LabelStyled>
                Titel
                <InputStyled name="title" defaultValue={film && film.title} />
            </LabelStyled>
            <LabelStyled>
                Beschreibung (optional)
                <TextareaStyled name="synopsis" defaultValue={film && film.synopsis} />
            </LabelStyled>
            {film && (
                <PositionLabelStyled>
                    Position
                    <PositionSelect type="selfmadeFilm" defaultPosition={film.position} />
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
