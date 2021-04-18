import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ScreeningFormGroup from '../../common/forms/ScreeningFormGroup';
import { PageStyled } from '../../common/styledElements';
import { ROUTE_PROGRAM_OVERVIEW, ROUTE_SCREENING } from '../../constants';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { deleteScreening, getScreeningByUuid, postScreening } from '../../utils/services/screeningServices';
import LoadingPage from '../LoadingPage';

export default function EditScreeningPage() {
    const [screening, setScreening] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getScreeningByUuid(uuid).then((res) => {
            setScreening(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <HeadlineStyled>Vorführung bearbeiten</HeadlineStyled>
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
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
