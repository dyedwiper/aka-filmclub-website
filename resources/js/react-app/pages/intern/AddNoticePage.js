import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import NoticeFormGroup from '../../common/forms/NoticeFormGroup';
import { HorizontalRuleStyled, PageStyled } from '../../common/styledElements';
import { postNotice } from '../../utils/services/noticeServices';

export default function AddNoticePage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue News anlegen</HeadlineStyled>
            <BaseForm postFunction={postNotice}>
                <NoticeFormGroup />
                <HorizontalRuleStyled />
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
