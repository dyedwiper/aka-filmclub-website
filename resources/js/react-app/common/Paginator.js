import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Paginator({ site, page, setPage, setIsLoading, limit, itemsPerPage }) {
    const [pageNumbers, setPageNumbers] = useState([]);

    const numberOfPages = useRef(0);

    useEffect(() => {
        numberOfPages.current = Math.ceil(limit / itemsPerPage);
    }, []);

    useEffect(() => {
        const lowerBound = Math.max(1, page - 2);
        const upperBound = Math.min(page + 2, numberOfPages.current);
        const pagesArray = [];
        for (let i = lowerBound; i <= upperBound; i++) {
            pagesArray.push(i);
        }
        setPageNumbers(pagesArray);
    }, [page]);

    return (
        <PaginatorStyled>
            <UltimoPageLinkStyled to={site + '?page=1'} onClick={handleClick} className={page == 1 && 'disabled'}>
                {'<<'}
            </UltimoPageLinkStyled>
            {pageNumbers.map((pageNumber) => (
                <PageLinkStyled
                    key={pageNumber}
                    to={site + '?page=' + pageNumber}
                    onClick={handleClick}
                    className={pageNumber == page && 'disabled'}
                >
                    {pageNumber}
                </PageLinkStyled>
            ))}
            <UltimoPageLinkStyled
                to={site + '?page=' + numberOfPages.current}
                onClick={handleClick}
                className={page == numberOfPages.current && 'disabled'}
            >
                {'>>'}
            </UltimoPageLinkStyled>
        </PaginatorStyled>
    );

    function handleClick() {
        // Set page to initial value of 0 so that the component rerenders
        // The actual page number will be gotten from the query parameter
        setPage(0);
        setIsLoading(true);
    }
}

const PaginatorStyled = styled.div`
    width: 210px;
    margin: 20px auto;
`;

const PageLinkStyled = styled(Link)`
    display: inline-block;
    width: 30px;
    font-weight: bold;

    &.disabled {
        color: grey;
        pointer-events: none;
    }
`;

const UltimoPageLinkStyled = styled(Link)`
    display: inline-block;
    width: 30px;
    font-weight: bold;

    &.disabled {
        color: grey;
        pointer-events: none;
    }
`;
