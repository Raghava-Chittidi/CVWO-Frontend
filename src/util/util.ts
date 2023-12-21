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
