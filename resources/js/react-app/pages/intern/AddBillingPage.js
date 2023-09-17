import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import BillingFormGroup from '../../common/forms/BillingFormGroup';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_BILLING, ROUTE_INTERN_ADMISSIONS } from '../../constants';
import Context from '../../Context';
import { postBilling } from '../../services/billingServices';
import { getScreeningByUuid } from '../../services/screeningServices';
import LoadingPage from '../LoadingPage';

export default function AddBillingPage() {
    const [screening, setScreening] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { pageTitle } = useContext(Context);

    const { uuid } = useParams();

    useEffect(() => {
        getScreeningByUuid(uuid).then((res) => {
            setScreening(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_BILLING + ': ' + screening.title}>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postBilling} postRedirectRoute={ROUTE_INTERN_ADMISSIONS}>
                <BillingFormGroup screening={screening} />
            </BaseForm>
        </BasePage>
    );
}
