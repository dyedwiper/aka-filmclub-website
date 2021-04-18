import React, { useContext, useEffect, useState } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import BillingFormGroup from '../../common/forms/BillingFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import { ROUTE_INTERN_ADMISSIONS } from '../../constants';
import Context from '../../Context';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { postBilling } from '../../utils/services/billingServices';
import { getScreeningByUuid } from '../../utils/services/screeningServices';
import LoadingPage from '../LoadingPage';

export default function AddBillingPage() {
    const [screening, setScreening] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = screening.title + ' abrechnen | aka-Filmclub';
        setPageTitle(screening.title + ' abrechnen');
    }, [screening]);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getScreeningByUuid(uuid).then((res) => {
            setScreening(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postBilling} postRedirectRoute={ROUTE_INTERN_ADMISSIONS}>
                <BillingFormGroup screening={screening} />
            </BaseForm>
        </PageStyled>
    );
}
