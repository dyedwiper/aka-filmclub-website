import React, { useContext, useEffect, useState } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import SelfmadeFilmFormGroup from '../../common/forms/SelfmadeFilmFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { deleteSelfmadeFilm, getSelfmadeFilmByUuid, postSelfmadeFilm } from '../../utils/services/selfmadeFilmServices';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import LoadingPage from '../LoadingPage';
import { ROUTE_SELFMADE_FILMS } from '../../constants';

export default function EditSelfmadeFilmPage() {
    const [film, setFilm] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Eigenproduktion bearbeiten | aka-Filmclub';
        setPageTitle('Eigenproduktion bearbeiten');
    }, []);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getSelfmadeFilmByUuid(uuid).then((res) => {
            setFilm(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm
                postFunction={postSelfmadeFilm}
                deleteFunction={deleteSelfmadeFilm}
                isEditing={true}
                postRedirectRoute={ROUTE_SELFMADE_FILMS}
                deleteRedirectRoute={ROUTE_SELFMADE_FILMS}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={film.uuid} />
                <SelfmadeFilmFormGroup film={film} />
            </BaseForm>
        </PageStyled>
    );
}
