import React, { useState } from 'react';
import styled from 'styled-components';
import WysiwygEditor from './WysiwygEditor';

export default function WysiwygFormInput({ inputName, defaultValue }) {
    const [validationErrors, setValidationErrors] = useState([]);

    return (
        <WysiwygFormInputStyled>
            <WysiwygEditor
                inputName={inputName}
                defaultValue={defaultValue}
                setValidationErrors={setValidationErrors}
                isImageUploadEnabled={true}
            />
            <ValidationErrorContainerStyled>
                {validationErrors.map((error, index) => (
                    <ValidationErrorStyled key={index}>{error}</ValidationErrorStyled>
                ))}
            </ValidationErrorContainerStyled>
        </WysiwygFormInputStyled>
    );
}

const WysiwygFormInputStyled = styled.div``;

const ValidationErrorContainerStyled = styled.div`
    color: var(--aka-red);
`;

const ValidationErrorStyled = styled.div`
    margin-bottom: 10px;
`;
