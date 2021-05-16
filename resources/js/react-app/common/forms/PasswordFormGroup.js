import React from 'react';
import styled from 'styled-components';

export default function PasswordFormGroup() {
    return (
        <PasswordFormGroupStyled>
            <LabelStyled>
                Altes Passwort
                <InputStyled name="old_password" type="password" />
            </LabelStyled>
            <LabelStyled>
                Neues Passwort
                <InputStyled name="new_password" type="password" />
            </LabelStyled>
            <LabelStyled>
                Neues Passwort bestätigen
                <InputStyled name="new_password_confirmation" type="password" />
            </LabelStyled>
        </PasswordFormGroupStyled>
    );
}

const PasswordFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 20px 0;
`;

const InputStyled = styled.input``;
