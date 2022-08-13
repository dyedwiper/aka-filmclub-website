import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../Context';
import UpdateInfo from './UpdateInfo';

export default function EditTextLink({ text }) {
    const { isUserEditor } = useContext(Context);

    if (!isUserEditor) return <></>;

    return (
        <>
            <hr />
            <LinkStyled to={'/intern/editText/' + text.page}>Text bearbeiten</LinkStyled>
            <UpdateInfo entity={text} />
        </>
    );
}

const LinkStyled = styled(Link)``;
