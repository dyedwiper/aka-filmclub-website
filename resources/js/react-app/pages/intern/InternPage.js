import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
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
            <PageHeadlineStyled>Interner Bereich</PageHeadlineStyled>
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

const SubheadlineStyled = styled.h3`
    margin: 20px 0 10px 0;
`;

const LinkStyled = styled(Link)`
    display: block;
`;
