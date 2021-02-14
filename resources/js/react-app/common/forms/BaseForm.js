import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled } from '../styledElements';

export default function BaseForm({ children, serviceFunction }) {
    const [isWaiting, setIsWaiting] = useState(false);
    let history = useHistory();

    return (
        <BaseFormStyled onKeyPress={preventSubmitOnEnter}>
            {children}
            <HorizontalLineStyled />
            {isWaiting ? (
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
        setIsWaiting(true);
        const formElement = event.target.form;
        const formData = new FormData(formElement);
        serviceFunction(formData)
            .then((res) => {
                console.log(res.data);
                setIsWaiting(false);
                history.push('/intern');
            })
            .catch((err) => {
                setIsWaiting(false);
                console.log(err.response.data);
            });
    }

    function handleAbort() {
        history.push('/intern');
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
