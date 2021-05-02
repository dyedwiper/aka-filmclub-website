import React from 'react';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import LicenseFormGroup from '../../common/forms/LicenseFormGroup';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_ADD_LICENSE, ROUTE_INTERN_LICENSES } from '../../constants';
import { postLicense } from '../../utils/services/licenseServices';

export default function AddLicensePage() {
    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_LICENSE}>
            <PageHeadlineStyled>{PAGE_TITLE_ADD_LICENSE}</PageHeadlineStyled>
            <BaseForm postFunction={postLicense} postRedirectRoute={ROUTE_INTERN_LICENSES}>
                <LicenseFormGroup />
            </BaseForm>
        </BasePage>
    );
}
