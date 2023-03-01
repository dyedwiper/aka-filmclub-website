import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import SelfmadeFilmContainer from '../common/misc/SelfmadeFilmContainer';
import { AddItemLinkStyled, PageHeadlineStyled } from '../common/styledElements';
import {
    PAGE_TITLE_SELFMADE_FILMS,
    ROUTE_INTERN_ADD_SELFMADE_FILM,
    VIMEO_EMBED_CONSENT_COOKIE_KEY,
} from '../constants';
import Context from '../Context';
import { getCookieValue } from '../utils/cookieUtils';
import { getSelfmadeFilms } from '../utils/services/selfmadeFilmServices';
import LoadingPage from './LoadingPage';

export default function SelfmadeFilmsPage() {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVimeoEmbedConsentGiven, setIsVimeoEmbedConsentGiven] = useState(false);

    const { isUserEditor } = useContext(Context);

    useEffect(() => {
        getSelfmadeFilms().then((res) => {
            setFilms(res.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const consent = getCookieValue(VIMEO_EMBED_CONSENT_COOKIE_KEY);
        if (consent === 'true') {
            setIsVimeoEmbedConsentGiven(true);
        }
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_SELFMADE_FILMS}>
            <PageHeadlineStyled>{PAGE_TITLE_SELFMADE_FILMS}</PageHeadlineStyled>
            {isUserEditor && (
                <AddItemLinkStyled to={ROUTE_INTERN_ADD_SELFMADE_FILM}>Eigenproduktion hinzufügen</AddItemLinkStyled>
            )}
            <FilmsListStyled>
                {films.map((film) => (
                    <SelfmadeFilmContainer
                        key={film.id}
                        film={film}
                        isEmbedConsentGiven={isVimeoEmbedConsentGiven}
                        setIsEmbedConsentGiven={setIsVimeoEmbedConsentGiven}
                    />
                ))}
            </FilmsListStyled>
        </BasePage>
    );
}

const FilmsListStyled = styled.ul``;
