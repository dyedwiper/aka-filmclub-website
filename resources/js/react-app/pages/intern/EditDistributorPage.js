import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import DistributorFormGroup from '../../common/forms/DistributorFormGroup';
import UpdateInfo from '../../common/misc/UpdateInfo';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_EDIT_DISTRIBUTOR, ROUTE_INTERN_DISTRIBUTORS } from '../../constants';
import { deleteDistributor, getDistributorByUuid, postDistributor } from '../../utils/services/distributorServices';
import LoadingPage from '../LoadingPage';

export default function EditDistributorPage() {
    const [distributor, setDistributor] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { uuid } = useParams();

    useEffect(() => {
        getDistributorByUuid(uuid).then((res) => {
            setDistributor(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_EDIT_DISTRIBUTOR}>
            <PageHeadlineStyled>{PAGE_TITLE_EDIT_DISTRIBUTOR}</PageHeadlineStyled>
            <BaseForm
                postFunction={postDistributor}
                deleteFunction={deleteDistributor}
                isEditing={true}
                postRedirectRoute={ROUTE_INTERN_DISTRIBUTORS}
                deleteRedirectRoute={ROUTE_INTERN_DISTRIBUTORS}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={distributor.uuid} />
                <DistributorFormGroup distributor={distributor} />
            </BaseForm>
            <UpdateInfo entity={distributor} />
        </BasePage>
    );
}
