import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import { semesterSelectStyles } from '../styles/customSelectStyles';
import { computeCurrentSemester, computeSemesterOptions } from '../utils/semesterUtils';

export default function SemesterSelect({ setSemester, setIsLoading }) {
    const [semesterOptions, setSemesterOptions] = useState([]);

    useEffect(() => {
        setSemester(computeCurrentSemester());
        setSemesterOptions(computeSemesterOptions());
    }, []);

    return (
        <SemesterSelectLabelStyled>
            Semester:
            <ReactSelect
                options={semesterOptions}
                defaultValue={semesterOptions[0]}
                onChange={handleSemesterChange}
                styles={semesterSelectStyles}
            />
        </SemesterSelectLabelStyled>
    );

    function handleSemesterChange(option) {
        setSemester(option.value);
        setIsLoading(true);
    }
}

const SemesterSelectLabelStyled = styled.label``;
