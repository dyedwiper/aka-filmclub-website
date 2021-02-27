import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserLevelSelect from '../../common/forms/UserLevelSelect';
import UserStatusSelect from '../../common/forms/UserStatusSelect';
import { PageStyled } from '../../common/styledElements';
import { formatToDateTimeString } from '../../utils/dateFormatters';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getUserByUuid } from '../../utils/userServices';
import LoadingPage from '../LoadingPage';

export default function UserPage() {
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
                <LabelTextStyled>Telefon</LabelTextStyled>
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
        </PageStyled>
    );
}

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
