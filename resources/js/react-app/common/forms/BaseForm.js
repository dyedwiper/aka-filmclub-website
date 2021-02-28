import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_ADMIN } from '../../constants';
import UserContext from '../../UserContext';
import { HorizontalLineStyled } from '../styledElements';

export default function BaseForm({ children, serviceFunction, isEditing }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);

    const { user: loggedInUser } = useContext(UserContext);

    const userForm = children.find((child) => child.type.name && child.type.name === 'UserFormGroup');
    const isSelf = userForm && userForm.props.user.id === loggedInUser.id;
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
                <>
                    <ButtonStyled type="submit" disabled={userForm && !isSelf && !isAdmin} onClick={handleSubmit}>
                        Speichern
                    </ButtonStyled>
                    <ButtonStyled type="button" onClick={handleAbort}>
                        Zurück
                    </ButtonStyled>
                    {isEditing && (
                        <>
                            <ButtonStyled
                                type="button"
                                disabled={userForm && !isAdmin}
                                onClick={() => setShowDeletePrompt(true)}
                            >
                                Löschen
                            </ButtonStyled>
                            {showDeletePrompt && (
                                <DeletePromptStyled>
                                    Sischer?
                                    <ButtonStyled type="button" onClick={handleDelete}>
                                        Ja
                                    </ButtonStyled>
                                    <ButtonStyled type="button" onClick={() => setShowDeletePrompt(false)}>
                                        Nein
                                    </ButtonStyled>
                                </DeletePromptStyled>
                            )}
                        </>
                    )}
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

    function handleDelete() {}

    function handleAbort() {
        history.goBack();
    }
}

const BaseFormStyled = styled.form``;

const ButtonStyled = styled.button``;

export const WaitNoteStyled = styled.div`
    margin-top: 20px;
`;

const DeletePromptStyled = styled.span``;

const ValidationErrorContainerStyled = styled.div`
    color: red;
`;

const ValidationErrorStyled = styled.div`
    margin-bottom: 10px;
`;
