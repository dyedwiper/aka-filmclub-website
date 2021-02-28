import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_ADMIN } from '../../constants';
import UserContext from '../../UserContext';
import { HorizontalLineStyled } from '../styledElements';

export default function BaseForm({ children, serviceFunction }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(true);

    const { user: loggedInUser } = useContext(UserContext);

    let history = useHistory();

    useEffect(() => {
        // Don't perform check if logged in user is admin.
        if (loggedInUser.level === AUTH_LEVEL_ADMIN) return;
        // Check if the logged in user is the same as the edited user, when displaying the user form.
        children.forEach((child) => {
            if (child.type.name && child.type.name === 'UserFormGroup') {
                setIsAuthorized(child.props.user.id === loggedInUser.id);
            }
        });
    }, []);

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
                    <ButtonStyled type="submit" disabled={!isAuthorized} onClick={handleSubmit}>
                        Speichern
                    </ButtonStyled>
                    <ButtonStyled type="button" onClick={handleAbort}>
                        Zurück
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
