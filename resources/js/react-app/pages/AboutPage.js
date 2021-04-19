import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import EditTextLink from '../common/misc/EditTextLink';
import { PageHeadlineStyled } from '../common/styledElements';
import Context from '../Context';
import { getText } from '../utils/services/textServices';

export default function AboutPage() {
    const [text, setText] = useState('');

    const { pageTitle } = useContext(Context);

    useEffect(() => {
        getText('about').then((res) => {
            setText(res.data);
        });
    }, []);

    return (
        <BasePage title="Über uns">
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <TextContainerStyled dangerouslySetInnerHTML={{ __html: text }} />
            <EditTextLink page="about" />
        </BasePage>
    );
}

const TextContainerStyled = styled.div``;
