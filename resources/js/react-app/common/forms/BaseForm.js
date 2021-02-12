import React from 'react';
import styled from 'styled-components';

export default function BaseForm({ children }) {
    return <BaseFormStyled onKeyPress={preventSubmitOnEnter}>{children}</BaseFormStyled>;

    function preventSubmitOnEnter(event) {
        if (event.target.nodeName === 'INPUT') {
            event.key === 'Enter' && event.preventDefault();
        }
    }
}

const BaseFormStyled = styled.form``;
