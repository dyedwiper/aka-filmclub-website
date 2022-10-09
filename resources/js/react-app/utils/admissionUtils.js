export function calculateSemesterTicketsCount(billings) {
    let sum = 0;
    billings.forEach((billing) => {
        sum += billing.ticketsCount;
    });
    return sum;
}

export function calculateSemesterPassesCount(billings) {
    let count = 0;
    billings.forEach((billing) => {
        count += billing.passesCount;
    });
    return count;
}

export function calculateSemesterFreeTicketsCount(billings) {
    let count = 0;
    billings.forEach((billing) => {
        count += billing.freeTickets;
    });
    return count;
}

export function calculateAverageAdmissions(billings) {
    let count = 0;
    billings.forEach((billing) => {
        count += billing.ticketsCount + billing.freeTickets;
    });
    return count / billings.length;
}

export function calculateSemesterBalance(billings) {
    let sum = 0;
    billings.forEach((billing) => {
        sum += Number(billing.balance);
    });
    return sum;
}

export function getWeekdayValues(billings) {
    const weekdayValues = [
        { nameOfDay: 'So', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
        { nameOfDay: 'Mo', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
        { nameOfDay: 'Di', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
        { nameOfDay: 'Mi', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
        { nameOfDay: 'Do', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
        { nameOfDay: 'Fr', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
        { nameOfDay: 'Sa', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
    ];
    weekdayValues.forEach((weekdayValue) => {
        const weekdayBillings = billings.filter(
            (billing) => new Date(billing.screeningDate).getDay() === weekdayValues.indexOf(weekdayValue)
        );
        weekdayValue.numberOfScreenings = weekdayBillings.length;
        weekdayValue.averageAdmissions = calculateAverageAdmissions(weekdayBillings);
        weekdayValue.balance = calculateSemesterBalance(weekdayBillings);
    });
    return weekdayValues;
}
