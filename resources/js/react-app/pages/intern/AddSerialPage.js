import React from 'react';
import styled from 'styled-components';
import { PageStyled } from '../../common/styledElements';

export default function AddSerialPage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue Vorführung anlegen</HeadlineStyled>
            <SerialFormStyled onSubmit={handleSubmit}>
                <LabelStyled>
                    Titel
                    <InputStyled name="title" />
                </LabelStyled>
                <LabelStyled>
                    Reihenartikel
                    <TextareaStyled name="article" />
                </LabelStyled>
                <LabelStyled>
                    Autor
                    <InputStyled name="author" />
                </LabelStyled>
                <ButtonStyled type="submit">Speichern</ButtonStyled>
            </SerialFormStyled>
        </PageStyled>
    );

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
    }
}

const HeadlineStyled = styled.h2``;

const SerialFormStyled = styled.form``;

const LabelStyled = styled.label`
    margin: 20px 0;
    display: block;
`;

const InputStyled = styled.input``;

const TextareaStyled = styled.textarea`
    display: block;
    width: 100%;
`;

const ButtonStyled = styled.button``;
