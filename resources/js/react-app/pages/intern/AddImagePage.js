import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import { PageStyled } from '../../common/styledElements';
import { postImage } from '../../utils/services/imageServices';
import { getLastParameterFromPath, getSecondToLastParameterFromPath } from '../../utils/pathUtils';
import { ROUTE_NOTICE, ROUTE_SCREENING, ROUTE_SERIAL } from '../../constants';

export default function AddImagePage() {
    const [assocType, setAssocType] = useState('');
    const [assocUuid, setAssocUuid] = useState({});
    const [postRedirectRoute, setPostRedirectRoute] = useState('');

    useEffect(() => {
        const type = getSecondToLastParameterFromPath();
        const uuid = getLastParameterFromPath();
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
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>Bild hinzufügen</HeadlineStyled>
            <BaseForm postFunction={postImage} postRedirectRoute={postRedirectRoute}>
                <input type="hidden" name="assocType" defaultValue={assocType} />
                <input type="hidden" name="assocUuid" defaultValue={assocUuid} />
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
