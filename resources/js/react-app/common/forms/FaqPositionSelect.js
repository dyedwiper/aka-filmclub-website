import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import { positionSelectStyles } from '../../styles/customSelectStyles';
import { getFaqs } from '../../utils/faqServices';

export default function FaqPositionSelect({ defaultPosition, disabled }) {
    const [positionOptions, setPositionOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFaqs().then((res) => {
            const numberOfFaqs = res.data.length;
            const options = [];
            for (let i = 0; i < numberOfFaqs; i++) {
                options.push({ label: i + 1, value: i });
            }
            setPositionOptions(options);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingNoteStyled>Am Laden...</LoadingNoteStyled>;

    return (
        <ReactSelect
            name="position"
            options={positionOptions}
            isDisabled={disabled}
            defaultValue={positionOptions[defaultPosition]}
            styles={positionSelectStyles}
        />
    );
}

const LoadingNoteStyled = styled.div`
    display: grid;
    align-items: center;
    height: 40px;
`;
