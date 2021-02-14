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
