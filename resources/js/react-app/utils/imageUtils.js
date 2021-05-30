import { computeEndDateOfSemester, computeSemester } from './semesterUtils';

export function showScreeningImage(screening) {
    if (!screening.image) return false;
    if (screening.image.keepShowingAfterSemester) return true;
    if (new Date(screening.date.replace(' ', 'T')) > new Date()) return true;
    return false;
}

export function showSerialImage(serial) {
    if (!serial.image) return false;
    if (serial.image.keepShowingAfterSemester) return true;
    const endDateOfSemester = computeEndDateOfSemester(serial.semester);
    if (endDateOfSemester > new Date()) return true;
    return false;
}

export function showNoticeImage(notice) {
    if (!notice.image) return false;
    if (notice.image.keepShowingAfterSemester) return true;
    const semester = computeSemester(new Date(notice.date.replace(' ', 'T')));
    if (semester.endDate > new Date()) return true;
    return false;
}
