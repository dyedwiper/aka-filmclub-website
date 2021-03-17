import React, { useContext, useEffect } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import VideoFormGroup from '../../common/forms/VideoFormGroup';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { postVideo } from '../../utils/videoServices';

export default function AddVideoPage() {
    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Video hinzufügen | aka-Filmclub';
        setPageTitle('Video hinzufügen');
    }, []);

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <BaseForm postFunction={postVideo}>
                <VideoFormGroup />
            </BaseForm>
        </PageStyled>
    );
}
