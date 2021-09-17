import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import { PageHeadlineStyled } from '../../common/styledElements';
import {
    AKA_FORUM_URL,
    AUTH_LEVEL_EDITOR,
    PAGE_TITLE_ADD_NOTICE,
    PAGE_TITLE_ADD_SCREENING,
    PAGE_TITLE_ADD_SERIAL,
    PAGE_TITLE_ADMISSIONS,
    PAGE_TITLE_DISTRIBUTORS,
    PAGE_TITLE_INTERN,
    PAGE_TITLE_LICENSES,
    PAGE_TITLE_USERS,
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
            <ExternalLinkStyled href={AKA_FORUM_URL} target="_blank" rel="noopener noreferrer">
                Forum
            </ExternalLinkStyled>
            <LinkStyled to={ROUTE_INTERN_USERS}>{PAGE_TITLE_USERS}</LinkStyled>
            {isEditor ? (
                <>
                    <SubheadlineStyled>Sachen hinzufügen</SubheadlineStyled>
                    <LinkStyled to={ROUTE_INTERN_ADD_NOTICE}>{PAGE_TITLE_ADD_NOTICE}</LinkStyled>
                    <LinkStyled to={ROUTE_INTERN_ADD_SERIAL}>{PAGE_TITLE_ADD_SERIAL}</LinkStyled>
                    <LinkStyled to={ROUTE_INTERN_ADD_SCREENING}>{PAGE_TITLE_ADD_SCREENING}</LinkStyled>
                    <SubheadlineStyled>Abrechnung</SubheadlineStyled>
                    <LinkStyled to={ROUTE_INTERN_ADMISSIONS}>{PAGE_TITLE_ADMISSIONS}</LinkStyled>
                    <LinkStyled to={ROUTE_INTERN_DISTRIBUTORS}>{PAGE_TITLE_DISTRIBUTORS}</LinkStyled>
                    <SubheadlineStyled>Sonstiges</SubheadlineStyled>
                    <LinkStyled to={ROUTE_INTERN_LICENSES}>{PAGE_TITLE_LICENSES}</LinkStyled>
                </>
            ) : (
                <>
                    <SubheadlineStyled>Abrechnung</SubheadlineStyled>
                    <LinkStyled to={ROUTE_INTERN_ADMISSIONS}>Besuchszahlen</LinkStyled>
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

const ExternalLinkStyled = styled.a`
    display: block;
`;
