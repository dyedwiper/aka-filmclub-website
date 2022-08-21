import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import SelfmadeFilmFormGroup from '../../common/forms/SelfmadeFilmFormGroup';
import UpdateInfo from '../../common/misc/UpdateInfo';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_EDIT_SELFMADE_FILM, ROUTE_SELFMADE_FILMS } from '../../constants';
import { deleteSelfmadeFilm, getSelfmadeFilmByUuid, postSelfmadeFilm } from '../../utils/services/selfmadeFilmServices';
import LoadingPage from '../LoadingPage';

export default function EditSelfmadeFilmPage() {
    const [film, setFilm] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { uuid } = useParams();

    useEffect(() => {
        getSelfmadeFilmByUuid(uuid).then((res) => {
            setFilm(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_EDIT_SELFMADE_FILM}>
            <PageHeadlineStyled>{PAGE_TITLE_EDIT_SELFMADE_FILM}</PageHeadlineStyled>
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
            <UpdateInfo entity={film} />
        </BasePage>
    );
}
