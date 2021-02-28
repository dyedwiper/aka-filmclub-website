import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageStyled } from '../../common/styledElements';
import UserContext from '../../UserContext';

export default function InternPage() {
    const { user } = useContext(UserContext);
    const isEditor = user.level >= 1;

    return (
        <PageStyled>
            <HeadlineStyled>Interner Bereich</HeadlineStyled>
            {isEditor && (
                <>
                    <SubheadlineStyled>Sachen anlegen</SubheadlineStyled>
                    <LinkStyled to="/intern/addNotice">News anlegen</LinkStyled>
                    <LinkStyled to="/intern/addSerial">Filmreihe anlegen</LinkStyled>
                    <LinkStyled to="/intern/addScreening">Vorführung anlegen</LinkStyled>
                </>
            )}
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
