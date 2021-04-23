import React, { useEffect, useState } from 'react';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import FaqFormGroup from '../../common/forms/FaqFormGroup';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_EDIT_FAQ, ROUTE_FAQS } from '../../constants';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { deleteFaq, getFaqByUuid, postFaq } from '../../utils/services/faqServices';
import LoadingPage from '../LoadingPage';

export default function EditFaqPage() {
    const [faq, setFaq] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getFaqByUuid(uuid).then((res) => {
            setFaq(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_EDIT_FAQ}>
            <PageHeadlineStyled>{PAGE_TITLE_EDIT_FAQ}</PageHeadlineStyled>
            <BaseForm
                postFunction={postFaq}
                deleteFunction={deleteFaq}
                isEditing={true}
                postRedirectRoute={ROUTE_FAQS}
                deleteRedirectRoute={ROUTE_FAQS}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={faq.uuid} />
                <FaqFormGroup faq={faq} />
            </BaseForm>
        </BasePage>
    );
}
