import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import UpdateInfo from '../../common/misc/UpdateInfo';
import { PAGE_TITLE_EDIT_IMAGE, ROUTE_NOTICE, ROUTE_SCREENING, ROUTE_SERIAL, STORAGE_FOLDER } from '../../constants';
import { deleteImage, getImageByUuid, postImage } from '../../services/imageServices';
import LoadingPage from '../LoadingPage';

export default function EditImagePage() {
    const [image, setImage] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [redirectRoute, setRedirectRoute] = useState('');

    const { uuid } = useParams();

    useEffect(() => {
        getImageByUuid(uuid).then((res) => {
            setImage(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

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
        <BasePage pageTitle={PAGE_TITLE_EDIT_IMAGE}>
            <HeadlineStyled>{PAGE_TITLE_EDIT_IMAGE}</HeadlineStyled>
            <ImageStyled src={STORAGE_FOLDER + image.path} alt={image.alt_text} />
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
            <UpdateInfo entity={image} />
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;

const ImageStyled = styled.img`
    max-width: 280px;
`;

const HintStyled = styled.div`
    font-size: 0.7em;
`;
