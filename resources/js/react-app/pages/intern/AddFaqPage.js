import React from 'react';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import FaqFormGroup from '../../common/forms/FaqFormGroup';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_ADD_FAQ, ROUTE_FAQS } from '../../constants';
import { postFaq } from '../../utils/services/faqServices';

export default function AddFaqPage() {
    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_FAQ}>
            <PageHeadlineStyled>{PAGE_TITLE_ADD_FAQ}</PageHeadlineStyled>
            <BaseForm postFunction={postFaq} postRedirectRoute={ROUTE_FAQS}>
                <FaqFormGroup />
            </BaseForm>
        </BasePage>
    );
}
