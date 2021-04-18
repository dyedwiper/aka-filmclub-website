import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import { positionSelectStyles } from '../../styles/customSelectStyles';
import { getFaqs } from '../../utils/services/faqServices';
import { getVideos } from '../../utils/services/selfmadeFilmServices';

export default function PositionSelect({ type, defaultPosition }) {
    const [positionOptions, setPositionOptions] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (type === 'faq') {
            getFaqs().then((res) => {
                setItems(res.data);
            });
        } else if (type === 'video') {
            getVideos().then((res) => {
                setItems(res.data);
            });
        }
    }, []);

    useEffect(() => {
        const options = [];
        for (let i = 0; i < items.length; i++) {
            options.push({ label: i + 1, value: i });
        }
        setPositionOptions(options);
        setIsLoading(false);
    }, [items]);

    if (isLoading) return <LoadingNoteStyled>Am Laden...</LoadingNoteStyled>;

    return (
        <ReactSelect
            name="position"
            options={positionOptions}
            defaultValue={{ value: defaultPosition, label: defaultPosition + 1 }}
            styles={positionSelectStyles}
        />
    );
}

const LoadingNoteStyled = styled.div`
    display: grid;
    align-items: center;
    height: 40px;
`;
