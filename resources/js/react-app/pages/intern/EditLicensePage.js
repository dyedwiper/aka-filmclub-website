import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import LicenseFormGroup from '../../common/forms/LicenseFormGroup';
import UpdateInfo from '../../common/misc/UpdateInfo';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_EDIT_LICENSE, ROUTE_INTERN_LICENSES } from '../../constants';
import { deleteLicense, getLicenseByUuid, postLicense } from '../../services/licenseServices';
import LoadingPage from '../LoadingPage';

export default function EditLicensePage() {
    const [license, setLicense] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { uuid } = useParams();

    useEffect(() => {
        getLicenseByUuid(uuid).then((res) => {
            setLicense(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_EDIT_LICENSE}>
            <PageHeadlineStyled>{PAGE_TITLE_EDIT_LICENSE}</PageHeadlineStyled>
            <BaseForm
                postFunction={postLicense}
                deleteFunction={deleteLicense}
                isEditing={true}
                postRedirectRoute={ROUTE_INTERN_LICENSES}
                deleteRedirectRoute={ROUTE_INTERN_LICENSES}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={license.uuid} />
                <LicenseFormGroup license={license} />
            </BaseForm>
            <UpdateInfo entity={license} />
        </BasePage>
    );
}
