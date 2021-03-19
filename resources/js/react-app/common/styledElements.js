import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageStyled = styled.main`
    min-height: calc(100vh - 60px);
    max-width: 1024px;
    margin: 0 auto;
    padding: 120px 100px 100px 100px;

    @media (max-width: 1023px) {
        padding: 120px 20px 20px 20px;
    }

    @media (max-width: 767px) {
        padding: 80px 20px 20px 20px;
    }
`;

export const PageHeadlineStyled = styled.h2`
    @media (max-width: 767px) {
        display: none;
    }
`;

export const HorizontalRuleStyled = styled.hr``;

export const VerticalLineStyled = styled.span`
    color: var(--aka-gelb);
    font-weight: bold;
`;

export const AddItemLinkStyled = styled(Link)`
    display: inline-block;
    padding: 5px;
    border: solid 1px black;
    box-shadow: 1px 1px 1px black;
    color: black;

    &:active {
        background-color: var(--aka-gelb);
    }
    &:hover {
        text-decoration: none;
    }
`;

export const ArchiveSearchContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 280px 1fr;
    align-items: center;
    column-gap: 40px;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`;