import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import EditTextLink from '../common/misc/EditTextLink';
import { PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_CONTACT } from '../constants';
import { getText } from '../utils/services/textServices';

export default function ContactPage() {
    const [text, setText] = useState('');

    useEffect(() => {
        getText('contact').then((res) => {
            setText(res.data);
        });
    }, []);

    return (
        <BasePage pageTitle={PAGE_TITLE_CONTACT}>
            <PageHeadlineStyled>{PAGE_TITLE_CONTACT}</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text }} />
            <EditTextLink page="contact" />
        </BasePage>
    );
}

const TextContainerStyled = styled.div``;
