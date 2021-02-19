import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled } from '../styledElements';

export default function BaseForm({ children, serviceFunction }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    let history = useHistory();

    return (
        <BaseFormStyled onKeyPress={preventSubmitOnEnter}>
            {children}
            <HorizontalLineStyled />
            <ValidationErrorContainerStyled>
                {validationErrors.map((error, index) => (
                    <ValidationErrorStyled key={index}>{error}</ValidationErrorStyled>
                ))}
            </ValidationErrorContainerStyled>
            {isSubmitting ? (
                <WaitNoteStyled>Bitte warten</WaitNoteStyled>
            ) : (
                <>
                    <ButtonStyled type="submit" onClick={handleSubmit}>
                        Speichern
                    </ButtonStyled>
                    <ButtonStyled type="button" onClick={handleAbort}>
                        Abbrechen
                    </ButtonStyled>
                </>
            )}
        </BaseFormStyled>
    );

    function preventSubmitOnEnter(event) {
        if (event.target.nodeName === 'INPUT') {
            event.key === 'Enter' && event.preventDefault();
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        const formElement = event.target.form;
        const formData = new FormData(formElement);
        serviceFunction(formData)
            .then((res) => {
                console.log(res.data);
                setIsSubmitting(false);
                history.push('/intern');
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setValidationErrors(err.response.data.validationErrors);
                }
                if (err.response.status === 500) {
                    history.push('/error');
                }
                setIsSubmitting(false);
                console.log(err.response.data);
            });
    }

    function handleAbort() {
        history.goBack();
    }
}

const BaseFormStyled = styled.form``;

const ButtonStyled = styled.button``;

export const WaitNoteStyled = styled.div`
    margin-top: 20px;
    /* 
    animation: spin 1s infinite;
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    } */
`;

const ValidationErrorContainerStyled = styled.div`
    color: red;
`;

const ValidationErrorStyled = styled.div`
    margin-bottom: 10px;
`;
