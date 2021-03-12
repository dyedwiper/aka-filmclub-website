import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import EditTextLink from '../common/EditTextLink';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getText } from '../utils/textServices';

export default function ContactPage() {
    const [text, setText] = useState('');

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        getText('contact').then((res) => {
            setText(res.data);
        });
    }, []);

    useEffect(() => {
        document.title = 'Kontakt | aka-Filmclub';
        setPageTitle('Kontakt');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>Kontakt</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text }} />
            <EditTextLink page="contact" />
        </PageStyled>
    );
}

const TextContainerStyled = styled.div``;
