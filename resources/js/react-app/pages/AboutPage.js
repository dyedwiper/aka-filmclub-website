import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import EditTextLink from '../common/misc/EditTextLink';
import { PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_ABOUT } from '../constants';
import { getText } from '../utils/services/textServices';

export default function AboutPage() {
    const [text, setText] = useState('');

    useEffect(() => {
        getText('about').then((res) => {
            setText(res.data);
        });
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_ABOUT}>
            <PageHeadlineStyled>{PAGE_TITLE_ABOUT}</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text.text }} />
            <EditTextLink text={text} />
        </BasePage>
    );
}

const TextContainerStyled = styled.div``;
