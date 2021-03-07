import styled from 'styled-components';

export const PageStyled = styled.main`
    min-height: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 160px 100px 100px 100px;

    @media (max-width: 1023px) {
        padding: 80px 20px 20px 20px;
    }
`;

export const PageHeadlineStyled = styled.h2`
    @media (max-width: 767px) {
        display: none;
    }
`;

export const HorizontalLineStyled = styled.div`
    height: 10px;
    width: 80%;
    margin: 20px 0;
    background-color: var(--aka-gelb);
`;

export const VerticalLineStyled = styled.span`
    color: var(--aka-gelb);
    font-weight: bold;
`;
