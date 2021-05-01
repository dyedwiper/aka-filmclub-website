import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import NoticeCard from '../common/notices/NoticeCard';
import ScreeningCard from '../common/screenings/ScreeningCard';
import { HorizontalRuleStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getNotices } from '../utils/services/noticeServices';
import { getFutureScreenings } from '../utils/services/screeningServices';
import LoadingPage from './LoadingPage';

export default function HomePage() {
    const [screenings, setScreenings] = useState([]);
    const [notices, setNotices] = useState([]);
    const [isLoadingScreenings, setIsLoadingScreenings] = useState(true);
    const [isLoadingNotices, setIsLoadingNotices] = useState(true);

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'aka-Filmclub';
        setPageTitle('');
    }, []);

    useEffect(() => {
        getFutureScreenings().then((res) => {
            setScreenings(res.data);
            setIsLoadingScreenings(false);
        });
    }, []);

    useEffect(() => {
        getNotices().then((res) => {
            setNotices(res.data.data);
            setIsLoadingNotices(false);
        });
    }, []);

    if (isLoadingScreenings || isLoadingNotices) return <LoadingPage />;

    return (
        <PageStyled>
            <WelcomeMessageStyled>
                Willkommen auf der Webseite des aka-Filmclub. Hier könnte noch was Nettes stehen.
            </WelcomeMessageStyled>
            <HorizontalRuleStyled />
            <HeadlineStyled>Die nächsten Vorführungen</HeadlineStyled>
            {screenings.length ? (
                <CardsListStyled>
                    {screenings.slice(0, 3).map((screening) => (
                        <ScreeningCard key={screening.id} screening={screening} />
                    ))}
                </CardsListStyled>
            ) : (
                <InfoStyled>Mehr im nächsten Semester</InfoStyled>
            )}
            <HorizontalRuleStyled />
            <HeadlineStyled>Die neuesten News</HeadlineStyled>
            <CardsListStyled>
                {notices.slice(0, 3).map((notice) => (
                    <NoticeCard key={notice.id} notice={notice} />
                ))}
            </CardsListStyled>
        </PageStyled>
    );
}

const WelcomeMessageStyled = styled.p``;

const HeadlineStyled = styled.h2`
    font-size: 1.5em;

    @media (max-width: 767px) {
        margin-top: 30px;
    }
`;

const CardsListStyled = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 20px;
    margin: 20px 0;

    @media (max-width: 767px) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: repeat(3, min-content);
        grid-gap: 30px;
    }
`;

const InfoStyled = styled.div``;
