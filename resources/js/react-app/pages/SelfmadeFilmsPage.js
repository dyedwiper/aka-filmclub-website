import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AddItemLinkStyled, PageHeadlineStyled, PageStyled } from '../common/styledElements';
import SelfmadeFilmContainer from '../common/misc/SelfmadeFilmContainer';
import { AUTH_LEVEL_EDITOR, ROUTE_INTERN_ADD_SELFMADE_FILM } from '../constants';
import Context from '../Context';
import { getSelfmadeFilms } from '../utils/services/selfmadeFilmServices';
import LoadingPage from './LoadingPage';

export default function SelfmadeFilmsPage() {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, pageTitle, setPageTitle } = useContext(Context);

    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        document.title = 'Eigenproduktionen | aka-Filmclub';
        setPageTitle('Eigenproduktionen');
    }, []);

    useEffect(() => {
        getSelfmadeFilms().then((res) => {
            setFilms(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            {isAuthorized && (
                <AddItemLinkStyled to={ROUTE_INTERN_ADD_SELFMADE_FILM}>Eigenproduktion hinzufügen</AddItemLinkStyled>
            )}
            <FilmsListStyled>
                {films.map((film) => (
                    <SelfmadeFilmContainer key={film.id} film={film} />
                ))}
            </FilmsListStyled>
        </PageStyled>
    );
}

const FilmsListStyled = styled.ul``;
