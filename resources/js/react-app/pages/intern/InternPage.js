import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageStyled } from '../../common/styledElements';
import { AUTH_LEVEL_EDITOR } from '../../constants';
import Context from '../../Context';

export default function InternPage() {
    const { user, setPageTitle } = useContext(Context);
    const isEditor = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        document.title = 'Intern | aka-Filmclub';
        setPageTitle('Intern');
    }, []);

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
