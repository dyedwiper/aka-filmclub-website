import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import facebookIcon from '../assets/facebook_icon.png';
import instagramIcon from '../assets/instagram_icon.png';
import twitterIcon from '../assets/twitter_icon.png';
import {
    AKA_FACEBOOK_URL,
    AKA_INSTAGRAM_URL,
    AKA_LONGNAME,
    AKA_TWITTER_URL,
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
                    <IconLinkStyled href={AKA_FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                        <ImageStyled src={facebookIcon} />
                    </IconLinkStyled>
                    <IconLinkStyled href={AKA_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                        <ImageStyled src={instagramIcon} />
                    </IconLinkStyled>
                    <IconLinkStyled href={AKA_TWITTER_URL} target="_blank" rel="noopener noreferrer">
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
