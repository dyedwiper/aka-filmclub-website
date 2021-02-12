import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import { PageStyled } from '../../common/styledElements';
import { postNotice } from '../../utils/noticeServices';

export default function AddNoticePage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue News anlegen</HeadlineStyled>
            <BaseForm serviceFunction={postNotice}>
                <LabelStyled>
                    Titel
                    <InputStyled name="title" />
                </LabelStyled>
                <LabelStyled>
                    Datum
                    <InputStyled name="date" type="date" />
                </LabelStyled>
                <LabelStyled>
                    Text
                    <TextareaStyled name="content" />
                </LabelStyled>
                <LabelStyled>
                    Autor*in
                    <InputStyled name="author" />
                </LabelStyled>
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

const LabelStyled = styled.label`
    margin: 20px 0;
    display: block;
`;

const InputStyled = styled.input``;

const TextareaStyled = styled.textarea``;
