import React from 'react';
import styled from 'styled-components';
import SerialSelectFormGroup from './SerialSelectFormGroup';

export default function ScreeningFormGroup({ screening }) {
    return (
        <ScreeningFormGroupStyled>
            <FormRowWithTwoInputsStyled>
                <LabelStyled>
                    Titel
                    <InputStyled name="title" defaultValue={screening && screening.title} />
                </LabelStyled>
                <LabelStyled>
                    Originaltitel
                    <InputStyled name="originalTitle" defaultValue={screening && screening.original_title} />
                </LabelStyled>
            </FormRowWithTwoInputsStyled>
            <FormRowWithTwoInputsStyled>
                <LabelStyled>
                    Datum
                    <InputStyled name="day" type="date" defaultValue={screening && screening.date} />
                </LabelStyled>
                <LabelStyled>
                    Uhrzeit
                    <InputStyled name="time" type="time" defaultValue={screening ? screening.time : '20:00'} />
                </LabelStyled>
            </FormRowWithTwoInputsStyled>
            <LabelStyled>
                Beschreibung
                <TextAreaStyled name="synopsis" defaultValue={screening && screening.synopsis} />
            </LabelStyled>
            <FormRowWithTwoInputsStyled>
                <LabelStyled>
                    Regie
                    <InputStyled name="directedBy" defaultValue={screening && screening.directed_by} />
                </LabelStyled>
                <LabelStyled>
                    Drehbuch
                    <InputStyled name="writtenBy" defaultValue={screening && screening.written_by} />
                </LabelStyled>
            </FormRowWithTwoInputsStyled>
            <FormRowWithTwoInputsStyled>
                <LabelStyled>
                    Musik
                    <InputStyled name="musicBy" defaultValue={screening && screening.music_by} />
                </LabelStyled>
                <LabelStyled>
                    Kamera
                    <InputStyled name="shotBy" defaultValue={screening && screening.shot_by} />
                </LabelStyled>
            </FormRowWithTwoInputsStyled>
            <LabelStyled>
                Besetzung
                <InputStyled name="cast" defaultValue={screening && screening.cast} />
            </LabelStyled>
            <FormRowWithThreeInputsStyled>
                <LabelStyled>
                    Prodoktionsländer
                    <InputStyled name="country" defaultValue={screening && screening.country} />
                </LabelStyled>
                <LabelStyled>
                    Erscheinungsjahr
                    <InputStyled name="year" defaultValue={screening && screening.year} />
                </LabelStyled>
                <LabelStyled>
                    Länge in Minuten
                    <InputStyled name="length" defaultValue={screening && screening.length} />
                </LabelStyled>
            </FormRowWithThreeInputsStyled>
            <FormRowWithThreeInputsStyled>
                <LabelStyled>
                    Medium
                    <InputStyled name="medium" defaultValue={screening && screening.medium} />
                </LabelStyled>
                <LabelStyled>
                    Sprachfassung
                    <InputStyled name="version" defaultValue={screening && screening.version} />
                </LabelStyled>
                <LabelStyled>
                    Veranstaltungsort
                    <InputStyled name="venue" defaultValue={screening ? screening.venue : 'GHS Biologie'} />
                </LabelStyled>
            </FormRowWithThreeInputsStyled>
            <LabelStyled>
                Special
                <InputStyled name="special" defaultValue={screening && screening.special} />
            </LabelStyled>
            <LabelStyled>
                Dreizeiler
                <TextAreaStyled name="tercet" defaultValue={screening && screening.tercet} />
            </LabelStyled>
            <LabelStyled>
                Filmreihe
                <SerialSelectFormGroup defaultSerial={screening && screening.serial} />
            </LabelStyled>
            <LabelStyled>
                Autor*in
                <InputStyled name="author" defaultValue={screening && screening.author} />
            </LabelStyled>
        </ScreeningFormGroupStyled>
    );
}

const ScreeningFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 10px 0;
`;

const InputStyled = styled.input``;

const TextAreaStyled = styled.textarea``;

const FormRowWithTwoInputsStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
`;

const FormRowWithThreeInputsStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
`;
