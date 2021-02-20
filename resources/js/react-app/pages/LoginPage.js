import React from 'react';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';
import { getCsrfCookie, postLogin } from '../utils/userServices';

export default function LoginPage() {
    return (
        <PageStyled>
            <FormStyled onSubmit={handleSubmit}>
                <LabelStyled>
                    Name
                    <InputStyled name="username" />
                </LabelStyled>
                <LabelStyled>
                    Passwort
                    <InputStyled name="password" />
                </LabelStyled>
                <ButtonStyled>Login</ButtonStyled>
            </FormStyled>
        </PageStyled>
    );

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        getCsrfCookie().then(() => {
            postLogin(formData)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
}

const FormStyled = styled.form``;

const LabelStyled = styled.label`
    display: block;
    width: 250px;
    margin: 10px auto;
`;

const InputStyled = styled.input``;

const ButtonStyled = styled.button`
    display: block;
    margin: 10px auto;
`;
