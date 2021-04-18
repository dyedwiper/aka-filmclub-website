import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import SerialFormGroup from '../../common/forms/SerialFormGroup';
import { HorizontalRuleStyled, PageStyled } from '../../common/styledElements';
import { ROUTE_SERIALS } from '../../constants';
import { postSerial } from '../../utils/services/serialServices';

export default function AddSerialPage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue Filmreihe anlegen</HeadlineStyled>
            <BaseForm postFunction={postSerial} postRedirectRoute={ROUTE_SERIALS}>
                <SerialFormGroup />
                <HorizontalRuleStyled />
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
