import React from 'react';
import styled from 'styled-components';
import BaseForm from '../../common/forms/BaseForm';
import ImageFormGroup from '../../common/forms/ImageFormGroup';
import NoticeFormGroup from '../../common/forms/NoticeFormGroup';
import { HorizontalLineStyled, PageStyled } from '../../common/styledElements';
import { postNotice } from '../../utils/noticeServices';

export default function AddNoticePage() {
    return (
        <PageStyled>
            <HeadlineStyled>Neue News anlegen</HeadlineStyled>
            <BaseForm serviceFunction={postNotice}>
                <NoticeFormGroup />
                <HorizontalLineStyled />
                <ImageFormGroup />
            </BaseForm>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;
