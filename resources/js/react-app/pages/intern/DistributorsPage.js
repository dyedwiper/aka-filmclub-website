import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AddItemLinkStyled, PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import { ROUTE_INTERN_ADD_DISTRIBUTOR, ROUTE_INTERN_EDIT_DISTRIBUTOR } from '../../constants';
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
            <AddItemLinkStyled to={ROUTE_INTERN_ADD_DISTRIBUTOR}>Filmverleih hinzufügen</AddItemLinkStyled>
            <ListStyled>
                {distributors.map((distributor) => (
                    <ListItemStyled key={distributor.id}>
                        <LinkStyled to={ROUTE_INTERN_EDIT_DISTRIBUTOR + distributor.uuid}>
                            {distributor.name}
                        </LinkStyled>
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
