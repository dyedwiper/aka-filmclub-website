import React, { useContext, useEffect, useState } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import VideoFormGroup from '../../common/forms/VideoFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { deleteVideo, getVideoByUuid, postVideo } from '../../utils/services/videoServices';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import LoadingPage from '../LoadingPage';

export default function EditVideoPage() {
    const [video, setVideo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getVideoByUuid(uuid).then((res) => {
            setVideo(res.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        document.title = 'Video bearbeiten | aka-Filmclub';
        setPageTitle('Video bearbeiten');
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postVideo} deleteFunction={deleteVideo} isEditing={true}>
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={video.uuid} />
                <VideoFormGroup video={video} />
            </BaseForm>
        </PageStyled>
    );
}
