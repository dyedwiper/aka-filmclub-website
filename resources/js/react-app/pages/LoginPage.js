import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import magicGif from '../assets/ahahah.gif';
import BasePage from '../common/BasePage';
import { PAGE_TITLE_LOGIN } from '../constants';
import Context from '../Context';
import { getCsrfCookie, postLogin } from '../utils/services/userServices';

export default function LoginPage() {
    const [didLoginFail, setDidLoginFail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { setUser } = useContext(Context);

    let history = useHistory();

    useEffect(() => {
        document.querySelector('input').focus();
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_LOGIN}>
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
            <ErrorMessageStyled>{errorMessage}</ErrorMessageStyled>
            {didLoginFail && <ImageStyled src={magicGif} alt="ah ah ah you didn't say the magic word"></ImageStyled>}
        </BasePage>
    );

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        getCsrfCookie().then(() => {
            postLogin(formData)
                .then((res) => {
                    setUser(res.data);
                    history.push('/intern');
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        setDidLoginFail(true);
                        setErrorMessage(err.response.data.message);
                    }
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

const ErrorMessageStyled = styled.div`
    color: var(--aka-red);
    text-align: center;
`;

const ImageStyled = styled.img`
    display: block;
    width: 90%;
    max-width: 400px;
    margin: 20px auto;
`;
