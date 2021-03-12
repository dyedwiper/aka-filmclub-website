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
        getText('awards').then((res) => {
            setText(res.data);
        });
    }, []);

    useEffect(() => {
        document.title = 'Auszeichnungen | aka-Filmclub';
        setPageTitle('Auszeichnungen');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>Auszeichnungen</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text }} />
            <EditTextLink page="awards" />
        </PageStyled>
    );
}

const TextContainerStyled = styled.div``;
