import React from 'react';
import styled from 'styled-components';

export default function SearchBar({ search, setSearch, setIsLoading }) {
    return (
        <SearchFormStyled onSubmit={handleSubmit}>
            <SearchLabelStyled>
                Suchbegriff:
                <SearchInputStyled name="search" defaultValue={search.value} />
            </SearchLabelStyled>
            <SearchButtonStyled type="submit">Suchen</SearchButtonStyled>
        </SearchFormStyled>
    );

    function handleSubmit(event) {
        event.preventDefault();
        setSearch({ value: event.target.search.value });
        setIsLoading(true);
    }
}

const SearchFormStyled = styled.form``;

const SearchLabelStyled = styled.label``;

const SearchInputStyled = styled.input`
    width: 150px;
    margin-left: 20px;
`;

const SearchButtonStyled = styled.button`
    margin-left: 20px;
`;
