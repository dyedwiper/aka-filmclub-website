import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import { HorizontalLineStyled, PageStyled } from '../../common/styledElements';
import { postSerial } from '../../utils/serialServices';

export default function AddSerialPage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue Filmreihe anlegen</HeadlineStyled>
            <BaseForm serviceFunction={postSerial}>
                <LabelStyled>
                    Titel
                    <InputStyled name="title" />
                </LabelStyled>
                <LabelStyled>
                    Untertitel
                    <InputStyled name="subtitle" />
                </LabelStyled>
                <LabelStyled>
                    Reihenartikel
                    <TextareaStyled name="article" />
                </LabelStyled>
                <LabelStyled>
                    Autor
                    <InputStyled name="author" />
                </LabelStyled>
                <HorizontalLineStyled />
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

const ButtonStyled = styled.button``;
