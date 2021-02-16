import React, { useEffect, useState } from 'react';
import SerialFormGroup from '../../common/forms/SerialFormGroup';
import { PageStyled } from '../../common/styledElements';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getSerialByUuid } from '../../utils/serialServices';
import LoadingPage from '../LoadingPage';

export default function EditSerialPage() {
    const [serial, setSerial] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const serialUuid = getLastParameterFromPath();
        getSerialByUuid(serialUuid).then((res) => {
            setSerial(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <SerialFormGroup serial={serial} />
        </PageStyled>
    );
}
