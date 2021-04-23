import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import EditTextLink from '../common/misc/EditTextLink';
import { PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_LINKS } from '../constants';
import { getText } from '../utils/services/textServices';

export default function LinksPage() {
    const [text, setText] = useState('');

    useEffect(() => {
        getText('links').then((res) => {
            setText(res.data);
        });
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_LINKS}>
            <PageHeadlineStyled>{PAGE_TITLE_LINKS}</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text }} />
            <EditTextLink page="links" />
        </BasePage>
    );
}

const TextContainerStyled = styled.div``;
