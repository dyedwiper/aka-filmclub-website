import React from 'react';
import styled from 'styled-components';
import WysiwygFormInput from './WysiwygFormInput';

export default function NoticeFormGroup({ notice }) {
    return (
        <NoticeFormGroupStyled>
            <LabelStyled>
                Titel
                <InputStyled name="title" defaultValue={notice && notice.title} />
            </LabelStyled>
            <LabelStyled>
                Datum
                <InputStyled name="date" type="date" defaultValue={notice && notice.date} />
            </LabelStyled>
            <LabelStyled>
                Text
                <WysiwygFormInput inputName="content" defaultValue={notice && notice.content} />
            </LabelStyled>
        </NoticeFormGroupStyled>
    );
}

const NoticeFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    margin: 20px 0;
    display: block;
`;

const InputStyled = styled.input``;
