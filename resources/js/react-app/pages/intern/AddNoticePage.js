import React from 'react';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import NoticeFormGroup from '../../common/forms/NoticeFormGroup';
import { PAGE_TITLE_ADD_NOTICE, ROUTE_NEWS } from '../../constants';
import { postNotice } from '../../utils/services/noticeServices';

export default function AddNoticePage() {
    return (
        <BasePage pageTitle={PAGE_TITLE_ADD_NOTICE}>
            <HeadlineStyled>{PAGE_TITLE_ADD_NOTICE}</HeadlineStyled>
            <BaseForm postFunction={postNotice} postRedirectRoute={ROUTE_NEWS}>
                <NoticeFormGroup />
                <hr />
                <ImageFormGroup />
            </BaseForm>
        </BasePage>
    );
}

const HeadlineStyled = styled.h2``;
