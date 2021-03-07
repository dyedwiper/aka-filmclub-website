import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';
import Context from '../Context';

export default function PressReviewPage() {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Pressespiegel | aka-Filmclub';
        setPageTitle('Pressespiegel');
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>Pressespiegel</HeadlineStyled>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
