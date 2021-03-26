import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AddItemLinkStyled, PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { getDistributors } from '../../utils/services/distributorServices';

export default function DistributorsPage() {
    const [distributors, setDistributors] = useState([]);

    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Filmverleihe | aka-Filmclub';
        setPageTitle('Filmverleihe');
    }, []);

    useEffect(() => {
        getDistributors().then((res) => {
            setDistributors(res.data);
        });
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <AddItemLinkStyled to="/intern/addDistributor">Filmverleih hinzufügen</AddItemLinkStyled>
            <ListStyled>
                {distributors.map((distributor) => (
                    <ListItemStyled key={distributor.id}>
                        <LinkStyled to={'/intern/editDistributor/' + distributor.uuid}>{distributor.name}</LinkStyled>
                    </ListItemStyled>
                ))}
            </ListStyled>
        </PageStyled>
    );
}

const ListStyled = styled.ul`
    margin-top: 20px;
`;

const ListItemStyled = styled.li``;

const LinkStyled = styled(Link)`
    display: block;
`;
