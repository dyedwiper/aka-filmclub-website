import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import PasswordFormGroup from '../../common/forms/PasswordFormGroup';
import { PAGE_TITLE_EDIT_PASSWORD, ROUTE_INTERN_USERS } from '../../constants';
import { getUserByUuid, postPassword } from '../../utils/services/userServices';
import LoadingPage from '../LoadingPage';

export default function EditPasswordPage() {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { uuid } = useParams();

    useEffect(() => {
        getUserByUuid(uuid).then((res) => {
            setUser(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_EDIT_PASSWORD}>
            <HeadlineStyled>{PAGE_TITLE_EDIT_PASSWORD}</HeadlineStyled>
            <BaseForm
                postFunction={postPassword}
                postRedirectRoute={ROUTE_INTERN_USERS}
                deleteRedirectRoute={ROUTE_INTERN_USERS}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={user.uuid} />
                <PasswordFormGroup user={user} />
            </BaseForm>
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
