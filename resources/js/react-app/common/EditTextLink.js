import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR } from '../constants';
import Context from '../Context';
import { HorizontalLineStyled } from './styledElements';

export default function EditTextLink({ page }) {
    const { user } = useContext(Context);

    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    if (isAuthorized) {
        return (
            <>
                <HorizontalLineStyled />
                <LinkStyled to={'/intern/editText/' + page}>News bearbeiten</LinkStyled>
            </>
        );
    }
}

const LinkStyled = styled(Link)``;
