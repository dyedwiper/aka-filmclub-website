import React from 'react';
import styled from 'styled-components';
import { formatToDateTimeString } from '../../utils/dateFormatters';
import UserLevelSelect from './UserLevelSelect';
import UserStatusSelect from './UserStatusSelect';

export default function UserFormGroup({ user }) {
    return (
        <UserFormGroupStyled>
            <LabelStyled>
                <LabelTextStyled>Name</LabelTextStyled>
                <InputStyled name="realname" defaultValue={user.realname} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Login</LabelTextStyled>
                <InputStyled name="username" defaultValue={user.username} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>E-Mail-Adresse</LabelTextStyled>
                <InputStyled name="email" defaultValue={user.email} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Telefonnummer</LabelTextStyled>
                <InputStyled name="phone" defaultValue={user.phone} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Adresse</LabelTextStyled>
                <InputStyled name="address" defaultValue={user.address} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Postleitzahl</LabelTextStyled>
                <InputStyled name="zipcode" defaultValue={user.zipcode} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Stadt</LabelTextStyled>
                <InputStyled name="city" defaultValue={user.city} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Registriert</LabelTextStyled>
                <InputStyled disabled defaultValue={formatToDateTimeString(user.created_at)} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Berechtigungen</LabelTextStyled>
                <UserLevelSelect defaultLevel={user.level} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Status</LabelTextStyled>
                <UserStatusSelect defaultStatus={user.status} />
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
    width: 130px;
`;

const InputStyled = styled.input`
    width: 70%;
`;
