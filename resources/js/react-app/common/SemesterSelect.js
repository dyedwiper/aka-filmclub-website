import React, { useEffect, useRef, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import styled from 'styled-components';
import { customSelectStyles } from '../styles/customSelectStyles';

export default function SemesterSelect({ setSemester, setIsLoading }) {
    const [semesterOptions, setSemesterOptions] = useState([]);

    const allSemesters = useRef([]);

    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const currentSemester = {
            //month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this
            season: currentMonth < 3 || currentMonth >= 9 ? 'ws' : 'ss',
            year: currentMonth < 3 ? currentYear - 1 : currentYear,
        };
        console.log(currentSemester);
        setSemester(currentSemester);
        allSemesters.current = computeAllSemesters(currentYear, currentMonth);
        console.log(computeSemesterOptions(allSemesters.current));
        setSemesterOptions(computeSemesterOptions(allSemesters.current));
    }, []);

    return (
        <SemesterSelectLabelStyled>
            Semester:
            <ReactSelect
                options={semesterOptions}
                defaultValue={semesterOptions[0]}
                onChange={handleSemesterChange}
                styles={customSelectStyles}
            />
        </SemesterSelectLabelStyled>
    );

    function computeAllSemesters(currentYear, currentMonth) {
        const allSemesters = [];
        allSemesters.push({ season: 'ws', year: 2000 });
        for (let year = 2001; year < currentYear; year++) {
            allSemesters.push({ season: 'ss', year: year });
            allSemesters.push({ season: 'ws', year: year });
        }
        //month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this
        if (currentMonth >= 3) {
            allSemesters.push({ season: 'ss', year: currentYear });
        }
        if (currentMonth >= 9) {
            allSemesters.push({ season: 'ws', year: currentYear });
        }
        return allSemesters.reverse();
    }

    function computeSemesterOptions(allSemesters) {
        const semesterOptions = [];
        allSemesters.forEach((semester) => {
            semesterOptions.push({
                label: semester.season.toUpperCase() + ' ' + semester.year,
                value: allSemesters.indexOf(semester),
            });
        });
        return semesterOptions;
    }

    function handleSemesterChange(option) {
        setSemester(allSemesters.current[option.value]);
        setIsLoading(true);
    }
}

const SemesterSelectLabelStyled = styled.label``;
