import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import { semesterSelectStyles } from '../styles/customSelectStyles';

export default function SemesterSelect({ setSemester, setIsLoading }) {
    const SUMMER_SEASON_IDENTIFIER = 'SS';
    const WINTER_SEASON_IDENTIFIER = 'WS';

    const [semesterOptions, setSemesterOptions] = useState([]);

    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        // const currentSemester = {
        //     //month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this
        //     season: currentMonth < 3 || currentMonth >= 9 ? 'ws' : SUMMER_SEASON_IDENTIFIER,
        //     year: currentMonth < 3 ? currentYear - 1 : currentYear,
        // };

        //month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this
        if (currentMonth >= 3 && currentMonth < 9) {
            setSemester(SUMMER_SEASON_IDENTIFIER + currentYear);
        } else if (currentMonth >= 9) {
            setSemester(WINTER_SEASON_IDENTIFIER + currentYear);
        } else {
            setSemester(WINTER_SEASON_IDENTIFIER + (currentYear - 1));
        }
        console.log(computeSemesterOptions(currentYear, currentMonth));
        setSemesterOptions(computeSemesterOptions(currentYear, currentMonth));
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

    function computeSemesterOptions(currentYear, currentMonth) {
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
