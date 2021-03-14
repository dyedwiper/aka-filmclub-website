import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import EditTextLink from '../common/EditTextLink';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getText } from '../utils/textServices';

export default function LinksPage() {
    const [text, setText] = useState('');

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        getText('links').then((res) => {
            setText(res.data);
        });
    }, []);

    useEffect(() => {
        document.title = 'Links | aka-Filmclub';
        setPageTitle('Links');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>Links</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text }} />
            <EditTextLink page="links" />
        </PageStyled>
    );
}

const TextContainerStyled = styled.div``;
