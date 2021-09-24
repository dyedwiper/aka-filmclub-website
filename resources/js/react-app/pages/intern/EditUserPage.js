import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import UserFormGroup from '../../common/forms/UserFormGroup';
import UpdateInfo from '../../common/misc/UpdateInfo';
import {
    PAGE_TITLE_EDIT_PASSWORD,
    PAGE_TITLE_EDIT_USER,
    ROUTE_INTERN_EDIT_PASSWORD,
    ROUTE_INTERN_USERS,
} from '../../constants';
import Context from '../../Context';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { deleteUser, getUserByUuid, postUser } from '../../utils/services/userServices';
import LoadingPage from '../LoadingPage';

export default function EditUserPage() {
    const [user, setUser] = useState({});
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { user: loggedInUser, isUserAdmin } = useContext(Context);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getUserByUuid(uuid).then((res) => {
            setUser(res.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const isSelf = user && user.id === loggedInUser.id;
        setIsAuthorized(isUserAdmin || isSelf);
    }, [user, loggedInUser]);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_EDIT_USER}>
            <HeadlineStyled>{PAGE_TITLE_EDIT_USER}</HeadlineStyled>
            <LinkStyled to={ROUTE_INTERN_EDIT_PASSWORD + loggedInUser.uuid}>{PAGE_TITLE_EDIT_PASSWORD}</LinkStyled>
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
                <UserFormGroup user={user} isUserAdmin={isUserAdmin} isAuthorized={isAuthorized} />
            </BaseForm>
            <UpdateInfo entity={user} />
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;

const LinkStyled = styled(Link)`
    display: block;
    margin-bottom: 30px;
`;
