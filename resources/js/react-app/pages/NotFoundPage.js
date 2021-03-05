import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';
import { ASSETS_FOLDER } from '../constants';
import Context from '../Context';

export default function NotFoundPage() {
    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = '404 | aka-Filmclub';
        setPageTitle('404');
    }, []);

    return (
        <PageStyled>
            <IronsImageStyled src={ASSETS_FOLDER + 'waits_irons.jpg'} alt="Tom Waits while Jeremy Irons" />
            <NotFoundTextStyled>But you're gonna wait forever. There's nothing here.</NotFoundTextStyled>
        </PageStyled>
    );
}

const IronsImageStyled = styled.img`
    width: 100%;
`;

const NotFoundTextStyled = styled.div`
    font-size: 1.4em;
`;
