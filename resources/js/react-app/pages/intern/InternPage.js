import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import { PageHeadlineStyled } from '../../common/styledElements';
import {
    AKA_FORUM_URL,
    AKA_NEXTCLOUD_URL,
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
    ROUTE_INTERN_EDIT_USER,
    ROUTE_INTERN_LICENSES,
    ROUTE_INTERN_USERS,
} from '../../constants';
import Context from '../../Context';

export default function InternPage() {
    const { isUserEditor, isUserAdmin, user } = useContext(Context);

    return (
        <BasePage pageTitle={PAGE_TITLE_INTERN}>
            <PageHeadlineStyled>{PAGE_TITLE_INTERN}</PageHeadlineStyled>
            <SubheadlineStyled>Externes Internes</SubheadlineStyled>
            <ExternalLinkStyled href={AKA_FORUM_URL} target="_blank" rel="noopener noreferrer">
                Forum
            </ExternalLinkStyled>
            <ExternalLinkStyled href={AKA_NEXTCLOUD_URL} target="_blank" rel="noopener noreferrer">
                Nextcloud
            </ExternalLinkStyled>
            <SubheadlineStyled>Mitgliederverwaltung</SubheadlineStyled>
            {isUserAdmin && <LinkStyled to={ROUTE_INTERN_USERS}>{PAGE_TITLE_USERS}</LinkStyled>}
            <LinkStyled to={ROUTE_INTERN_EDIT_USER + user.uuid}>Eigene Daten bearbeiten</LinkStyled>
            {isUserEditor ? (
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
