import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageStyled } from '../../common/styledElements';
import { getUsers } from '../../utils/userServices';

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <PageStyled>
            <ListsContainer>
                <ListStyled>
                    {users
                        .filter((user) => user.status == 0)
                        .sort((userA, userB) => (userA.realname < userB.realname ? -1 : 1))
                        .map((user) => (
                            <ListItemStyled key={user.id}>
                                <LinkStyled to={'/intern/user/' + user.uuid}>{user.realname}</LinkStyled>
                            </ListItemStyled>
                        ))}
                </ListStyled>
                <ListStyled>
                    {users
                        .filter((user) => user.status == 1)
                        .sort((userA, userB) => (userA.realname < userB.realname ? -1 : 1))
                        .map((user) => (
                            <ListItemStyled key={user.id}>
                                <LinkStyled to={'/intern/user/' + user.uuid}>{user.realname}</LinkStyled>
                            </ListItemStyled>
                        ))}
                </ListStyled>
                <ListStyled>
                    {users
                        .filter((user) => user.status == 2)
                        .sort((userA, userB) => (userA.realname < userB.realname ? -1 : 1))
                        .map((user) => (
                            <ListItemStyled key={user.id}>
                                <LinkStyled to={'/intern/user/' + user.uuid}>{user.realname}</LinkStyled>
                            </ListItemStyled>
                        ))}
                </ListStyled>
            </ListsContainer>
        </PageStyled>
    );
}

const ListsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

const ListStyled = styled.ul`
    height: 300px;
    overflow: auto;
    margin: 0 20px;
`;

const ListItemStyled = styled.li``;

const LinkStyled = styled(Link)``;
