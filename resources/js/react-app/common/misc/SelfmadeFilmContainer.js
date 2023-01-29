import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_INTERN_EDIT_SELFMADE_FILM, VIMEO_EMBED_URL, VIMEO_LINK_URL } from '../../constants';
import Context from '../../Context';
import CreditsContainer from '../screenings/CreditsContainer';

export default function SelfmadeFilmContainer({ film }) {
    const { isUserEditor } = useContext(Context);

    return (
        <SelfmadeFilmContainerStyled>
            {film.vimeo_id && film.areVimeoVideosEmbedded && (
                <IFrameContainerStyled>
                    <IFrameStyled src={VIMEO_EMBED_URL + film.vimeo_id} allow="fullscreen; picture-in-picture" />
                </IFrameContainerStyled>
            )}
            <TitleStyled>{film.title}</TitleStyled>
            {film.vimeo_id && !film.areVimeoVideosEmbedded && (
                <VideoLinkStyled href={VIMEO_LINK_URL + film.vimeo_id} target="_blank" rel="noopener noreferrer">
                    Link zum Video auf Vimeo
                </VideoLinkStyled>
            )}
            <CreditsContainer film={film} />
            {film.synopsis && <SynopsisStyled>{film.synopsis}</SynopsisStyled>}
            {isUserEditor && <LinkStyled to={ROUTE_INTERN_EDIT_SELFMADE_FILM + film.uuid}>Bearbeiten</LinkStyled>}
            <hr />
        </SelfmadeFilmContainerStyled>
    );
}

const SelfmadeFilmContainerStyled = styled.li`
    margin: 20px 0 20px 0;

    :last-child hr {
        display: none;
    }
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

const VideoLinkStyled = styled.a`
    display: block;
    margin-bottom: 10px;
`;

const SynopsisStyled = styled.p`
    margin: 10px 0;
`;

const LinkStyled = styled(Link)``;
