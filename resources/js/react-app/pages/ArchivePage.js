import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import { PageStyled } from '../common/styledElements';
import { getScreeningsBySemester } from '../utils/services';
import LoadingPage from './LoadingPage';
import { default as ReactSelect } from 'react-select';

export default function ArchivePage() {
    const [screenings, setScreenings] = useState([]);
    const [semester, setSemester] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const allSemesters = useRef([]);
    const SemesterOptions = useRef([]);

    useEffect(() => {
        document.title = 'Archiv | aka-Filmclub ';
    });

    useEffect(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const currentSemester = {
            //month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this
            season: currentMonth < 3 || currentMonth >= 9 ? 'ws' : 'ss',
            year: currentMonth < 3 ? currentYear - 1 : currentYear,
        };
        setSemester(currentSemester);
        allSemesters.current = computeAllSemesters(currentYear, currentMonth);
        SemesterOptions.current = computeSemesterOptions(allSemesters.current);
    }, []);

    useEffect(() => {
        if (semester.year) {
            getScreeningsBySemester(semester).then((res) => {
                setScreenings(res.data);
                setIsLoading(false);
            });
        }
    }, [semester]);

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'var(--aka-gelb)' : 'white',
            color: 'black',
        }),
        container: (provided) => ({
            ...provided,
            display: 'inline-block',
            width: '150px',
            marginLeft: '20px',
        }),
    };

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <HeadlineStyled>Programmarchiv</HeadlineStyled>
            <SemesterSelectLabelStyled>
                Semester:
                <ReactSelect
                    options={SemesterOptions.current}
                    styles={customStyles}
                    defaultValue={SemesterOptions.current[0]}
                    onChange={handleSemesterChange}
                />
            </SemesterSelectLabelStyled>
            <ScreeningsListStyled>
                {screenings.map((screening) => (
                    <ScreeningsListItem key={screening.uuid} screening={screening} />
                ))}
            </ScreeningsListStyled>
        </PageStyled>
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
    }
}

const HeadlineStyled = styled.h2``;

const SemesterSelectLabelStyled = styled.label``;

const SemesterSelectStyled = styled.select`
    margin-left: 10px;
    padding: 5px 15px;
`;

const SemesterOptionStyled = styled.option`
    &:hover,
    &:focus {
        box-shadow: 0 0 10px 100px var(--aka-gelb) inset;
    }
`;

const ScreeningsListStyled = styled.ul``;
