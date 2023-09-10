import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import EditTextLink from '../common/misc/EditTextLink';
import { PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_PRESS } from '../constants';
import { getText } from '../services/textServices';

export default function PressReviewPage() {
    const [text, setText] = useState('');

    useEffect(() => {
        getText('press').then((res) => {
            setText(res.data);
        });
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_PRESS}>
            <PageHeadlineStyled>{PAGE_TITLE_PRESS}</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text.content }} />
            <EditTextLink text={text} />
        </BasePage>
    );
}

const TextContainerStyled = styled.div``;
