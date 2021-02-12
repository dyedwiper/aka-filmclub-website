import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import SerialSelect from '../../common/forms/SerialSelect';
import { HorizontalLineStyled, PageStyled } from '../../common/styledElements';

export default function AddScreeningPage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue Vorführung anlegen</HeadlineStyled>
            <BaseForm>
                <FormRowWithTwoInputsStyled>
                    <LabelStyled>
                        Titel
                        <InputStyled name="title" />
                    </LabelStyled>
                    <LabelStyled>
                        Originaltitel
                        <InputStyled name="originalTitle" />
                    </LabelStyled>
                </FormRowWithTwoInputsStyled>
                <FormRowWithTwoInputsStyled>
                    <LabelStyled>
                        Datum
                        <InputStyled name="day" type="date" />
                    </LabelStyled>
                    <LabelStyled>
                        Uhrzeit
                        <InputStyled name="time" type="time" defaultValue="20:00" />
                    </LabelStyled>
                </FormRowWithTwoInputsStyled>
                <LabelStyled>
                    Beschreibung
                    <TextAreaStyled name="synopsis" />
                </LabelStyled>
                <FormRowWithTwoInputsStyled>
                    <LabelStyled>
                        Regie
                        <InputStyled name="directedBy" />
                    </LabelStyled>
                    <LabelStyled>
                        Drehbuch
                        <InputStyled name="writtenBy" />
                    </LabelStyled>
                </FormRowWithTwoInputsStyled>
                <FormRowWithTwoInputsStyled>
                    <LabelStyled>
                        Musik
                        <InputStyled name="musicBy" />
                    </LabelStyled>
                    <LabelStyled>
                        Kamera
                        <InputStyled name="shotBy" />
                    </LabelStyled>
                </FormRowWithTwoInputsStyled>
                <LabelStyled>
                    Besetzung
                    <InputStyled name="cast" />
                </LabelStyled>
                <FormRowWithThreeInputsStyled>
                    <LabelStyled>
                        Prodoktionsländer
                        <InputStyled name="country" />
                    </LabelStyled>
                    <LabelStyled>
                        Erscheinungsjahr
                        <InputStyled name="year" />
                    </LabelStyled>
                    <LabelStyled>
                        Länge in Minuten
                        <InputStyled name="length" />
                    </LabelStyled>
                </FormRowWithThreeInputsStyled>
                <FormRowWithThreeInputsStyled>
                    <LabelStyled>
                        Medium
                        <InputStyled name="medium" />
                    </LabelStyled>
                    <LabelStyled>
                        Sprachfassung
                        <InputStyled name="version" />
                    </LabelStyled>
                    <LabelStyled>
                        Veranstaltungsort
                        <InputStyled name="venue" />
                    </LabelStyled>
                </FormRowWithThreeInputsStyled>
                <LabelStyled>
                    Special
                    <InputStyled name="special" />
                </LabelStyled>
                <LabelStyled>
                    Dreizeiler
                    <TextAreaStyled name="tercet" />
                </LabelStyled>
                <LabelStyled>
                    Filmreihe
                    <SerialSelect />
                </LabelStyled>
                <HorizontalLineStyled />
                <ImageFormGroup />
                <HorizontalLineStyled />
                <ButtonStyled type="submit" onClick={submitForm}>
                    Speichern
                </ButtonStyled>
                <ButtonStyled type="button">Abbrechen</ButtonStyled>
            </BaseForm>
        </PageStyled>
    );

    function submitForm(event) {}
}

const HeadlineStyled = styled.h2``;

const LabelStyled = styled.label`
    display: block;
    margin: 10px 0;
    /* font-weight: bold; */
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

const ButtonStyled = styled.button``;
