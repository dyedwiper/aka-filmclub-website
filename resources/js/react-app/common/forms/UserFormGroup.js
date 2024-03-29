import React from 'react';
import styled from 'styled-components';
import { AUTH_LEVEL_NORMAL, USER_STATUS_ACTIVE } from '../../constants';
import { formatToDateTimeString } from '../../utils/dateFormatters';
import UserLevelSelect from './UserLevelSelect';
import UserStatusSelect from './UserStatusSelect';

export default function UserFormGroup({ user, isUserAdmin, isAuthorized }) {
    return (
        <UserFormGroupStyled>
            <LabelStyled>
                <LabelTextStyled>Name</LabelTextStyled>
                <InputStyled name="realname" disabled={!isAuthorized} defaultValue={user && user.realname} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Login</LabelTextStyled>
                <InputStyled name="username" disabled={!isUserAdmin} defaultValue={user && user.username} />
                {/* Since a disabled input's value is not submitted, this hidden input is added, so that validation still works as intended. */}
                {!isUserAdmin && <input name="username" type="hidden" defaultValue={user && user.username} />}
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
                <LabelTextStyled>Aktualisiert</LabelTextStyled>
                <InputStyled disabled defaultValue={user && formatToDateTimeString(user.updated_at)} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Berechtigungslevel</LabelTextStyled>
                <UserLevelSelect disabled={!isUserAdmin} defaultLevel={user ? user.level : AUTH_LEVEL_NORMAL} />
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

    @media (max-width: 767px) {
        width: 100%;
    }
`;
