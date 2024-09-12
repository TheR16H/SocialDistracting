const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const advancedFormat = require('dayjs/plugin/advancedFormat');

// Load the plugins
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

// Function to add date suffix
const addDateSuffix = (date) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const day = date % 100;
    return day + (suffixes[(day - 20) % 10] || suffixes[day] || suffixes[0]);
};

// Function to format a timestamp using Day.js
module.exports = (timestamp, { monthLength = "short", dateSuffix = true } = {}) => {
    const months = monthLength === "short" 
        ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dateObj = dayjs(timestamp); // Create a Day.js object
    const formattedMonth = months[dateObj.month()]; // Get the month
    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.date()) : dateObj.date(); // Get the day with or without suffix
    const year = dateObj.year(); // Get the year
    const hour = dateObj.format('h'); // Get the hour in 12-hour format
    const minutes = dateObj.format('mm'); // Get the minutes
    const periodOfDay = dateObj.format('A').toLowerCase(); // Get 'am' or 'pm'

    return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
};

module.exports = dayjs;
