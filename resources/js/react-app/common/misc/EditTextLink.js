import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR } from '../../constants';
import Context from '../../Context';
import { HorizontalRuleStyled } from '../styledElements';
import UpdateInfo from './UpdateInfo';

export default function EditTextLink({ text }) {
    const { user } = useContext(Context);

    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    if (!isAuthorized) return <></>;

    return (
        <>
            <HorizontalRuleStyled />
            <LinkStyled to={'/intern/editText/' + text.page}>Text bearbeiten</LinkStyled>
            <UpdateInfo entity={text} />
        </>
    );
}

const LinkStyled = styled(Link)``;
