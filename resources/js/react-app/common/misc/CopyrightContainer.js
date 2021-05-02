import React from 'react';
import styled from 'styled-components';
import { VerticalLineStyled } from '../styledElements';

export default function CopyrightContainer({ image }) {
    return (
        <CopyrightContainerStyled>
            {image.copyright && <CopyrightStyled>&copy; {image.copyright}</CopyrightStyled>}
            {image.copyright && image.license && <VerticalLineStyled>|</VerticalLineStyled>}
            {image.license && (
                <LicenseLinkStyled href={image.license.link} target="_blank">
                    {image.license.name}
                </LicenseLinkStyled>
            )}
        </CopyrightContainerStyled>
    );
}

const CopyrightContainerStyled = styled.div`
    text-align: right;
    font-size: 0.7em;
`;

const CopyrightStyled = styled.span``;

const LicenseLinkStyled = styled.a``;
