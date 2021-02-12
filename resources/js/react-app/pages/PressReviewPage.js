import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';

export default function PressReviewPage() {
    useEffect(() => {
        document.title = 'Pressespiegel | aka-Filmclub ';
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>Pressespiegel</HeadlineStyled>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
