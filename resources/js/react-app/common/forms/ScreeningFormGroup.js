import React from 'react';
import styled from 'styled-components';
import { formatToIsoDateString, formatToTimeString } from '../../utils/dateFormatters';
import ScreeningSelect from './ScreeningSelect';
import SerialSelect from './SerialSelect';
import WysiwygFormInput from './WysiwygFormInput';
import { FSK_RATING_NONE } from '../../constants';
import FskRatingSelect from './FskRatingSelect';

export default function ScreeningFormGroup({ screening }) {
    return (
        <ScreeningFormGroupStyled>
            <FormRowWithTwoInputsStyled>
                <SmallInputLabelStyled>
                    Titel
                    <InputStyled name="title" defaultValue={screening && screening.title} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Originaltitel
                    <InputStyled name="originalTitle" defaultValue={screening && screening.original_title} />
                </SmallInputLabelStyled>
            </FormRowWithTwoInputsStyled>
            <FormRowWithTwoInputsStyled>
                <SmallInputLabelStyled>
                    Datum
                    <InputStyled
                        name="day"
                        type="date"
                        defaultValue={screening && screening.date && formatToIsoDateString(screening.date)}
                    />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Uhrzeit
                    <InputStyled
                        name="time"
                        type="time"
                        defaultValue={screening && screening.date ? formatToTimeString(screening.date) : '20:00'}
                    />
                </SmallInputLabelStyled>
            </FormRowWithTwoInputsStyled>
            <FakeLabelStyled>
                Beschreibung
                <WysiwygFormInput inputName="synopsis" defaultValue={screening && screening.synopsis} />
            </FakeLabelStyled>
            <FormRowWithTwoInputsStyled>
                <SmallInputLabelStyled>
                    Regie
                    <InputStyled name="directedBy" defaultValue={screening && screening.directed_by} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Drehbuch
                    <InputStyled name="writtenBy" defaultValue={screening && screening.written_by} />
                </SmallInputLabelStyled>
            </FormRowWithTwoInputsStyled>
            <FormRowWithTwoInputsStyled>
                <SmallInputLabelStyled>
                    Musik
                    <InputStyled name="musicBy" defaultValue={screening && screening.music_by} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Kamera
                    <InputStyled name="shotBy" defaultValue={screening && screening.shot_by} />
                </SmallInputLabelStyled>
            </FormRowWithTwoInputsStyled>
            <LabelStyled>
                Besetzung
                <InputStyled name="cast" defaultValue={screening && screening.cast} />
            </LabelStyled>
            <SmallInputsContainerStyled>
                <SmallInputLabelStyled>
                    Produktionsländer
                    <InputStyled name="country" defaultValue={screening && screening.country} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Erscheinungsjahr
                    <InputStyled name="year" defaultValue={screening && screening.year} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Länge in Minuten
                    <InputStyled name="length" defaultValue={screening && screening.length} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Medium
                    <InputStyled name="medium" defaultValue={screening && screening.medium} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Sprachfassung
                    <InputStyled name="version" defaultValue={screening && screening.version} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    Veranstaltungsort
                    <InputStyled
                        name="venue"
                        defaultValue={screening && screening.venue ? screening.venue : 'GHS Biologie'}
                    />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    FSK
                    <FskRatingSelect defaultRating={screening && screening.fsk ? screening.fsk : FSK_RATING_NONE} />
                </SmallInputLabelStyled>
                <SmallInputLabelStyled>
                    FSK-Deskriptoren
                    <InputStyled name="descriptors" defaultValue={screening && screening.descriptors} />
                </SmallInputLabelStyled>
            </SmallInputsContainerStyled>
            <LabelStyled>
                Special
                <InputStyled name="special" defaultValue={screening && screening.special} />
            </LabelStyled>
            <LabelStyled>
                Dreizeiler
                <TercetTextareaStyled name="tercet" defaultValue={screening && screening.tercet} />
            </LabelStyled>
            <LabelStyled>
                Filmreihe
                <SerialSelect defaultSerial={screening && screening.serial} isEditing={Object.keys(screening).length} />
            </LabelStyled>
            <LabelStyled>
                Vorfilm zu
                <ScreeningSelect
                    parentScreening={screening}
                    defaultScreening={screening && screening.main_film}
                    isEditing={Object.keys(screening).length}
                />
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
    margin: 20px 0;
`;

// This is used because a real label element surrounding the Wysiwyg editor leads to unexpected behavior.
// And at the moment it is also not possible to explicitly associate a label to the editor, see: https://github.com/jpuri/react-draft-wysiwyg/issues/539
const FakeLabelStyled = styled.div`
    display: block;
    margin: 20px 0;
`;

const SmallInputLabelStyled = styled.label`
    display: block;
`;

const InputStyled = styled.input``;

const TercetTextareaStyled = styled.textarea`
    height: 80px;
`;

const FormRowWithTwoInputsStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 20px;
    margin: 20px 0;
`;

const SmallInputsContainerStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    grid-gap: 20px;
    margin: 20px 0;

    @media (max-width: 767px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
    }
`;
