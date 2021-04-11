import { PDFViewer } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BillingPdf from '../../common/accounting/BillingPdf';
import { PageStyled } from '../../common/styledElements';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getBillingByUuid } from '../../utils/services/billingServices';

export default function TempPdfPage() {
    const [billing, setBilling] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getBillingByUuid(uuid).then((res) => {
            setBilling(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <></>;

    return (
        <PageStyled>
            <PDFViewerStyled>
                <BillingPdf billing={billing} />
            </PDFViewerStyled>
        </PageStyled>
    );
}

const PDFViewerStyled = styled(PDFViewer)`
    width: 1024px;
    height: 1500px;
`;
