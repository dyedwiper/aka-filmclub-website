import React from 'react';
import styled from 'styled-components';
import SemesterSelectForSerialForm from './SemesterSelectForSerialForm';
import WysiwygFormInput from './WysiwygFormInput';

export default function SerialFormGroup({ serial }) {
    return (
        <SerialFormGroupStyled>
            <LabelStyled>
                Titel
                <InputStyled name="title" defaultValue={serial && serial.title} />
            </LabelStyled>
            <LabelStyled>
                Untertitel
                <InputStyled name="subtitle" defaultValue={serial && serial.subtitle} />
            </LabelStyled>
            <FakeLabelStyled>
                Reihenartikel
                <WysiwygFormInput inputName="article" defaultValue={serial && serial.article} />
            </FakeLabelStyled>
            <LabelStyled>
                Autor*in
                <InputStyled name="author" defaultValue={serial && serial.author} />
            </LabelStyled>
            <LabelStyled>
                Semester
                <SemesterSelectForSerialForm defaultSemester={serial && serial.semester} />
            </LabelStyled>
        </SerialFormGroupStyled>
    );
}

const SerialFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    margin: 20px 0;
    display: block;
`;

// This is used because a real label element surrounding the Wysiwyg editor leads to unexpected behavior.
// And at the moment it is also not possible to explicitly associate a label to the editor, see: https://github.com/jpuri/react-draft-wysiwyg/issues/539
const FakeLabelStyled = styled.div`
    display: block;
    margin: 20px 0;
`;

const InputStyled = styled.input``;
