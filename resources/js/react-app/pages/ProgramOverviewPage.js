import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import { PageStyled } from '../common/styledElements';
import { getFutureScreenings } from '../utils/services';

export default function ProgramOverviewPage() {
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
