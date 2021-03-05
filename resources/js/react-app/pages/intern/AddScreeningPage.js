import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import ScreeningFormGroup from '../../common/forms/ScreeningFormGroup';
import { HorizontalLineStyled, PageStyled } from '../../common/styledElements';
import { postScreening } from '../../utils/screeningServices';

export default function AddScreeningPage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue Vorführung anlegen</HeadlineStyled>
            <BaseForm postFunction={postScreening}>
                <ScreeningFormGroup />
                <HorizontalLineStyled />
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
