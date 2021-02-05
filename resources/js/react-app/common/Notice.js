import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getImageById } from '../utils/services';

export default function Notice({ notice }) {
    const [image, setImage] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getImageById(notice.image_id).then((res) => {
            setImage(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <></>;

    return (
        <NoticeStyled>
            <HorizontalLineStyled />
            <NoticeTitleStyled>{notice.title}</NoticeTitleStyled>
            {image.id && <NoticeImageStyled src={'/images/' + image.source} />}
            <NoticeContentStyled>{notice.content}</NoticeContentStyled>
        </NoticeStyled>
    );
}

const NoticeStyled = styled.article``;

const HorizontalLineStyled = styled.div`
    height: 10px;
    width: 80%;
    margin: 20px 0;
    background-color: var(--aka-gelb);
`;

const NoticeImageStyled = styled.img`
    filter: grayscale();
`;

const NoticeTitleStyled = styled.h3``;

const NoticeContentStyled = styled.p``;
