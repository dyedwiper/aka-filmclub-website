import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import { AddItemLinkStyled, PageHeadlineStyled } from '../../common/styledElements';
import {
    PAGE_TITLE_USERS,
    ROUTE_INTERN_ADD_USER,
    ROUTE_INTERN_EDIT_PASSWORD,
    ROUTE_INTERN_EDIT_USER,
    USER_STATUS_ACTIVE,
    USER_STATUS_ACTIVE_NAME,
    USER_STATUS_ALUMNI,
    USER_STATUS_ALUMNI_NAME,
    USER_STATUS_PAUSED,
    USER_STATUS_PAUSED_NAME,
} from '../../constants';
import Context from '../../Context';
import { getUsers } from '../../services/userServices';

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    const { user: loggedInUser, isUserAdmin } = useContext(Context);

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_USERS}>
            <PageHeadlineStyled>{PAGE_TITLE_USERS}</PageHeadlineStyled>
            <EditOwnDataLinkStyled to={ROUTE_INTERN_EDIT_USER + loggedInUser.uuid}>
                Eigene Daten bearbeiten
            </EditOwnDataLinkStyled>
            <EditOwnDataLinkStyled to={ROUTE_INTERN_EDIT_PASSWORD + loggedInUser.uuid}>
                Eigenes Passwort ändern
            </EditOwnDataLinkStyled>
            {isUserAdmin && <AddItemLinkStyled to={ROUTE_INTERN_ADD_USER}>Mitglied hinzufügen</AddItemLinkStyled>}
            <GridContainerStyled>
                <ListContainerStyled>
                    <SubheadlineStyled>{USER_STATUS_ACTIVE_NAME}</SubheadlineStyled>
                    <ListStyled>
                        {users
                            .filter((user) => user.status == USER_STATUS_ACTIVE)
                            .sort((a, b) => a.realname.localeCompare(b.realname))
                            .map((user) => (
                                <ListItemStyled key={user.id}>
                                    <LinkStyled to={ROUTE_INTERN_EDIT_USER + user.uuid}>{user.realname}</LinkStyled>
                                </ListItemStyled>
                            ))}
                    </ListStyled>
                </ListContainerStyled>
                <ListContainerStyled>
                    <SubheadlineStyled>{USER_STATUS_PAUSED_NAME}</SubheadlineStyled>
                    <ListStyled>
                        {users
                            .filter((user) => user.status == USER_STATUS_PAUSED)
                            .sort((a, b) => a.realname.localeCompare(b.realname))
                            .map((user) => (
                                <ListItemStyled key={user.id}>
                                    <LinkStyled to={ROUTE_INTERN_EDIT_USER + user.uuid}>{user.realname}</LinkStyled>
                                </ListItemStyled>
                            ))}
                    </ListStyled>
                </ListContainerStyled>
                <ListContainerStyled>
                    <SubheadlineStyled>{USER_STATUS_ALUMNI_NAME}</SubheadlineStyled>
                    <ListStyled>
                        {users
                            .filter((user) => user.status == USER_STATUS_ALUMNI)
                            .sort((a, b) => a.realname.localeCompare(b.realname))
                            .map((user) => (
                                <ListItemStyled key={user.id}>
                                    <LinkStyled to={ROUTE_INTERN_EDIT_USER + user.uuid}>{user.realname}</LinkStyled>
                                </ListItemStyled>
                            ))}
                    </ListStyled>
                </ListContainerStyled>
            </GridContainerStyled>
        </BasePage>
    );
}

const EditOwnDataLinkStyled = styled(Link)`
    display: block;
    margin-bottom: 20px;
`;

const GridContainerStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 40px;
    margin-top: 40px;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        grid-auto-flow: row;
    }
`;

const ListContainerStyled = styled.div``;

const SubheadlineStyled = styled.h3``;

const ListStyled = styled.ul`
    overflow: auto;
    height: 300px;
    padding: 5px;
    border: solid 1px black;
`;

const ListItemStyled = styled.li``;

const LinkStyled = styled(Link)`
    display: inline-block;
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: black;
`;
