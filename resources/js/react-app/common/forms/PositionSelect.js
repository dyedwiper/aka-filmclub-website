import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import { positionSelectStyles } from '../../styles/customSelectStyles';
import { getFaqs } from '../../utils/faqServices';
import { getVideos } from '../../utils/videoServices';

export default function PositionSelect({ type, defaultPosition, disabled }) {
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
        console.log(defaultPosition);
        setPositionOptions(options);
        setIsLoading(false);
    }, [items]);

    if (isLoading) return <LoadingNoteStyled>Am Laden...</LoadingNoteStyled>;

    return (
        <ReactSelect
            name="position"
            options={positionOptions}
            isDisabled={disabled}
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
