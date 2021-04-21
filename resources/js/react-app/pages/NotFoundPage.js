import React from 'react';
import styled from 'styled-components';
import waitsIrons from '../assets/waits_irons.jpg';
import BasePage from '../common/BasePage';
import { PAGE_TITLE_NOT_FOUND } from '../constants';

export default function NotFoundPage() {
    return (
        <BasePage pageTitle={PAGE_TITLE_NOT_FOUND}>
            <IronsImageStyled src={waitsIrons} alt="Tom Waits while Jeremy Irons" />
            <NotFoundTextStyled>But you're gonna wait forever. There's nothing here.</NotFoundTextStyled>
        </BasePage>
    );
}

const IronsImageStyled = styled.img`
    max-width: 640px;
    width: 100%;
`;

const NotFoundTextStyled = styled.div`
    font-size: 1.4em;
`;
