import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import EditTextLink from '../common/EditTextLink';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getText } from '../utils/textServices';

export default function PressReviewPage() {
    const [text, setText] = useState('');

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        getText('press').then((res) => {
            setText(res.data);
        });
    }, []);

    useEffect(() => {
        document.title = 'Pressespiegel | aka-Filmclub';
        setPageTitle('Pressespiegel');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>Pressespiegel</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text }} />
            <EditTextLink page="press" />
        </PageStyled>
    );
}

const TextContainerStyled = styled.div``;
