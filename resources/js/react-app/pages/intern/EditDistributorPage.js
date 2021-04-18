import React, { useContext, useEffect, useState } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import DistributorFormGroup from '../../common/forms/DistributorFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import { ROUTE_INTERN_DISTRIBUTORS } from '../../constants';
import Context from '../../Context';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { deleteDistributor, getDistributorByUuid, postDistributor } from '../../utils/services/distributorServices';
import LoadingPage from '../LoadingPage';

export default function EditDistributorPage() {
    const [distributor, setDistributor] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getDistributorByUuid(uuid).then((res) => {
            setDistributor(res.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        document.title = 'Filmverleih bearbeiten | aka-Filmclub';
        setPageTitle('Filmverleih bearbeiten');
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
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
        </PageStyled>
    );
}
