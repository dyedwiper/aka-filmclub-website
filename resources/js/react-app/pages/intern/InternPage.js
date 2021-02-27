import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageStyled } from '../../common/styledElements';

export default function InternPage() {
    return (
        <PageStyled>
            <HeadlineStyled>Interner Bereich</HeadlineStyled>
            <LinkStyled to="/intern/addNotice">News anlegen</LinkStyled>
            <LinkStyled to="/intern/addSerial">Filmreihe anlegen</LinkStyled>
            <LinkStyled to="/intern/addScreening">Vorführung anlegen</LinkStyled>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

const LinkStyled = styled(Link)`
    display: block;
`;
