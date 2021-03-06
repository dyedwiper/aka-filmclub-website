import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_ADMIN } from '../../constants';
import Context from '../../Context';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { HorizontalLineStyled } from '../styledElements';

export default function BaseForm({ children, postFunction, deleteFunction, isEditing }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const { user: loggedInUser } = useContext(Context);

    const userForm =
        children.length && children.find((child) => child.type.name && child.type.name === 'UserFormGroup');
    const isSelf = isEditing && userForm && userForm.props.user.id === loggedInUser.id;
    const isAdmin = loggedInUser.level === AUTH_LEVEL_ADMIN;

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

    function handleDelete() {
        const uuid = getLastParameterFromPath();
        deleteFunction(uuid)
            .then((res) => {
                console.log(res);
                history.push('/intern');
            })
            .catch((err) => {
                console.log(err);
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

    @media (max-width: 901px) {
        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 1fr 1fr;
    }
`;

const SubmitButtonStyled = styled.button``;

const BackButtonStyled = styled.button`
    background-color: var(--aka-grau);
`;

export const WaitNoteStyled = styled.div`
    margin-top: 20px;
`;

const DeleteButtonStyled = styled.button`
    background-color: red;
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
    color: red;
`;

const ValidationErrorStyled = styled.div`
    margin-bottom: 10px;
`;
