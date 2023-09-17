import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import ScreeningFormGroup from '../../common/forms/ScreeningFormGroup';
import UpdateInfo from '../../common/misc/UpdateInfo';
import { PAGE_TITLE_EDIT_SCREENING, ROUTE_PROGRAM_OVERVIEW, ROUTE_SCREENING } from '../../constants';
import { deleteScreening, getScreeningByUuid, postScreening } from '../../services/screeningServices';
import LoadingPage from '../LoadingPage';

export default function EditScreeningPage() {
    const [screening, setScreening] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { uuid } = useParams();

    useEffect(() => {
        getScreeningByUuid(uuid).then((res) => {
            setScreening(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_EDIT_SCREENING}>
            <HeadlineStyled>{PAGE_TITLE_EDIT_SCREENING}</HeadlineStyled>
            <BaseForm
                postFunction={postScreening}
                deleteFunction={deleteScreening}
                isEditing={true}
                postRedirectRoute={ROUTE_SCREENING + screening.uuid}
                deleteRedirectRoute={ROUTE_PROGRAM_OVERVIEW}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={screening.uuid} />
                <ScreeningFormGroup screening={screening} />
            </BaseForm>
            <UpdateInfo entity={screening} />
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
