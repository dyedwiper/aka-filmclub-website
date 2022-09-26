import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_INTERN_ADD_BILLING, ROUTE_INTERN_EDIT_BILLING } from '../../constants';
import { VerticalLineStyled } from '../styledElements';

export default function BillingLink({ screening }) {
    if (screening.main_film) return <></>;

    return (
        <>
            <VerticalLineStyled> | </VerticalLineStyled>
            {screening.billing ? (
                <Link to={ROUTE_INTERN_EDIT_BILLING + screening.billing.uuid}>Abrechnung bearbeiten</Link>
            ) : (
                <Link to={ROUTE_INTERN_ADD_BILLING + screening.uuid}>Abrechnung hinzufügen</Link>
            )}
        </>
    );
}
