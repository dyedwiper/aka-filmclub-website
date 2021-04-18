import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import UserFormGroup from '../../common/forms/UserFormGroup';
import { PageStyled } from '../../common/styledElements';
import { ROUTE_INTERN_USERS } from '../../constants';
import { postUser } from '../../utils/services/userServices';

export default function AddUserPage() {
    return (
        <PageStyled>
            <BaseForm postFunction={postUser} postRedirectRoute={ROUTE_INTERN_USERS}>
                <HeadlineStyled>Mitglied anlegen</HeadlineStyled>
                <UserFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
