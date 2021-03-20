import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import UserFormGroup from '../../common/forms/UserFormGroup';
import { PageStyled } from '../../common/styledElements';
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
        <PageStyled>
            <HeadlineStyled>Mitglied bearbeiten</HeadlineStyled>
            <BaseForm postFunction={postUser} deleteFunction={deleteUser} isEditing={true}>
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={user.uuid} />
                <UserFormGroup user={user} />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
