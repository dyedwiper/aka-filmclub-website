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
                Willkommen auf der Webseite des aka-Filmclub. Hier könnte ein Bild stehen.
            </WelcomeMessageStyled>
            <HorizontalLineStyled />
            <HeadlineStyled>Die nächsten Vorführungen</HeadlineStyled>
            {screenings.length ? (
                <CardsRowStyled>
                    {screenings.slice(0, 3).map((screening) => (
                        <ScreeningCard key={screening.id} screening={screening} />
                    ))}
                </CardsRowStyled>
            ) : (
                <InfoStyled>Mehr im nächsten Semester</InfoStyled>
            )}
            <HorizontalLineStyled />
            <HeadlineStyled>Die neuesten News</HeadlineStyled>
            <CardsRowStyled>
                {notices.slice(0, 3).map((notice) => (
                    <NoticeCard key={notice.id} notice={notice} />
                ))}
            </CardsRowStyled>
        </PageStyled>
    );
}

const WelcomeMessageStyled = styled.p``;

const HeadlineStyled = styled.h2`
    font-size: 1.5em;
`;

const CardsRowStyled = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 20px;
    margin-top: 20px;
`;

const InfoStyled = styled.div``;
