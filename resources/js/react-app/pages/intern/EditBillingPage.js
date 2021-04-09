import React, { useContext, useEffect, useState } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import BillingFormGroup from '../../common/forms/BillingFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getBillingByUuid, postBilling, deleteBilling } from '../../utils/services/billingServices';
import LoadingPage from '../LoadingPage';

export default function EditBillingPage() {
    const [billing, setBilling] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getBillingByUuid(uuid).then((res) => {
            setBilling(res.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        document.title = 'Abrechnung bearbeiten | aka-Filmclub';
        setPageTitle('Abrechnung bearbeiten');
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postBilling} deleteFunction={deleteBilling} isEditing={true}>
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={billing.uuid} />
                <BillingFormGroup billing={billing} />
            </BaseForm>
        </PageStyled>
    );
}
