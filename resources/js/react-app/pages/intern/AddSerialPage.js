import React from 'react';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import SerialFormGroup from '../../common/forms/SerialFormGroup';
import { PAGE_TITLE_ADD_SERIAL, ROUTE_SERIALS } from '../../constants';
import { postSerial } from '../../utils/services/serialServices';

export default function AddSerialPage() {
    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_SERIAL}>
            <HeadlineStyled>{PAGE_TITLE_ADD_SERIAL}</HeadlineStyled>
            <BaseForm postFunction={postSerial} postRedirectRoute={ROUTE_SERIALS}>
                <SerialFormGroup />
                <hr />
                <ImageFormGroup />
            </BaseForm>
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
