const optionsComplete = {/*weekday: 'long', year: 'numeric',*/ month: 'long', day: 'numeric'};
const optionsOnlyDay = {/*weekday: 'long', year: 'numeric',* month: 'long',*/ day: 'numeric'};
export const formatOnlyDay = date => date.toLocaleDateString('fr-FR', optionsOnlyDay);
export const formatComplete = date => date.toLocaleDateString('fr-FR', optionsComplete);

export const hasSameMonth = (a, b) => a.getMonth() === b.getMonth();

export const notLastIndex = (index, array) => index < (array.length - 1);

export const hasMultipleDays = arrayOfDate => arrayOfDate.length > 1;

export const formatDateString = days => {
    return days.map((day, i) => {
        const current = new Date(day);
        if (notLastIndex(i, days)) {
            const next = new Date(days[i + 1]);
            if (hasSameMonth(current, next)) { return `${ formatOnlyDay(current) }`; }
        }
        return `${ formatComplete(current) }`;
    });
};

export const getFormatedDays = (startTime, endTime) => {
    /*const startDay = new Date(startTime);
    const endDay = new Date(endTime);

    if (startDay.getMonth() === endDay.getMonth()) {
        return `${startDay.toLocaleDateString('fr-FR', optionsOnlyDay)} - ${endDay.toLocaleDateString('fr-FR', optionsComplete)} `
    } else {
        return `${startDay.toLocaleDateString('fr-FR', optionsComplete)} - ${endDay.toLocaleDateString('fr-FR', optionsComplete)} `
    }*/
    if (typeof startTime === 'string' && typeof endTime === 'string') {
        const startDay = new Date(startTime);
        const endDay = new Date(endTime);

        if (hasSameMonth(startDay, endDay)) {
            return `${ formatOnlyDay(startDay) } - ${ formatComplete(endDay) } `;
        }
        return `${ formatComplete(startDay) } - ${ formatComplete(endDay) } `;
    } else {
        if (typeof startTime === 'undefined') startTime = [];
        if (typeof endTime === 'undefined') endTime = [];

        const allDate = formatDateString([...startTime, ...endTime]);
        const separator = !startTime.length || !endTime.length ? '' : ' et ';

        const lastDateOfStartTime = new Date(startTime[startTime.length - 1]);
        const beforeLastDateOfStartTime = new Date(startTime[startTime.length - 2]);

        if (hasMultipleDays(startTime) && !hasSameMonth(lastDateOfStartTime, beforeLastDateOfStartTime)) {
            const start = formatDateString(startTime).join(' - ');
            const end = formatDateString(endTime).join(' - ');

            return `${ start }${ separator }${ end }`;
        } else if (hasMultipleDays(startTime) || hasMultipleDays(endTime)) {
            const indexInsertSeparator = startTime.length;
            const start = allDate.slice(0, indexInsertSeparator).join(' - ');
            const end = allDate.slice(indexInsertSeparator + 1).join(' - ');

            return `${ start }${ separator }${ end }`;
        }
        return allDate.join(' - ');
    }
}