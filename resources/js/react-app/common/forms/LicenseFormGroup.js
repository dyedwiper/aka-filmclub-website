import React from 'react';
import styled from 'styled-components';

export default function LicenseFormGroup({ license }) {
    return (
        <LicenseFormGroupStyled>
            <LabelStyled>
                Name (ohne &copy; eintragen)
                <InputStyled name="name" defaultValue={license && license.name} />
            </LabelStyled>
            <LabelStyled>
                Link
                <InputStyled name="link" defaultValue={license && license.link} />
            </LabelStyled>
        </LicenseFormGroupStyled>
    );
}

const LicenseFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 20px 0;
`;

const InputStyled = styled.input``;
