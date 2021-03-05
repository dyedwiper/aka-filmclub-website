import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';
import Context from '../Context';

export default function FaqsPage() {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'FAQs | aka-Filmclub';
        setPageTitle('FAQs');
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>FAQs</HeadlineStyled>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
