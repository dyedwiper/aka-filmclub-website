import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import { PageStyled } from '../../common/styledElements';
import { ROUTE_NOTICE, ROUTE_SCREENING, ROUTE_SERIAL, STORAGE_FOLDER } from '../../constants';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { deleteImage, getImageByUuid, postImage } from '../../utils/services/imageServices';
import LoadingPage from '../LoadingPage';

export default function EditImagePage() {
    const [image, setImage] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [redirectRoute, setRedirectRoute] = useState('');

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getImageByUuid(uuid).then((res) => {
            setImage(res.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if (image.notice) {
            setRedirectRoute(ROUTE_NOTICE + image.notice.uuid);
        } else if (image.screening) {
            setRedirectRoute(ROUTE_SCREENING + image.screening.uuid);
        } else if (image.serial) {
            setRedirectRoute(ROUTE_SERIAL + image.serial.uuid);
        }
    }, [image]);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <HeadlineStyled>Bild ändern</HeadlineStyled>
            <ImageStyled src={STORAGE_FOLDER + image.path} />
            <HintStyled>(Das ist das momentan gespeicherte Bild und keine Vorschau des hochgeladenen.)</HintStyled>
            <BaseForm
                postFunction={postImage}
                deleteFunction={deleteImage}
                isEditing={true}
                postRedirectRoute={redirectRoute}
                deleteRedirectRoute={redirectRoute}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={image.uuid} />
                <ImageFormGroup image={image} />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

const ImageStyled = styled.img`
    max-width: 320px;
`;

const HintStyled = styled.div`
    font-size: 0.7em;
`;
