import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SerialRow from '../common/SerialRow';
import { PageStyled } from '../common/styledElements';
import { getSerials } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function SerialsPage() {
    const [serials, setSerials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = 'Archiv | aka-Filmclub ';
    }, []);

    useEffect(() => {
        getSerials().then((res) => {
            setSerials(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <HeadlineStyled>Filmreihen</HeadlineStyled>
            <SerialRowListStyled>
                {serials.map((serial) => (
                    <SerialRow key={serial.id} serial={serial} />
                ))}
            </SerialRowListStyled>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

const SerialRowListStyled = styled.ul``;
