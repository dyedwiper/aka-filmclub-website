import React from 'react';
import styled from 'styled-components';

export default function SupportingFilmNote({ screening }) {
    if (!screening.supporting_films.length) return <></>;

    return (
        <SupportingFilmNoteStyled isAlsoSpecial={!!screening.special}>
            {screening.supporting_films.length === 1 ? 'mit Vorfilm' : 'mit Vorfilmen'}
        </SupportingFilmNoteStyled>
    );
}

const SupportingFilmNoteStyled = styled.div`
    display: inline-block;
    max-width: 100%;
    margin: ${(props) => (props.isAlsoSpecial ? '5px 0 0 5px' : '5px 0 0 -10px')};
    padding: 0 10px;
    background-color: var(--aka-gelb);
`;
