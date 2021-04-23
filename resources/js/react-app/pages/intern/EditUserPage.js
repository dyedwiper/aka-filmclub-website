import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import UserFormGroup from '../../common/forms/UserFormGroup';
import { PAGE_TITLE_EDIT_USER, ROUTE_INTERN_USERS } from '../../constants';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { deleteUser, getUserByUuid, postUser } from '../../utils/services/userServices';
import LoadingPage from '../LoadingPage';

export default function EditUserPage() {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getUserByUuid(uuid).then((res) => {
            setUser(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_EDIT_USER}>
            <HeadlineStyled>{PAGE_TITLE_EDIT_USER}</HeadlineStyled>
            <BaseForm
                postFunction={postUser}
                deleteFunction={deleteUser}
                isEditing={true}
                postRedirectRoute={ROUTE_INTERN_USERS}
                deleteRedirectRoute={ROUTE_INTERN_USERS}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={user.uuid} />
                <UserFormGroup user={user} />
            </BaseForm>
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
