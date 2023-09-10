import React from 'react';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import DistributorFormGroup from '../../common/forms/DistributorFormGroup';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_ADD_DISTRIBUTOR, ROUTE_INTERN_DISTRIBUTORS } from '../../constants';
import { postDistributor } from '../../services/distributorServices';

export default function AddDistributorPage() {
    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_DISTRIBUTOR}>
            <PageHeadlineStyled>{PAGE_TITLE_ADD_DISTRIBUTOR}</PageHeadlineStyled>
            <BaseForm postFunction={postDistributor} postRedirectRoute={ROUTE_INTERN_DISTRIBUTORS}>
                <DistributorFormGroup />
            </BaseForm>
        </BasePage>
    );
}
