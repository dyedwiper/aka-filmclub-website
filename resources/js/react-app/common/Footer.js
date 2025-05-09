import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import instagramIcon from '../assets/instagram_icon.png';
import telegramIcon from '../assets/telegram_icon.png';
import blueskyIcon from '../assets/bluesky_icon.png';
import mastodonIcon from '../assets/mastodon_icon.png';
import {
    AKA_INSTAGRAM_URL,
    AKA_BSKY_URL,
    AKA_MASTODON_URL,
    AKA_TELEGRAM_URL,
    AKA_LONGNAME,
    PAGE_TITLE_CONTACT,
    PAGE_TITLE_IMPRINT,
    ROUTE_CONTACT,
    ROUTE_IMPRINT,
} from '../constants';

export default function Footer() {
    return (
        <FooterStyled>
            <ContentContainerStyled>
                <HeadlineStyled>{AKA_LONGNAME}</HeadlineStyled>
                <LinksContainerStyled>
                    <LinkStyled to={ROUTE_CONTACT}>{PAGE_TITLE_CONTACT}</LinkStyled>
                    <VerticalLineStyled>|</VerticalLineStyled>
                    <LinkStyled to={ROUTE_IMPRINT}>{PAGE_TITLE_IMPRINT}</LinkStyled>
                </LinksContainerStyled>
                <IconLinksContainerStyled>
                    <IconLinkStyled href={AKA_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                        <ImageStyled src={instagramIcon} alt="Logo von Instagram" />
                    </IconLinkStyled>
                    <IconLinkStyled href={AKA_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                        <ImageStyled src={telegramIcon} alt="Logo von Telegram" />
                    </IconLinkStyled>
                    <IconLinkStyled href={AKA_BSKY_URL} target="_blank" rel="noopener noreferrer">
                        <ImageStyled src={blueskyIcon} alt="Logo von Bluesky" />
                    </IconLinkStyled>
                    <IconLinkStyled href={AKA_MASTODON_URL} target="_blank" rel="noopener noreferrer">
                        <ImageStyled src={mastodonIcon} alt="Logo von Mastodon" />
                    </IconLinkStyled>
                </IconLinksContainerStyled>
            </ContentContainerStyled>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer`
    height: 60px;
    width: 100%;
    background-color: var(--aka-gelb);
`;

const ContentContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    max-width: 1024px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 767px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const HeadlineStyled = styled.h1`
    max-width: 200px;
    font-size: 0.7em;

    @media (max-width: 767px) {
        /* Hide on mobile screens, but not with 'display: none' because of SEO. */
        position: fixed;
        visibility: hidden;
    }
`;

const LinksContainerStyled = styled.div`
    justify-self: center;

    @media (max-width: 767px) {
        justify-self: left;
        margin-left: -5px;
    }
`;

const LinkStyled = styled(Link)`
    display: inline-block;
    margin: 0 5px;
    color: black;

    &:hover {
        text-decoration: underline white;
    }
`;

const VerticalLineStyled = styled.span``;

const IconLinksContainerStyled = styled.div`
    justify-self: right;
`;

const IconLinkStyled = styled.a`
    display: inline-block;
    margin: 0 5px;
`;

const ImageStyled = styled.img`
    height: 32px;
`;
