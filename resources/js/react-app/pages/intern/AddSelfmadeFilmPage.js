import React from 'react';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import SelfmadeFilmFormGroup from '../../common/forms/SelfmadeFilmFormGroup';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_ADD_SELFMADE_FILM, ROUTE_SELFMADE_FILMS } from '../../constants';
import { postSelfmadeFilm } from '../../services/selfmadeFilmServices';

export default function AddSelfmadeFilmPage() {
    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_SELFMADE_FILM}>
            <PageHeadlineStyled>{PAGE_TITLE_ADD_SELFMADE_FILM}</PageHeadlineStyled>
            <BaseForm postFunction={postSelfmadeFilm} postRedirectRoute={ROUTE_SELFMADE_FILMS}>
                <SelfmadeFilmFormGroup />
            </BaseForm>
        </BasePage>
    );
}
