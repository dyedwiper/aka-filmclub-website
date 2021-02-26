import React, { useEffect, useState } from 'react';
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
            {users.map((user) => (
                <div key={user.id}>{user.username}</div>
            ))}
        </PageStyled>
    );
}
