import React from 'react';
import styled from 'styled-components';
import SemesterSelectForSerialForm from './SemesterSelectForSerialForm';
import WysiwygEditor from './WysiwygEditor';

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
            <LabelStyled>
                Reihenartikel
                <WysiwygEditor inputName="article" defaultValue={serial && serial.article} />
            </LabelStyled>
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

const InputStyled = styled.input``;
