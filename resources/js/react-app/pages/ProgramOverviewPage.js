import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import CalendarSeriesDownloadLink from '../common/calendar/CalendarSeriesDownloadLink';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import { AddItemLinkStyled, PageHeadlineStyled } from '../common/styledElements';
import { AUTH_LEVEL_EDITOR, PAGE_TITLE_PROGRAM_OVERVIEW, ROUTE_INTERN_ADD_SCREENING } from '../constants';
import Context from '../Context';
import { getFutureScreenings } from '../utils/services/screeningServices';

export default function ProgramOverviewPage() {
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useContext(Context);
    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        getFutureScreenings().then((res) => {
            setScreenings(res.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_PROGRAM_OVERVIEW}>
            <PageHeadlineStyled>{PAGE_TITLE_PROGRAM_OVERVIEW}</PageHeadlineStyled>
            {isAuthorized && (
                <AddItemLinkStyled to={ROUTE_INTERN_ADD_SCREENING}>Vorführung hinzufügen</AddItemLinkStyled>
            )}
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <ContainerStyled>
                    {screenings.length > 0 && <CalendarSeriesDownloadLink screenings={screenings} />}
                    <ScreeningsListStyled>
                        {screenings.map((screening) => (
                            <ScreeningsListItem key={screening.id} screening={screening} />
                        ))}
                    </ScreeningsListStyled>
                </ContainerStyled>
            )}
        </BasePage>
    );
}

const ContainerStyled = styled.div`
    margin-top: 20px;
`;

const ScreeningsListStyled = styled.ul``;
