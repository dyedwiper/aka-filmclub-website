import React from 'react';
import styled from 'styled-components';
import { VerticalLineStyled } from '../styledElements';
import linkIcon from '../../assets/link_icon.png';

export default function CopyrightContainer({ image }) {
    return (
        <CopyrightContainerStyled>
            {image.license && (
                <LinkStyled href={image.license.link} target="_blank">
                    {image.license.name}
                </LinkStyled>
            )}
            {image.originator && image.license && <VerticalLineStyled>|</VerticalLineStyled>}
            {image.originator && <OriginatorStyled>{image.originator}</OriginatorStyled>}
            {image.link && (
                <LinkStyled href={image.link} target="_blank">
                    <IconStyled src={linkIcon} />
                </LinkStyled>
            )}
        </CopyrightContainerStyled>
    );
}

const CopyrightContainerStyled = styled.div`
    position: absolute;
    bottom: -15px;
    width: 100%;
    text-align: right;
    font-size: 0.7em;
`;

const OriginatorStyled = styled.span``;

const LinkStyled = styled.a``;

const IconStyled = styled.img`
    height: 10px;
    margin-left: 5px;
`;
