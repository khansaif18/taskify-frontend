const formatDateTime = (dateTimeString) => {
    const [datePart, timePart] = dateTimeString.split(', ');

    const [day, month, year] = datePart.split('/').map(Number);

    const date = new Date(year, month - 1, day);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[date.getDay()];
    const monthName = months[month - 1];

    return `${dayName}, ${monthName} ${day} at ${timePart}`;
}

export default formatDateTime