import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import NoticeFormGroup from '../../common/forms/NoticeFormGroup';
import { PAGE_TITLE_EDIT_NOTICE, ROUTE_NEWS, ROUTE_NOTICE } from '../../constants';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { deleteNotice, getNoticeByUuid, postNotice } from '../../utils/services/noticeServices';
import LoadingPage from '../LoadingPage';

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
        <BasePage pageTitle={PAGE_TITLE_EDIT_NOTICE}>
            <HeadlineStyled>{PAGE_TITLE_EDIT_NOTICE}</HeadlineStyled>
            <BaseForm
                postFunction={postNotice}
                deleteFunction={deleteNotice}
                isEditing={true}
                postRedirectRoute={ROUTE_NOTICE + notice.uuid}
                deleteRedirectRoute={ROUTE_NEWS}
            >
                {/* HTML forms can't make PATCH requests. That's why the method is spoofed with this hidden input.
                See https://laravel.com/docs/8.x/blade#method-field */}
                <input name="_method" type="hidden" value="PATCH" />
                <input name="uuid" type="hidden" defaultValue={notice.uuid} />
                <NoticeFormGroup notice={notice} />
            </BaseForm>
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
