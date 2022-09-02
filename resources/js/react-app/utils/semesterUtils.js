import { SUMMER_SEASON_IDENTIFIER, WINTER_SEASON_IDENTIFIER, YEAR_OF_FIRST_LISTED_SCREENING } from '../constants';

export function computeSemester(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const semester = {};

    // Month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this.
    // The year 2000 in the Date constructor is a random initial value. It is overwritten anyway.
    if (month >= 3 && month < 9) {
        semester.name = SUMMER_SEASON_IDENTIFIER + year;
        semester.endDate = new Date('2000-10-01');
        semester.endDate.setFullYear(year);
    } else if (month >= 9) {
        semester.name = WINTER_SEASON_IDENTIFIER + year;
        semester.endDate = new Date('2000-04-01');
        semester.endDate.setFullYear(year + 1);
    } else {
        semester.name = WINTER_SEASON_IDENTIFIER + (year - 1);
        semester.endDate = new Date('2000-04-01');
        semester.endDate.setFullYear(year);
    }

    return semester;
}

export function computeSemesterOptions({ isIncludingNextSemester = false }) {
    const currentDate = new Date();
    const semesters = computePastSemesters(currentDate);
    semesters.push(computeCurrentSemester(currentDate));
    if (isIncludingNextSemester) {
        semesters.push(computeNextSemester(currentDate));
    }
    return buildSemesterOptions(semesters);
}

export function computeEndDateOfSemester(semesterName) {
    // The year 2000 in the Date constructor is a random initial value. It is overwritten anyway.
    const endDate = new Date('2000-10-01');
    const currentMonth = new Date().getMonth();
    const seasonIdentifier = semesterName.slice(0, 2);
    const year = Number(semesterName.slice(2));
    // Remember: Month is zero-based in JavaScript (Jan = 0, Feb = 1, ...).
    if (seasonIdentifier === 'SS') {
        endDate.setFullYear(year);
    } else if (seasonIdentifier === 'WS' && currentMonth >= 9) {
        endDate.setMonth(3);
    } else {
        endDate.setFullYear(year + 1);
        endDate.setMonth(3);
    }
    return endDate;
}

function computePastSemesters(currentDate) {
    const currentYear = currentDate.getFullYear();
    const allSemesters = [];
    for (let year = YEAR_OF_FIRST_LISTED_SCREENING; year < currentYear; year++) {
        allSemesters.push({ season: SUMMER_SEASON_IDENTIFIER, year: year });
        allSemesters.push({ season: WINTER_SEASON_IDENTIFIER, year: year });
    }
    return allSemesters;
}

function computeCurrentSemester(currentDate) {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let currentSemester;
    // Month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this.
    if (currentMonth >= 3) {
        currentSemester = { season: SUMMER_SEASON_IDENTIFIER, year: currentYear };
    }
    if (currentMonth >= 9) {
        currentSemester = { season: WINTER_SEASON_IDENTIFIER, year: currentYear };
    }
    return currentSemester;
}

function computeNextSemester(currentDate) {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let nextSemester;
    // Month is zero-based in JavaScript (Jan = 0, Feb = 1, ...), that's why the conditions look like this.
    if (currentMonth >= 3) {
        nextSemester = { season: WINTER_SEASON_IDENTIFIER, year: currentYear };
    }
    if (currentMonth >= 9) {
        nextSemester = { season: SUMMER_SEASON_IDENTIFIER, year: currentYear + 1 };
    }
    return nextSemester;
}

function buildSemesterOptions(semesters) {
    const semesterOptions = [];
    semesters.reverse().forEach((semester) => {
        semesterOptions.push({
            label: semester.season + ' ' + semester.year,
            value: semester.season + semester.year,
        });
    });
    return semesterOptions;
}
