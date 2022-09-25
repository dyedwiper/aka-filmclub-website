import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import { PAGE_TITLE_ADD_IMAGE, ROUTE_NOTICE, ROUTE_SCREENING, ROUTE_SERIAL } from '../../constants';
import { postImage } from '../../utils/services/imageServices';

export default function AddImagePage() {
    const [assocType, setAssocType] = useState('');
    const [assocUuid, setAssocUuid] = useState({});
    const [postRedirectRoute, setPostRedirectRoute] = useState('');

    const { type, uuid } = useParams();

    useEffect(() => {
        setAssocType(type);
        setAssocUuid(uuid);
        switch (type) {
            case 'screening':
                setPostRedirectRoute(ROUTE_SCREENING + uuid);
                break;
            case 'serial':
                setPostRedirectRoute(ROUTE_SERIAL + uuid);
                break;
            case 'notice':
                setPostRedirectRoute(ROUTE_NOTICE + uuid);
                break;
            default:
                break;
        }
    }, [type, uuid]);

    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_IMAGE}>
            <HeadlineStyled>{PAGE_TITLE_ADD_IMAGE}</HeadlineStyled>
            <BaseForm postFunction={postImage} postRedirectRoute={postRedirectRoute}>
                <input type="hidden" name="assocType" defaultValue={assocType} />
                <input type="hidden" name="assocUuid" defaultValue={assocUuid} />
                <ImageFormGroup />
            </BaseForm>
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
