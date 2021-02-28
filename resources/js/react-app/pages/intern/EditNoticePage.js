import React, { useEffect, useState } from 'react';
import BaseForm from '../../common/forms/BaseForm';
import { PageStyled } from '../../common/styledElements';
import { deleteNotice, postNotice } from '../../utils/noticeServices';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getNoticeByUuid } from '../../utils/noticeServices';
import LoadingPage from '../LoadingPage';
import NoticeFormGroup from '../../common/forms/NoticeFormGroup';
import styled from 'styled-components';

export default function EditNoticePage() {
    const [notice, setNotice] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getNoticeByUuid(uuid).then((res) => {
            setNotice(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <HeadlineStyled>News bearbeiten</HeadlineStyled>
            <BaseForm postFunction={postNotice} deleteFunction={deleteNotice} isEditing={true}>
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={notice.uuid} />
                <NoticeFormGroup notice={notice} />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
