import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import SerialFormGroup from '../../common/forms/SerialFormGroup';
import UpdateInfo from '../../common/misc/UpdateInfo';
import { PAGE_TITLE_EDIT_SERIAL, ROUTE_SERIAL, ROUTE_SERIALS } from '../../constants';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { deleteSerial, getSerialByUuid, postSerial } from '../../utils/services/serialServices';
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
        <BasePage pageTitle={PAGE_TITLE_EDIT_SERIAL}>
            <HeadlineStyled>{PAGE_TITLE_EDIT_SERIAL}</HeadlineStyled>
            <BaseForm
                postFunction={postSerial}
                deleteFunction={deleteSerial}
                isEditing={true}
                postRedirectRoute={ROUTE_SERIAL + serial.uuid}
                deleteRedirectRoute={ROUTE_SERIALS}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={serial.uuid} />
                <SerialFormGroup serial={serial} />
            </BaseForm>
            <UpdateInfo entity={serial} />
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
