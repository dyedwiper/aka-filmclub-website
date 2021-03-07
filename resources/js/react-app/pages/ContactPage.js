import React, { useContext, useEffect } from 'react';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';

export default function ContactPage() {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Archiv | aka-Filmclub';
        setPageTitle('Archiv');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>Kontakt</PageHeadlineStyled>
        </PageStyled>
    );
}
