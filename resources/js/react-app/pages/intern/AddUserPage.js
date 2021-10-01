import React, { useContext } from 'react';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import UserFormGroup from '../../common/forms/UserFormGroup';
import { PAGE_TITLE_ADD_USER, ROUTE_INTERN_USERS } from '../../constants';
import Context from '../../Context';
import { postUser } from '../../utils/services/userServices';

export default function AddUserPage() {
    const { isUserAdmin } = useContext(Context);

    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_USER}>
            <HeadlineStyled>{PAGE_TITLE_ADD_USER}</HeadlineStyled>
            <BaseForm postFunction={postUser} postRedirectRoute={ROUTE_INTERN_USERS}>
                <UserFormGroup isUserAdmin={isUserAdmin} isAuthorized={isUserAdmin} />
            </BaseForm>
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
