import React from 'react';
import styled from 'styled-components';
import WysiwygEditor from './WysiwygEditor';

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
                <WysiwygEditor inputName="content" defaultValue={notice && notice.content} />
            </LabelStyled>
            <LabelStyled>
                Autor*in
                <InputStyled name="author" defaultValue={notice && notice.author} />
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
