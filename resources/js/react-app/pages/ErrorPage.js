import React, { useContext, useEffect } from 'react';
import { PageStyled } from '../common/styledElements';
import Context from '../Context';

export default function ErrorPage() {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Oooops | aka-Filmclub';
        setPageTitle('Oooops');
    }, []);

    return <PageStyled>oooops</PageStyled>;
}
