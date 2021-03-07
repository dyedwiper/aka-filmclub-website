import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import SerialFormGroup from '../../common/forms/SerialFormGroup';
import { HorizontalLineStyled, PageStyled } from '../../common/styledElements';
import { postSerial } from '../../utils/serialServices';

export default function AddSerialPage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue Filmreihe anlegen</HeadlineStyled>
            <BaseForm postFunction={postSerial}>
                <SerialFormGroup />
                <HorizontalLineStyled />
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
