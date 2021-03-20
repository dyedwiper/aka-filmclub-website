import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarSeriesDownloadLink from '../common/CalendarSeriesDownloadLink';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
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
            <PageHeadlineStyled>Programmübersicht</PageHeadlineStyled>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <>
                    {screenings.length > 0 && <CalendarSeriesDownloadLink screenings={screenings} />}
                    <ScreeningsListStyled>
                        {screenings.map((screening) => (
                            <ScreeningsListItem key={screening.id} screening={screening} />
                        ))}
                    </ScreeningsListStyled>
                </>
            )}
        </PageStyled>
    );
}

const ScreeningsListStyled = styled.ul``;
