import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageStyled } from '../../common/styledElements';

export default function InternPage() {
    return (
        <PageStyled>
            <HeadlineStyled>Interner Bereich</HeadlineStyled>
            <SubheadlineStyled>Sachen anlegen</SubheadlineStyled>
            <LinkStyled to="/intern/addNotice">News anlegen</LinkStyled>
            <LinkStyled to="/intern/addSerial">Filmreihe anlegen</LinkStyled>
            <LinkStyled to="/intern/addScreening">Vorführung anlegen</LinkStyled>
            <SubheadlineStyled>Mitglieder</SubheadlineStyled>
            <LinkStyled to="/intern/users">Mitglieder verwalten</LinkStyled>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

const SubheadlineStyled = styled.h3``;

const LinkStyled = styled(Link)`
    display: block;
`;
