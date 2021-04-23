import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import CalendarSeriesDownloadLink from '../common/calendar/CalendarSeriesDownloadLink';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import { PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_PROGRAM_OVERVIEW } from '../constants';
import { getFutureScreenings } from '../utils/services/screeningServices';

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
        <BasePage pageTitle={PAGE_TITLE_PROGRAM_OVERVIEW}>
            <PageHeadlineStyled>{PAGE_TITLE_PROGRAM_OVERVIEW}</PageHeadlineStyled>
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
        </BasePage>
    );
}

const ScreeningsListStyled = styled.ul``;
