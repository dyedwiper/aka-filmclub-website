import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import waitsIrons from '../assets/waits_irons.jpg';
import { PageStyled } from '../common/styledElements';
import Context from '../Context';

export default function NotFoundPage() {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = '404 | aka-Filmclub';
        setPageTitle('404');
    }, []);

    return (
        <PageStyled>
            <IronsImageStyled src={waitsIrons} alt="Tom Waits while Jeremy Irons" />
            <NotFoundTextStyled>But you're gonna wait forever. There's nothing here.</NotFoundTextStyled>
        </PageStyled>
    );
}

const IronsImageStyled = styled.img`
    max-width: 640px;
    width: 100%;
`;

const NotFoundTextStyled = styled.div`
    font-size: 1.4em;
`;
