import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import SerialFormGroup from '../../common/forms/SerialFormGroup';
import { PageStyled } from '../../common/styledElements';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getSerialByUuid, postSerial, deleteSerial } from '../../utils/services/serialServices';
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
            <HeadlineStyled>Filmreihe bearbeiten</HeadlineStyled>
            <BaseForm postFunction={postSerial} deleteFunction={deleteSerial} isEditing={true}>
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={serial.uuid} />
                <SerialFormGroup serial={serial} />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
