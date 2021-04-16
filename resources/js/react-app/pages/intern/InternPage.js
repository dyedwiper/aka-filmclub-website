import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import {
    AUTH_LEVEL_EDITOR,
    ROUTE_INTERN_ADD_NOTICE,
    ROUTE_INTERN_ADD_SCREENING,
    ROUTE_INTERN_ADD_SERIAL,
    ROUTE_INTERN_ADMISSIONS,
    ROUTE_INTERN_DISTRIBUTORS,
    ROUTE_INTERN_USERS,
} from '../../constants';
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
            <PageHeadlineStyled>Interner Bereich</PageHeadlineStyled>
            <SubheadlineStyled>Mitglieder</SubheadlineStyled>
            <LinkStyled to={ROUTE_INTERN_USERS}>Mitglieder verwalten</LinkStyled>
            {isEditor && (
                <>
                    <SubheadlineStyled>Sachen anlegen</SubheadlineStyled>
                    <LinkStyled to={ROUTE_INTERN_ADD_NOTICE}>News anlegen</LinkStyled>
                    <LinkStyled to={ROUTE_INTERN_ADD_SERIAL}>Filmreihe anlegen</LinkStyled>
                    <LinkStyled to={ROUTE_INTERN_ADD_SCREENING}>Vorführung anlegen</LinkStyled>
                    <SubheadlineStyled>Abrechnung</SubheadlineStyled>
                    <LinkStyled to={ROUTE_INTERN_ADMISSIONS}>Besuchszahlen</LinkStyled>
                    <LinkStyled to={ROUTE_INTERN_DISTRIBUTORS}>Filmverleihe</LinkStyled>
                </>
            )}
        </PageStyled>
    );
}

const SubheadlineStyled = styled.h3`
    margin: 20px 0 10px 0;
`;

const LinkStyled = styled(Link)`
    display: block;
`;
