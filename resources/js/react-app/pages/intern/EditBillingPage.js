import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import BillingFormGroup from '../../common/forms/BillingFormGroup';
import UpdateInfo from '../../common/misc/UpdateInfo';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_BILLING, ROUTE_INTERN_ADMISSIONS, ROUTE_INTERN_BILLING } from '../../constants';
import Context from '../../Context';
import { deleteBilling, getBillingByUuid, postBilling } from '../../services/billingServices';
import LoadingPage from '../LoadingPage';

export default function EditBillingPage() {
    const [billing, setBilling] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { uuid } = useParams();

    const { pageTitle } = useContext(Context);

    useEffect(() => {
        getBillingByUuid(uuid).then((res) => {
            setBilling(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_BILLING + ': ' + billing.screening.title}>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm
                postFunction={postBilling}
                deleteFunction={deleteBilling}
                isEditing={true}
                postRedirectRoute={ROUTE_INTERN_BILLING + billing.uuid}
                deleteRedirectRoute={ROUTE_INTERN_ADMISSIONS}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={billing.uuid} />
                <BillingFormGroup billing={billing} />
            </BaseForm>
            <UpdateInfo entity={billing} />
        </BasePage>
    );
}
