import React from 'react';
import styled from 'styled-components';

export default function ScreeningsListItem({ screening }) {
    return (
        <ScreeningsListItemStyled>
            <ScreeningTitleStyled>{screening.title}</ScreeningTitleStyled>
        </ScreeningsListItemStyled>
    );
}

const ScreeningsListItemStyled = styled.li``;

const ScreeningTitleStyled = styled.span``;
