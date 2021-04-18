import React, { useContext, useEffect } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import DistributorFormGroup from '../../common/forms/DistributorFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import { ROUTE_INTERN_DISTRIBUTORS } from '../../constants';
import Context from '../../Context';
import { postDistributor } from '../../utils/services/distributorServices';

export default function AddDistributorPage() {
    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Filmverleih hinzufügen | aka-Filmclub';
        setPageTitle('Filmverleih hinzufügen');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postDistributor} postRedirectRoute={ROUTE_INTERN_DISTRIBUTORS}>
                <DistributorFormGroup />
            </BaseForm>
        </PageStyled>
    );
}
