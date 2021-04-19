import React, { useContext, useEffect } from 'react';
import { PageStyled } from '../common/styledElements';
import Context from '../Context';

export default function BasePage({ children, title }) {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = title + ' | aka-Filmclub';
        setPageTitle(title);
    }, []);

    return <PageStyled>{children}</PageStyled>;
}
