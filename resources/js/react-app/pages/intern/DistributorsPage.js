import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { getDistributors } from '../../utils/services/distributorServices';

export default function DistributorsPage() {
    const [distributors, setDistributors] = useState([]);

    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Verleihe | aka-Filmclub';
        setPageTitle('Verleihe');
    }, []);

    useEffect(() => {
        getDistributors().then((res) => {
            setDistributors(res.data);
        });
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            {distributors.map((distributor) => (
                <LinkStyled key={distributor.id}>{distributor.name}</LinkStyled>
            ))}
        </PageStyled>
    );
}

const LinkStyled = styled(Link)`
    display: block;
`;
