import React from 'react';
import styled from 'styled-components';
import PositionSelect from './PositionSelect';

export default function SelfmadeFilmFormGroup({ film }) {
    return (
        <VideoFormGroupStyled>
            <LabelStyled>
                Titel
                <InputStyled name="title" defaultValue={film && film.title} />
            </LabelStyled>
            <LabelStyled>
                Beschreibung
                <TextareaStyled name="synopsis" defaultValue={film && film.synopsis} />
            </LabelStyled>
            <FormRowWithTwoInputsStyled>
                <SmallInputLabelStyled>
                    Regie
                    <InputStyled name="directedBy" defaultValue={film && film.directed_by} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Drehbuch
                    <InputStyled name="writtenBy" defaultValue={film && film.written_by} />
                </SmallInputLabelStyled>
            </FormRowWithTwoInputsStyled>
            <LabelStyled>
                Besetzung
                <InputStyled name="cast" defaultValue={film && film.cast} />
            </LabelStyled>
            <FormRowWithTwoInputsStyled>
                <SmallInputLabelStyled>
                    Musik
                    <InputStyled name="musicBy" defaultValue={film && film.music_by} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Kamera
                    <InputStyled name="shotBy" defaultValue={film && film.shot_by} />
                </SmallInputLabelStyled>
            </FormRowWithTwoInputsStyled>
            <FormRowWithTwoInputsStyled>
                <SmallInputLabelStyled>
                    Schnitt
                    <InputStyled name="editedBy" defaultValue={film && film.edited_by} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Produktionsländer
                    <InputStyled name="country" defaultValue={film && film.country} />
                </SmallInputLabelStyled>
            </FormRowWithTwoInputsStyled>
            <FormRowWithTwoInputsStyled>
                <SmallInputLabelStyled>
                    Erscheinungsjahr
                    <InputStyled name="year" defaultValue={film && film.year} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Länge in Minuten
                    <InputStyled name="length" defaultValue={film && film.length} />
                </SmallInputLabelStyled>
            </FormRowWithTwoInputsStyled>
            <LabelStyled>
                Vimeo-ID
                <InputStyled name="vimeo_id" defaultValue={film && film.vimeo_id} />
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

const FormRowWithTwoInputsStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 20px;
    margin: 20px 0;
`;

const SmallInputLabelStyled = styled.label`
    display: block;
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
