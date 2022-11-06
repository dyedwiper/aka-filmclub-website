import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_INTERN_ADD_BILLING, ROUTE_INTERN_BILLING } from '../../constants';
import { VerticalLineStyled } from '../styledElements';

export default function BillingLink({ screening }) {
    if (screening.main_film) return <></>;

    return (
        <>
            <VerticalLineStyled> | </VerticalLineStyled>
            {screening.billing ? (
                <Link to={ROUTE_INTERN_BILLING + screening.billing.uuid}>Abrechnung ansehen</Link>
            ) : (
                <Link to={ROUTE_INTERN_ADD_BILLING + screening.uuid}>Abrechnung hinzufügen</Link>
            )}
        </>
    );
}
