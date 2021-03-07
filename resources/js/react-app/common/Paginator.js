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
            <BorderContainerStyled>
                <PageLinkStyled to={site + '?page=1'} onClick={handleClick} className={page == 1 && 'disabled'}>
                    {'<<'}
                </PageLinkStyled>
                {page === 1 && <PageLinkStyled className="disabled" />}
                {page <= 2 && <PageLinkStyled className="disabled" />}
                {pageNumbers.map((pageNumber) => (
                    <PageLinkStyled
                        key={pageNumber}
                        to={site + '?page=' + pageNumber}
                        onClick={handleClick}
                        className={pageNumber == page && 'disabled'}
                        isSet={page === pageNumber}
                    >
                        {pageNumber}
                    </PageLinkStyled>
                ))}
                {page >= numberOfPages.current - 1 && <PageLinkStyled className="disabled" />}
                {page === numberOfPages.current && <PageLinkStyled className="disabled" />}
                <PageLinkStyled
                    to={site + '?page=' + numberOfPages.current}
                    onClick={handleClick}
                    className={page == numberOfPages.current && 'disabled'}
                >
                    {'>>'}
                </PageLinkStyled>
            </BorderContainerStyled>
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
    margin: 40px auto;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
`;

const BorderContainerStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    border-top: 5px dashed black;
    border-bottom: 5px dashed black;
`;

const PageLinkStyled = styled(Link)`
    display: grid;
    align-items: center;
    height: 40px;
    width: 30px;
    border: 2px solid black;
    border-top-width: 3px;
    border-bottom-width: 1px;
    font-weight: bold;
    text-align: center;
    background-color: ${(props) => props.isSet && 'var(--aka-gelb)'};

    &.disabled {
        color: grey;
        pointer-events: none;
    }
`;
