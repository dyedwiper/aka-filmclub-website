import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import { PageStyled } from '../../common/styledElements';
import { postImage } from '../../utils/services/imageServices';
import { getLastParameterFromPath, getSecondToLastParameterFromPath } from '../../utils/pathUtils';

export default function AddImagePage() {
    const [assocType, setAssocType] = useState('');
    const [assocUuid, setAssocUuid] = useState({});

    useEffect(() => {
        const type = getSecondToLastParameterFromPath();
        const uuid = getLastParameterFromPath();
        setAssocType(type);
        setAssocUuid(uuid);
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>Bild hinzufügen</HeadlineStyled>
            <BaseForm postFunction={postImage}>
                <input type="hidden" name="assocType" defaultValue={assocType} />
                <input type="hidden" name="assocUuid" defaultValue={assocUuid} />
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
