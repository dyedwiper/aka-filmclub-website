import { SUMMER_SEASON_IDENTIFIER, WINTER_SEASON_IDENTIFIER } from '../constants';

export function computeCurrentSemester() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentSemester = {};

    // month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this.
    if (currentMonth >= 3 && currentMonth < 9) {
        currentSemester.name = SUMMER_SEASON_IDENTIFIER + currentYear;
        // The year 2000 in the Date constructor is a completely random initial value. It is overwritten anyway.
        currentSemester.endDate = new Date('2000-10-01');
        currentSemester.endDate.setFullYear(currentYear);
    } else if (currentMonth >= 9) {
        currentSemester.name = WINTER_SEASON_IDENTIFIER + currentYear;
        currentSemester.endDate = new Date('2000-04-01');
        currentSemester.endDate.setFullYear(currentYear + 1);
    } else {
        currentSemester.name = WINTER_SEASON_IDENTIFIER + (currentYear - 1);
        currentSemester.endDate = new Date('2000-04-01');
        currentSemester.endDate.setFullYear(currentYear);
    }

    return currentSemester;
}

export function computeSemesterOptions() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const allSemesters = [];
    for (let year = 1998; year < currentYear; year++) {
        allSemesters.push({ season: SUMMER_SEASON_IDENTIFIER, year: year });
        allSemesters.push({ season: WINTER_SEASON_IDENTIFIER, year: year });
    }
    // Month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this.
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
