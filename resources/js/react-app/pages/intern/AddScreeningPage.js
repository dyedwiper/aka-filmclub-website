import React, { useState } from 'react';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import ScreeningFormGroup from '../../common/forms/ScreeningFormGroup';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_ADD_SCREENING, ROUTE_PROGRAM_OVERVIEW } from '../../constants';
import { postScreening } from '../../services/screeningServices';

export default function AddScreeningPage() {
    const [omdbData, setOmdbData] = useState({});
    const [omdbError, setOmdbError] = useState(false);

    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_SCREENING}>
            <PageHeadlineStyled>{PAGE_TITLE_ADD_SCREENING}</PageHeadlineStyled>
            <FormStyled>
                <LabelStyled htmlFor="imdbIdInput">OMDb mit IMDb-ID abfragen</LabelStyled>
                <InputStyled id="imdbIdInput" name="imdbId" placeholder="tt0091299" />
                <ButtonStyled type="submit" onClick={handleOmdbCall}>
                    Abfragen
                </ButtonStyled>
                {omdbError && <OmdbErrorStyled>Fehler bei der Abfrage</OmdbErrorStyled>}
            </FormStyled>
            <hr />
            <BaseForm postFunction={postScreening} postRedirectRoute={ROUTE_PROGRAM_OVERVIEW}>
                <ScreeningFormGroup screening={omdbData} />
                <hr />
                <ImageFormGroup />
            </BaseForm>
        </BasePage>
    );

    function handleOmdbCall(event) {
        event.preventDefault();
        const imdbId = event.target.form.imdbId.value;
        // Here fetch is used instead of axios, because axios is configured globally for calls to the aka-API.
        fetch('https://www.omdbapi.com/?apikey=8d78dce8&i=' + imdbId)
            .then((res) => res.json())
            .then((json) => {
                if (!json.response === 'True') {
                    return setOmdbError(true);
                }
                const dataMap = {
                    title: json.Title,
                    directed_by: json.Director,
                    written_by: json.Writer,
                    cast: json.Actors,
                    year: json.Year,
                    country: json.Country,
                    length: json.Runtime.slice(0, -4),
                };
                setOmdbData(dataMap);
                setOmdbError(false);
            })
            .catch(() => {
                setOmdbError(true);
            });
    }
}

const FormStyled = styled.form`
    margin-bottom: 20px;
`;

const LabelStyled = styled.label`
    margin-right: 20px;

    @media (max-width: 767px) {
        display: block;
        margin-bottom: 10px;
    }
`;

const InputStyled = styled.input`
    width: 100px;
    margin-right: 20px;
`;

const ButtonStyled = styled.button``;

const OmdbErrorStyled = styled.div`
    color: var(--aka-red);
`;
