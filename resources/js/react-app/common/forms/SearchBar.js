import React from 'react';
import styled from 'styled-components';

export default function SearchBar({ search, setSearch, setIsLoading }) {
    return (
        <SearchFormStyled htmlFor="archiveSearchInput" onSubmit={handleSubmit}>
            <LabelStyled>Suchbegriff:</LabelStyled>
            <InputStyled id="archiveSearchInput" name="search" defaultValue={search.value} />
            <ButtonStyled type="submit">Suchen</ButtonStyled>
        </SearchFormStyled>
    );

    function handleSubmit(event) {
        event.preventDefault();
        if (event.target.search.value) {
            setSearch({ value: event.target.search.value });
            setIsLoading(true);
        }
    }
}

const SearchFormStyled = styled.form``;

const LabelStyled = styled.label`
    margin-right: 20px;

    @media (max-width: 767px) {
        display: none;
    }
`;

const InputStyled = styled.input`
    width: 150px;
`;

const ButtonStyled = styled.button`
    margin-left: 20px;
`;
