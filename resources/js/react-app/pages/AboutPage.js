import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import EditTextLink from '../common/EditTextLink';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getAboutText } from '../utils/textServices';

export default function AboutPage() {
    const [text, setText] = useState('');

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        getAboutText().then((res) => {
            setText(res.data);
        });
    }, []);

    useEffect(() => {
        document.title = 'Über uns | aka-Filmclub';
        setPageTitle('Über uns');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>Wir über uns</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text }} />
            <EditTextLink page="about" />
        </PageStyled>
    );
}

const TextContainerStyled = styled.div``;
