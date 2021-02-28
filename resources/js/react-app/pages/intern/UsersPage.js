import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageStyled } from '../../common/styledElements';
import UserContext from '../../UserContext';
import { getUsers } from '../../utils/userServices';

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    const { user: loggedInUser } = useContext(UserContext);

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>Mitglieder verwalten</HeadlineStyled>
            {/* Only display link when current user is admin */}
            {loggedInUser.level === 2 && <LinkStyled to="/intern/addUser">Neues Mitglied anlegen</LinkStyled>}
            <GridContainerStyled>
                <ListContainerStyled>
                    <SubheadlineStyled>Aktiv</SubheadlineStyled>
                    <ListStyled>
                        {users
                            .filter((user) => user.status == 0)
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
                            .filter((user) => user.status == 1)
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
                            .filter((user) => user.status == 2)
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
`;

const ListContainerStyled = styled.div``;

const SubheadlineStyled = styled.h3``;

const ListStyled = styled.ul`
    overflow: auto;
    height: 300px;
    padding: 5px;
    border: solid 3px black;
    border-radius: 5px;
`;

const ListItemStyled = styled.li``;

const LinkStyled = styled(Link)`
    display: inline-block;
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
