import React from 'react';
import styled from 'styled-components';
import ooopsImage from '../assets/ooops.jpg';
import BasePage from '../common/BasePage';
import { PAGE_TITLE_ERROR } from '../constants';

export default function ErrorPage() {
    return (
        <BasePage pageTitle={PAGE_TITLE_ERROR}>
            <ImageStyled src={ooopsImage} />
        </BasePage>
    );
}

const ImageStyled = styled.img`
    display: block;
    margin: 10px auto;
`;
