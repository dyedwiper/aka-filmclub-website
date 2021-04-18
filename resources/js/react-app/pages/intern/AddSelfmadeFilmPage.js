import React, { useContext, useEffect } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import VideoFormGroup from '../../common/forms/SelfmadeFilmFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { postVideo } from '../../utils/services/selfmadeFilmServices';

export default function AddVideoPage() {
    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Eigenproduktion hinzufügen | aka-Filmclub';
        setPageTitle('Eigenproduktion hinzufügen');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postVideo}>
                <VideoFormGroup />
            </BaseForm>
        </PageStyled>
    );
}
