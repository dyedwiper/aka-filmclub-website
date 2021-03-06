import React, { useContext, useEffect } from 'react';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';

export default function LinksPage() {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'FAQs | aka-Filmclub';
        setPageTitle('FAQs');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>Links</PageHeadlineStyled>
        </PageStyled>
    );
}
