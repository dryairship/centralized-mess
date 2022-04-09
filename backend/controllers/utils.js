const getCurrentDate = () => {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
}

const isBreakfastTime = (date) => {
    return (date.getHours() == 7 && date.getMinutes() >= 30) || (date.getHours() == 8) || (date.getHours() == 9);
}

const isLunchTime = (date) => {
    return (date.getHours() == 12 && date.getMinutes() >= 30) || (date.getHours() == 13) || (date.getHours() == 14 && date.getMinutes() <= 30);
}

const isDinnerTime = (date) => {
    return (date.getHours() == 19 && date.getMinutes() >= 30) || (date.getHours() == 20) || (date.getHours() == 21 && date.getMinutes() <= 30);
}

const getCurrentMealTime = () => {
    const currentTime = new Date();
    if (isBreakfastTime(currentTime)) return "Breakfast";
    else if (isLunchTime(currentTime)) return "Lunch";
    else if (isDinnerTime(currentTime)) return "Dinner";
    else return null;
}

export default {
    getCurrentDate,
    getCurrentMealTime,
};
