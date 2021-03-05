import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import SerialFormGroup from '../../common/forms/SerialFormGroup';
import { PageStyled } from '../../common/styledElements';
import { postSerial } from '../../utils/serialServices';

export default function AddSerialPage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue Filmreihe anlegen</HeadlineStyled>
            <BaseForm postFunction={postSerial}>
                <SerialFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
