import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import { AddItemLinkStyled, PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_LICENSES, ROUTE_INTERN_ADD_LICENSE, ROUTE_INTERN_EDIT_LICENSE } from '../../constants';
import { getLicenses } from '../../utils/services/licenseServices';

export default function LicensesPage() {
    const [licenses, setLicenses] = useState([]);

    useEffect(() => {
        getLicenses().then((res) => {
            setLicenses(res.data);
        });
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_LICENSES}>
            <PageHeadlineStyled>{PAGE_TITLE_LICENSES}</PageHeadlineStyled>
            <AddItemLinkStyled to={ROUTE_INTERN_ADD_LICENSE}>Lizenz hinzufügen</AddItemLinkStyled>
            <ListStyled>
                {licenses.map((license) => (
                    <ListItemStyled key={license.id}>
                        <LinkStyled to={ROUTE_INTERN_EDIT_LICENSE + license.uuid}>{license.name}</LinkStyled>
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
