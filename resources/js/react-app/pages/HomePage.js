import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import NoticeCard from '../common/NoticeCard';
import ScreeningCard from '../common/screenings/ScreeningCard';
import { HorizontalLineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getNotices } from '../utils/noticeServices';
import { getFutureScreenings } from '../utils/screeningServices';
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
            console.log(res.data.data);
            setIsLoadingNotices(false);
        });
    }, []);

    if (isLoadingScreenings || isLoadingNotices) return <LoadingPage />;

    return (
        <PageStyled>
            <WelcomeMessageStyled>
                Willkommen auf der Webseite des aka-Filmclub. Hier könnte noch was Nettes stehen.
            </WelcomeMessageStyled>
            <HorizontalLineStyled />
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
            <HorizontalLineStyled />
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
`;

const CardsListStyled = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 20px;
    margin-top: 20px;

    @media (max-width: 901px) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: repeat(3, minmax(0, 1fr));
    }
`;

const InfoStyled = styled.div``;
