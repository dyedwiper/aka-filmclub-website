import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import { AddItemLinkStyled, PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_DISTRIBUTORS, ROUTE_INTERN_ADD_DISTRIBUTOR, ROUTE_INTERN_EDIT_DISTRIBUTOR } from '../../constants';
import { getDistributors } from '../../services/distributorServices';

export default function DistributorsPage() {
    const [distributors, setDistributors] = useState([]);

    useEffect(() => {
        getDistributors().then((res) => {
            setDistributors(res.data);
        });
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_DISTRIBUTORS}>
            <PageHeadlineStyled>{PAGE_TITLE_DISTRIBUTORS}</PageHeadlineStyled>
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
        </BasePage>
    );
}

const ListStyled = styled.ul`
    margin-top: 20px;
`;

const ListItemStyled = styled.li``;

const LinkStyled = styled(Link)`
    display: block;
`;
