import React, { useContext, useEffect } from 'react';
import { PageStyled } from '../common/styledElements';
import Context from '../Context';
import ooopsImage from '../assets/ooops.jpg';
import styled from 'styled-components';

export default function ErrorPage() {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Oooops | aka-Filmclub';
        setPageTitle('Oooops');
    }, []);

    return (
        <PageStyled>
            <ImageStyled src={ooopsImage} />
        </PageStyled>
    );
}

const ImageStyled = styled.img`
    display: block;
    margin: 10px auto;
`;
