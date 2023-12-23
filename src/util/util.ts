import moment from "moment";

export const formatDate = (oldDate: string) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const date = new Date(oldDate);
    const d = date.getDate();
    const m = months[date.getMonth()];

    let hr = date.getHours();
    let min: string | number = date.getMinutes();
    if (min < 10) {
        min = "0" + min.toString();
    }
    let ampm = "AM";
    if (hr > 12) {
        hr -= 12;
        ampm = "PM";
    }
    return `${m} ${d} at ${hr}:${min} ${ampm}`;
};

/* eslint-disable no-bitwise */
export const stringToColour = (str: string) => {
    let hash = 0;
    str.split("").forEach((char) => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += value.toString(16).padStart(2, "0");
    }
    return colour;
};
/* eslint-enable no-bitwise */

export const timeSincePost = (postedDate: string) => {
    const d = new Date(postedDate);
    const posted = moment(d, "DD-MM-YYYY");
    const cur = moment(new Date(), "DD-MM-YYYY");
    const weeks = cur.diff(posted, "week");
    if (weeks === 0) {
        const days = cur.diff(posted, "day");
        if (days === 0) {
            const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
            const t = moment(todayStart, "DD-MM-YYYY");
            if (posted.diff(t, "minute") >= 0) {
                return "Today";
            } else {
                return "1d";
            }
        }
        return `${days}d`;
    }
    return `${weeks}w`;
};
