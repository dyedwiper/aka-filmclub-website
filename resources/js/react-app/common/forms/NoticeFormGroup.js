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
            <FakeLabelStyled>
                Text
                <WysiwygFormInput inputName="content" defaultValue={notice && notice.content} />
            </FakeLabelStyled>
        </NoticeFormGroupStyled>
    );
}

const NoticeFormGroupStyled = styled.div``;

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
