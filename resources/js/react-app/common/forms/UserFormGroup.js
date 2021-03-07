import React, { useContext } from 'react';
import styled from 'styled-components';
import { AUTH_LEVEL_ADMIN, AUTH_LEVEL_NORMAL, USER_STATUS_ACTIVE } from '../../constants';
import Context from '../../Context';
import { formatToDateTimeString } from '../../utils/dateFormatters';
import UserLevelSelect from './UserLevelSelect';
import UserStatusSelect from './UserStatusSelect';

export default function UserFormGroup({ user }) {
    const { user: loggedInUser } = useContext(Context);
    const isAdmin = loggedInUser.level === AUTH_LEVEL_ADMIN;
    const isSelf = user && user.id === loggedInUser.id;
    const isAuthorized = isAdmin || isSelf;

    return (
        <UserFormGroupStyled>
            <LabelStyled>
                <LabelTextStyled>Name</LabelTextStyled>
                <InputStyled name="realname" disabled={!isAuthorized} defaultValue={user && user.realname} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Login</LabelTextStyled>
                <InputStyled name="username" disabled={!isAuthorized} defaultValue={user && user.username} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>E-Mail-Adresse</LabelTextStyled>
                <InputStyled name="email" disabled={!isAuthorized} defaultValue={user && user.email} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Telefonnummer</LabelTextStyled>
                <InputStyled name="phone" disabled={!isAuthorized} defaultValue={user && user.phone} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Adresse</LabelTextStyled>
                <InputStyled name="address" disabled={!isAuthorized} defaultValue={user && user.address} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Postleitzahl</LabelTextStyled>
                <InputStyled name="zipcode" disabled={!isAuthorized} defaultValue={user && user.zipcode} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Stadt</LabelTextStyled>
                <InputStyled name="city" disabled={!isAuthorized} defaultValue={user && user.city} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Registriert</LabelTextStyled>
                <InputStyled disabled defaultValue={user && formatToDateTimeString(user.created_at)} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Berechtigungslevel</LabelTextStyled>
                <UserLevelSelect disabled={!isAdmin} defaultLevel={user ? user.level : AUTH_LEVEL_NORMAL} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Status</LabelTextStyled>
                <UserStatusSelect disabled={!isAuthorized} defaultStatus={user ? user.status : USER_STATUS_ACTIVE} />
            </LabelStyled>
        </UserFormGroupStyled>
    );
}

const UserFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 10px 0;
`;

const LabelTextStyled = styled.div`
    display: inline-block;
    width: 150px;
`;

const InputStyled = styled.input`
    width: 70%;

    @media (max-width: 899px) {
        width: 100%;
    }
`;
