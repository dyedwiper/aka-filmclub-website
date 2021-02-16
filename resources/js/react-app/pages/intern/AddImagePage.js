import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import { PageStyled } from '../../common/styledElements';
import { postImage } from '../../utils/imageServices';

export default function AddImagePage() {
    const [assocType, setAssocType] = useState('');
    const [assocUuid, setAssocUuid] = useState({});

    useEffect(() => {
        const path = window.location.pathname;
        const type = path.slice(path.lastIndexOf('/', path.lastIndexOf('/') - 1) + 1, path.lastIndexOf('/'));
        const uuid = path.slice(path.lastIndexOf('/') + 1);
        setAssocType(type);
        setAssocUuid(uuid);
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>Bild hinzufügen</HeadlineStyled>
            <BaseForm serviceFunction={postImage}>
                <input type="hidden" name="assocType" defaultValue={assocType} />
                <input type="hidden" name="assocUuid" defaultValue={assocUuid} />
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
