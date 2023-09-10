import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import EditTextLink from '../common/misc/EditTextLink';
import { PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_IMPRINT } from '../constants';
import { getText } from '../services/textServices';

export default function ImprintPage() {
    const [text, setText] = useState('');

    useEffect(() => {
        getText('imprint').then((res) => {
            setText(res.data);
        });
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_IMPRINT}>
            <PageHeadlineStyled>{PAGE_TITLE_IMPRINT}</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text.content }} />
            <EditTextLink text={text} />
        </BasePage>
    );
}

const TextContainerStyled = styled.div``;
