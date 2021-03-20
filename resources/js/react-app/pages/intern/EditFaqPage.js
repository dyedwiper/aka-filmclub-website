import React, { useContext, useEffect, useState } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import FaqFormGroup from '../../common/forms/FaqFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { deleteFaq, getFaqByUuid, postFaq } from '../../utils/services/faqServices';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import LoadingPage from '../LoadingPage';

export default function EditFaqPage() {
    const [faq, setFaq] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getFaqByUuid(uuid).then((res) => {
            setFaq(res.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        document.title = 'FAQs | aka-Filmclub';
        setPageTitle('FAQs');
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postFaq} deleteFunction={deleteFaq} isEditing={true}>
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={faq.uuid} />
                <FaqFormGroup faq={faq} />
            </BaseForm>
        </PageStyled>
    );
}
