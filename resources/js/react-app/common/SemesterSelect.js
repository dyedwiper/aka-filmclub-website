import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import { semesterSelectStyles } from '../styles/customSelectStyles';
import { SUMMER_SEASON_IDENTIFIER, WINTER_SEASON_IDENTIFIER } from '../constants';
import { computeCurrentSemester } from '../utils/computeCurrentSemester';

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

    function computeSemesterOptions() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const allSemesters = [];
        allSemesters.push({ season: 'ws', year: 2000 });
        for (let year = 2001; year < currentYear; year++) {
            allSemesters.push({ season: SUMMER_SEASON_IDENTIFIER, year: year });
            allSemesters.push({ season: WINTER_SEASON_IDENTIFIER, year: year });
        }
        //month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this
        if (currentMonth >= 3) {
            allSemesters.push({ season: SUMMER_SEASON_IDENTIFIER, year: currentYear });
        }
        if (currentMonth >= 9) {
            allSemesters.push({ season: WINTER_SEASON_IDENTIFIER, year: currentYear });
        }

        const semesterOptions = [];
        allSemesters.reverse().forEach((semester) => {
            semesterOptions.push({
                label: semester.season + ' ' + semester.year,
                value: semester.season + semester.year,
            });
        });
        return semesterOptions;
    }

    function handleSemesterChange(option) {
        setSemester(option.value);
        setIsLoading(true);
    }
}

const SemesterSelectLabelStyled = styled.label``;
