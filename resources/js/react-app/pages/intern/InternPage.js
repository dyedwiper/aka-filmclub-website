import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import { PageHeadlineStyled } from '../../common/styledElements';
import {
    AUTH_LEVEL_EDITOR,
    PAGE_TITLE_INTERN,
    ROUTE_INTERN_ADD_NOTICE,
    ROUTE_INTERN_ADD_SCREENING,
    ROUTE_INTERN_ADD_SERIAL,
    ROUTE_INTERN_ADMISSIONS,
    ROUTE_INTERN_DISTRIBUTORS,
    ROUTE_INTERN_LICENSES,
    ROUTE_INTERN_USERS,
} from '../../constants';
import Context from '../../Context';

export default function InternPage() {
    const { user } = useContext(Context);
    const isEditor = user.level >= AUTH_LEVEL_EDITOR;

    return (
        <BasePage pageTitle={PAGE_TITLE_INTERN}>
            <PageHeadlineStyled>{PAGE_TITLE_INTERN}</PageHeadlineStyled>
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
                    <SubheadlineStyled>Sonstiges</SubheadlineStyled>
                    <LinkStyled to={ROUTE_INTERN_LICENSES}>Lizenzen</LinkStyled>
                </>
            )}
        </BasePage>
    );
}

const SubheadlineStyled = styled.h3`
    margin: 20px 0 10px 0;
`;

const LinkStyled = styled(Link)`
    display: block;
`;
