import React from 'react';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import UserFormGroup from '../../common/forms/UserFormGroup';
import { PAGE_TITLE_ADD_USER, ROUTE_INTERN_USERS } from '../../constants';
import { postUser } from '../../utils/services/userServices';

export default function AddUserPage() {
    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_USER}>
            <HeadlineStyled>{PAGE_TITLE_ADD_USER}</HeadlineStyled>
            <BaseForm postFunction={postUser} postRedirectRoute={ROUTE_INTERN_USERS}>
                <UserFormGroup />
            </BaseForm>
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
