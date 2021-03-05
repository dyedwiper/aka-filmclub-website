import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import { PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getFutureScreenings } from '../utils/screeningServices';

export default function ProgramOverviewPage() {
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Programm | aka-Filmclub';
        setPageTitle('Programm');
    }, []);

    useEffect(() => {
        getFutureScreenings().then((res) => {
            setScreenings(res.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>Programmübersicht</HeadlineStyled>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <ScreeningsListStyled>
                    {screenings.map((screening) => (
                        <ScreeningsListItem key={screening.id} screening={screening} />
                    ))}
                </ScreeningsListStyled>
            )}
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

const ScreeningsListStyled = styled.ul``;
