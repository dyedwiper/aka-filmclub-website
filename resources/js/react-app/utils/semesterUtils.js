import { SUMMER_SEASON_IDENTIFIER, WINTER_SEASON_IDENTIFIER } from '../constants';

export function computeCurrentSemester() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    let currentSemester;

    //month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this
    if (currentMonth >= 3 && currentMonth < 9) {
        currentSemester = SUMMER_SEASON_IDENTIFIER + currentYear;
    } else if (currentMonth >= 9) {
        currentSemester = WINTER_SEASON_IDENTIFIER + currentYear;
    } else {
        currentSemester = WINTER_SEASON_IDENTIFIER + (currentYear - 1);
    }

    return currentSemester;
}

export function computeSemesterOptions() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const allSemesters = [];
    allSemesters.push({ season: 'WS', year: 2000 });
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
