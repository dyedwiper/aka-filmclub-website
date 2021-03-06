import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageStyled } from '../../common/styledElements';
import { AUTH_LEVEL_ADMIN, USER_STATUS_ACTIVE, USER_STATUS_ALUMNI, USER_STATUS_PAUSED } from '../../constants';
import Context from '../../Context';
import { getUsers } from '../../utils/userServices';

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    const { user: loggedInUser, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Mitglieder | aka-Filmclub';
        setPageTitle('Mitglieder');
    }, []);

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>Mitglieder verwalten</HeadlineStyled>
            {/* Only display link when current user is admin */}
            {loggedInUser.level === AUTH_LEVEL_ADMIN && (
                <NewUserLinkStyled to="/intern/addUser">Neues Mitglied anlegen</NewUserLinkStyled>
            )}
            <GridContainerStyled>
                <ListContainerStyled>
                    <SubheadlineStyled>Aktiv</SubheadlineStyled>
                    <ListStyled>
                        {users
                            .filter((user) => user.status == USER_STATUS_ACTIVE)
                            .sort((a, b) => a.realname.localeCompare(b.realname))
                            .map((user) => (
                                <ListItemStyled key={user.id}>
                                    <LinkStyled to={'/intern/editUser/' + user.uuid}>{user.realname}</LinkStyled>
                                </ListItemStyled>
                            ))}
                    </ListStyled>
                </ListContainerStyled>
                <ListContainerStyled>
                    <SubheadlineStyled>Pausierend/Unklar</SubheadlineStyled>
                    <ListStyled>
                        {users
                            .filter((user) => user.status == USER_STATUS_PAUSED)
                            .sort((a, b) => a.realname.localeCompare(b.realname))
                            .map((user) => (
                                <ListItemStyled key={user.id}>
                                    <LinkStyled to={'/intern/editUser/' + user.uuid}>{user.realname}</LinkStyled>
                                </ListItemStyled>
                            ))}
                    </ListStyled>
                </ListContainerStyled>
                <ListContainerStyled>
                    <SubheadlineStyled>Alumni</SubheadlineStyled>
                    <ListStyled>
                        {users
                            .filter((user) => user.status == USER_STATUS_ALUMNI)
                            .sort((a, b) => a.realname.localeCompare(b.realname))
                            .map((user) => (
                                <ListItemStyled key={user.id}>
                                    <LinkStyled to={'/intern/editUser/' + user.uuid}>{user.realname}</LinkStyled>
                                </ListItemStyled>
                            ))}
                    </ListStyled>
                </ListContainerStyled>
            </GridContainerStyled>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

const GridContainerStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 40px;
    margin-top: 40px;

    @media (max-width: 901px) {
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
    border-radius: 5px;
`;

const ListItemStyled = styled.li``;

const NewUserLinkStyled = styled(Link)`
    padding: 5px;
    border: solid 1px black;
    border-radius: 5px;
    box-shadow: 1px 1px 1px black;

    &:active {
        background-color: var(--aka-gelb);
    }
    &:hover {
        text-decoration: none;
    }
`;

const LinkStyled = styled(Link)`
    display: inline-block;
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
