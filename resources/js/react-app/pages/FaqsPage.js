import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';

export default function FaqsPage() {
    useEffect(() => {
        document.title = 'FAQs | aka-Filmclub ';
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>FAQs</HeadlineStyled>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
