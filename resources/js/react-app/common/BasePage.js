import React, { useContext, useEffect } from 'react';
import { PageStyled } from '../common/styledElements';
import Context from '../Context';

export default function BasePage({ children, pageTitle }) {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = pageTitle + ' | aka-Filmclub';
        setPageTitle(pageTitle);
    }, []);

    return <PageStyled>{children}</PageStyled>;
}
