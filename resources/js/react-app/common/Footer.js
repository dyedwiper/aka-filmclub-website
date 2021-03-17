import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import facebookIcon from '../assets/facebook_icon.png';
import instagramIcon from '../assets/instagram_icon.png';
import twitterIcon from '../assets/twitter_icon.png';

export default function Footer() {
    return (
        <FooterStyled>
            <ContentContainerStyled>
                <HeadlineStyled>Akademischer Filmclub an der Universität Freiburg e.V. (seit 1957)</HeadlineStyled>
                <LinksContainerStyled>
                    <LinkStyled to="/contact">Kontakt</LinkStyled>
                    <LinkStyled to="/links">Links</LinkStyled>
                </LinksContainerStyled>
                <IconLinksContainerStyled>
                    <IconLinkStyled href="https://www.facebook.com/akaFilmclub/" target="_blank">
                        <ImageStyled src={facebookIcon} />
                    </IconLinkStyled>
                    <IconLinkStyled href="https://www.instagram.com/akafilmclub/" target="_blank">
                        <ImageStyled src={instagramIcon} />
                    </IconLinkStyled>
                    <IconLinkStyled href="https://twitter.com/akafilmclub" target="_blank">
                        <ImageStyled src={twitterIcon} />
                    </IconLinkStyled>
                </IconLinksContainerStyled>
            </ContentContainerStyled>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer`
    height: 60px;
    width: 100%;
    padding: 0 20px;
    background-color: var(--aka-gelb);
`;

const ContentContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    max-width: 1024px;
    height: 100%;
    margin: 0 auto;

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
