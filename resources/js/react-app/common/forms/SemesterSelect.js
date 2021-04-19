import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import { semesterSelectStyles } from '../../styles/customSelectStyles';
import { computeSemesterOptions } from '../../utils/semesterUtils';

export default function SemesterSelect({ semester, setSemester, setIsLoading }) {
    const [semesterOptions, setSemesterOptions] = useState([]);

    useEffect(() => {
        setSemesterOptions(computeSemesterOptions());
    }, []);

    // Diese Bedingung ist notwendig, damit der defaultValue korrekt gesetzt wird.
    if (!semesterOptions.length) return <></>;

    return (
        <SemesterSelectStyled>
            <LabelStyled htmlFor="semesterSelect">Semester:</LabelStyled>
            <ReactSelect
                id="semesterSelect"
                options={semesterOptions}
                defaultValue={
                    semester.value
                        ? { label: semester.value.slice(0, 2) + ' ' + semester.value.slice(2), value: semester.value }
                        : semesterOptions[0]
                }
                onChange={handleSemesterChange}
                styles={semesterSelectStyles}
            />
        </SemesterSelectStyled>
    );

    function handleSemesterChange(option) {
        setSemester({ value: option.value });
        setIsLoading(true);
    }
}

const SemesterSelectStyled = styled.div``;

const LabelStyled = styled.label`
    margin-right: 20px;

    @media (max-width: 767px) {
        display: none;
    }
`;
