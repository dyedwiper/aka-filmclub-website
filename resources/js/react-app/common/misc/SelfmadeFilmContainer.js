import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR, ROUTE_INTERN_EDIT_SELFMADE_FILM } from '../../constants';
import Context from '../../Context';
import CreditsContainer from '../screenings/CreditsContainer';
import { HorizontalRuleStyled } from '../styledElements';

export default function SelfmadeFilmContainer({ film }) {
    const { user } = useContext(Context);
    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    return (
        <SelfmadeFilmContainerStyled>
            <HorizontalRuleStyled />
            <IFrameContainerStyled>
                <IFrameStyled src={film.source} allow="fullscreen; picture-in-picture" />
            </IFrameContainerStyled>
            <TitleStyled>{film.title}</TitleStyled>
            <CreditsContainer film={film} />
            {film.synopsis && <SynopsisStyled>{film.synopsis}</SynopsisStyled>}
            {isAuthorized && <LinkStyled to={ROUTE_INTERN_EDIT_SELFMADE_FILM + film.uuid}>Bearbeiten</LinkStyled>}
        </SelfmadeFilmContainerStyled>
    );
}

const SelfmadeFilmContainerStyled = styled.li`
    margin: 20px 0 40px 0;
`;

const IFrameContainerStyled = styled.div`
    position: relative;
    /* Padding in percent is calculated of parent's width. 56.25% stands for aspect ration 16:9. */
    padding-bottom: 56.25%;
`;

const IFrameStyled = styled.iframe`
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
`;

const TitleStyled = styled.h3`
    margin: 10px 0;
`;

const SynopsisStyled = styled.p`
    margin: 10px 0;
`;

const LinkStyled = styled(Link)``;
