import React, { useEffect, useState } from 'react';
import { PageStyled } from '../../common/styledElements';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import styled from 'styled-components';
import { getImageByUuid, patchImage } from '../../utils/imageServices';

export default function EditImagePage() {
    const [image, setImage] = useState({});

    useEffect(() => {
        const path = window.location.pathname;
        const imageUuid = path.slice(path.lastIndexOf('/') + 1);
        console.log(imageUuid);
        getImageByUuid(imageUuid).then((res) => {
            console.log(res.data);
            setImage(res.data);
        });
    }, []);

    return (
        <PageStyled>
            <HeadlineStyled>Bild ändern</HeadlineStyled>
            <BaseForm serviceFunction={patchImage}>
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                {/* <input name="_method" type="hidden" value="PATCH" /> */}
                <input name="associatedEntity" type="hidden" defaultValue="serial" />
                <input name="uuid" type="hidden" defaultValue={image.uuid} />
                <ImageFormGroup image={image} />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
