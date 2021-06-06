import React from 'react';
import styled from 'styled-components';
import { formatToDateTimeString } from '../../utils/dateFormatters';

export default function UpdateInfo({ entity }) {
    return (
        <UpdateInfoStyled>
            Zuletzt bearbeitet von
            <UpdatedByStyled> {entity.updated_by ?? 'unbekannt'} </UpdatedByStyled>
            am
            <UpdatedAtStyled>
                {' '}
                {entity.updated_at ? formatToDateTimeString(entity.updated_at) : 'einem unbekannten Tage'}
            </UpdatedAtStyled>
        </UpdateInfoStyled>
    );
}

const UpdateInfoStyled = styled.div`
    margin: 10px 0;
    font-size: 0.7em;
`;

const UpdatedByStyled = styled.span`
    font-style: italic;
`;

const UpdatedAtStyled = styled.span`
    font-style: italic;
`;
