import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../../utils/dateFormatters';

export default function ScreeningsListItem({ screening }) {
    return (
        <ScreeningsListItemStyled>
            <ScreeningLinkStyled to={'/screening/' + screening.uuid}>
                <ScreeningDateStyled>{formatDate(screening.date)}</ScreeningDateStyled>
                <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
            </ScreeningLinkStyled>
        </ScreeningsListItemStyled>
    );
}

const ScreeningsListItemStyled = styled.li`
    margin: 5px 0;
`;

const ScreeningLinkStyled = styled(Link)`
    &:hover {
        color: var(--aka-gelb);
    }
`;

const ScreeningDateStyled = styled.div`
    display: inline-block;
    margin-right: 10px;
`;

const ScreeningTitleStyled = styled.div`
    display: inline-block;
    font-weight: bold;
`;
