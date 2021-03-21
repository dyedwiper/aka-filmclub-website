import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import ScreeningFormGroup from '../../common/forms/ScreeningFormGroup';
import { HorizontalRuleStyled, PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { makeApiCall } from '../../utils/services/baseService';
import { postScreening } from '../../utils/services/screeningServices';

export default function AddScreeningPage() {
    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Vorstellung hinzufügen | aka-Filmclub';
        setPageTitle('Vorstellung hinzufügen');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <FormStyled>
                <LabelStyled htmlFor="imdbIdInput">OMDb mit IMDb-ID abfragen</LabelStyled>
                <InputStyled id="imdbIdInput" name="imdbId" placeholder="tt0091299" />
                <ButtonStyled type="submit" onClick={handleOmdbCall}>
                    Abfragen
                </ButtonStyled>
            </FormStyled>
            <BaseForm postFunction={postScreening}>
                <ScreeningFormGroup />
                <HorizontalRuleStyled />
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );

    function handleOmdbCall(event) {
        event.preventDefault();
        const imdbId = event.target.form.imdbId.value;
        fetch('http://www.omdbapi.com/?apikey=8d78dce8&i=' + imdbId)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
            });
    }
}

const FormStyled = styled.form`
    margin-bottom: 20px;
`;

const LabelStyled = styled.label`
    margin-right: 20px;
`;

const InputStyled = styled.input`
    width: 100px;
    margin-right: 20px;
`;

const ButtonStyled = styled.button``;
