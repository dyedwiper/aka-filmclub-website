import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';
import { IMAGE_FOLDER, UUID_LENGTH } from '../constants';
import { getSingleScreening } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function ScreeningPage() {
    const [screening, setScreening] = useState({});
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        const screeningUuid = window.location.pathname.slice(-UUID_LENGTH);
        getSingleScreening(screeningUuid).then((res) => {
            setScreening(res.data);
            setisLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

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
