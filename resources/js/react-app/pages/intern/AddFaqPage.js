import React, { useContext, useEffect } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import FaqFormGroup from '../../common/forms/FaqFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { postFaq } from '../../utils/services/faqServices';

export default function AddFaqPage() {
    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'FAQ hinzufügen | aka-Filmclub';
        setPageTitle('FAQ hinzufügen');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postFaq}>
                <FaqFormGroup />
            </BaseForm>
        </PageStyled>
    );
}
