import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import magicGif from '../assets/ahahah.gif';
import { PageStyled } from '../common/styledElements';
import { getCsrfCookie, postLogin } from '../utils/userServices';

export default function LoginPage() {
    const [didLoginFail, setDidLoginFail] = useState(false);

    let history = useHistory();

    return (
        <PageStyled>
            <FormStyled onSubmit={handleSubmit}>
                <LabelStyled>
                    Name
                    <InputStyled name="username" />
                </LabelStyled>
                <LabelStyled>
                    Passwort
                    <InputStyled name="password" type="password" />
                </LabelStyled>
                <ButtonStyled>Login</ButtonStyled>
            </FormStyled>
            {didLoginFail && <ImageStyled src={magicGif} alt="ah ah ah you didn't say the magic word"></ImageStyled>}
        </PageStyled>
    );

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        getCsrfCookie().then(() => {
            postLogin(formData)
                .then((res) => {
                    history.push('/intern');
                    console.log(res.data);
                })
                .catch((err) => {
                    if (err.response.status === 403) {
                        setDidLoginFail(true);
                    }
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

const ImageStyled = styled.img`
    display: block;
    width: 90%;
    max-width: 400px;
    margin: 20px auto;
`;
