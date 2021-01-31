import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';
import { IMAGE_FOLDER } from '../constants';
import { getSingleScreening } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function ScreeningPage() {
    const [screening, setScreening] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [noScreeningFound, setNoScreeningFound] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        const screeningUuid = path.slice(path.lastIndexOf('/') + 1);
        getSingleScreening(screeningUuid).then((res) => {
            console.log(res.data);
            if (!res.data) {
                setNoScreeningFound(true);
            }
            setScreening(res.data);
            setisLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    if (noScreeningFound) return <Redirect to="/404" />;

    return (
        <PageStyled>
            <ScreeningImageStyled src={IMAGE_FOLDER + screening.image} />
            <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
            <ScreeningSynopsisStyled>{screening.synopsis}</ScreeningSynopsisStyled>
        </PageStyled>
    );
}

const ScreeningImageStyled = styled.img``;

const ScreeningTitleStyled = styled.h2``;

const ScreeningSynopsisStyled = styled.p``;
