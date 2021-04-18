import React, { useContext, useEffect } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import SelfmadeFilmFormGroup from '../../common/forms/SelfmadeFilmFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { postSelfmadeFilm } from '../../utils/services/selfmadeFilmServices';

export default function AddSelfmadeFilmPage() {
    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Eigenproduktion hinzufügen | aka-Filmclub';
        setPageTitle('Eigenproduktion hinzufügen');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postSelfmadeFilm}>
                <SelfmadeFilmFormGroup />
            </BaseForm>
        </PageStyled>
    );
}