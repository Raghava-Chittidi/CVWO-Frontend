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
    const day = date.getDate();
    const month = months[date.getMonth()];

    let hour = date.getHours();
    let minute: string | number = date.getMinutes();
    let ampm = "AM";
    if (minute < 10) {
        minute = `0${minute}`;
    }

    if (hour > 12) {
        hour -= 12;
        ampm = "PM";
    }
    return `${month} ${day} at ${hour}:${minute} ${ampm}`;
};

export const usernameToColour = (str: string) => {
    let hash = 0;
    const arr = str.split("");
    for (const s of arr) {
        hash = s.charCodeAt(0) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 100%, 70%)`;
};

// Get time since post in terms of days or weeks
export const timeSincePost = (postedDate: string) => {
    const date = new Date(postedDate);
    const posted = moment(date, "DD-MM-YYYY");
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
