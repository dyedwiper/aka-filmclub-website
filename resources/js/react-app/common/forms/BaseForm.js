import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_ADMIN } from '../../constants';
import Context from '../../Context';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { HorizontalRuleStyled } from '../styledElements';

export default function BaseForm({
    children,
    postFunction,
    deleteFunction,
    isEditing,
    postRedirectRoute,
    deleteRedirectRoute,
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const { user: loggedInUser } = useContext(Context);

    // Extra checks for user form.
    const userForm =
        children.length && children.find((child) => child.type.name && child.type.name === 'UserFormGroup');
    const isSelf = isEditing && userForm && userForm.props.user.id === loggedInUser.id;
    const isAdmin = loggedInUser.level === AUTH_LEVEL_ADMIN;

    let history = useHistory();

    useEffect(() => {
        // This does not work for editing because of loading delay, but that's okay I'd say.
        document.querySelector('input').focus();
    }, []);

    return (
        <BaseFormStyled onKeyPress={preventSubmitOnEnter}>
            {children}
            <input name="updated_by" type="hidden" defaultValue={loggedInUser.username} />
            <HorizontalRuleStyled />
            <ValidationErrorContainerStyled>
                {validationErrors.map((error, index) => (
                    <ValidationErrorStyled key={index}>{error}</ValidationErrorStyled>
                ))}
            </ValidationErrorContainerStyled>
            <ErrorMessageStyled>{errorMessage}</ErrorMessageStyled>
            {isSubmitting ? (
                <WaitNoteStyled>Am Senden...</WaitNoteStyled>
            ) : (
                <ButtonContainerStyled>
                    <SubmitButtonStyled type="submit" disabled={userForm && !isSelf && !isAdmin} onClick={handleSubmit}>
                        Speichern
                    </SubmitButtonStyled>
                    <BackButtonStyled type="button" onClick={handleAbort}>
                        Zurück
                    </BackButtonStyled>
                    {isEditing && (
                        <>
                            <DeleteButtonStyled
                                type="button"
                                disabled={userForm && !isAdmin}
                                onClick={() => setShowDeletePrompt(true)}
                            >
                                Löschen
                            </DeleteButtonStyled>
                            {showDeletePrompt && (
                                <DeletePromptStyled>
                                    <QuestionStyled>Sischer?</QuestionStyled>
                                    <DeleteButtonStyled type="button" onClick={handleDelete}>
                                        Ja
                                    </DeleteButtonStyled>
                                    <BackButtonStyled type="button" onClick={() => setShowDeletePrompt(false)}>
                                        Nein
                                    </BackButtonStyled>
                                </DeletePromptStyled>
                            )}
                        </>
                    )}
                </ButtonContainerStyled>
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
        postFunction(formData)
            .then(() => {
                setIsSubmitting(false);
                history.push(postRedirectRoute);
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setValidationErrors(err.response.data.validationErrors);
                }
                setIsSubmitting(false);
            });
    }

    function handleDelete() {
        const uuid = getLastParameterFromPath();
        deleteFunction(uuid)
            .then(() => {
                history.push(deleteRedirectRoute);
            })
            .catch((err) => {
                if (err.response.status === 409) {
                    setErrorMessage(err.response.data.message);
                }
            });
    }

    function handleAbort() {
        history.goBack();
    }
}

const BaseFormStyled = styled.form``;

const ButtonContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 100px 100px 100px 200px;
    grid-gap: 10px;

    @media (max-width: 767px) {
        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 1fr 1fr;
    }

    @media (max-width: 360px) {
        grid-template-columns: 100px 100px;
        grid-template-rows: 1fr 1fr;
    }
`;

const SubmitButtonStyled = styled.button``;

const BackButtonStyled = styled.button`
    color: white;
    background-color: var(--aka-grau);
`;

export const WaitNoteStyled = styled.div`
    margin-top: 20px;
`;

const DeleteButtonStyled = styled.button`
    background-color: var(--aka-red);
    color: white;
`;

const DeletePromptStyled = styled.span`
    display: grid;
    grid-template-columns: 70px 50px 50px;
    grid-gap: 10px;
`;

const QuestionStyled = styled.span`
    justify-self: center;
    align-self: center;
`;

const ValidationErrorContainerStyled = styled.div`
    color: var(--aka-red);
`;

const ValidationErrorStyled = styled.div`
    margin-bottom: 10px;
`;

const ErrorMessageStyled = styled.div`
    margin-bottom: 10px;
    color: var(--aka-red);
`;
