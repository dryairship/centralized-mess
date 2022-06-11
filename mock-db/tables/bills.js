import students from '../data/students.json' assert {type: "json"}; 

const firstDate = new Date(2022, 2, 1);
const lastDate = new Date(2022, 3, 17);

const numBreakfast = 10;
const numDaily = 20;

const times = ["Breakfast", "Lunch", "Dinner"];
const hours = [8, 13, 20];

const dateToSQLDateString = (date) => {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

const plusMinusTwentyPercent = (price) => {
    let randomValue = Math.random();
    return price * (1 + 0.4*(0.5 - randomValue));
}

const getStudentRolls = () => {
    const emails = {};
    const rolls = {};
    return students
        .filter((student) => student.u !== '')
        .filter((student) => {
            if (rolls[student.i] || emails[student.u.toLowerCase()] || student.u.length > 18)
                return false;
            rolls[student.i] = true;
            emails[student.u.toLowerCase()] = true;
            return true;
        })
        .map((student) => student.i)
        .filter((roll) => (roll.length == 6) && roll.startsWith("18"));
}

const parseExtrasArray = (extrasArray) => {
    const extrasDict = {};
    const n = extrasArray.length;

    for (let i = 0; i < n; i++) {
        if (extrasArray[i][0] in extrasDict) {
            extrasDict[extrasArray[i][0]].push(extrasArray[i][1]);
        } else {
            extrasDict[extrasArray[i][0]] = [ extrasArray[i][1] ];
        }
    }

    return extrasDict;
}

const parseExtrasPrices = (extrasData) => {
    const extrasPrices = {};
    const n = extrasData.length;

    for (let i = 0; i < n; i++) {
        if(!extrasPrices[extrasData[i][2]]) extrasPrices[extrasData[i][2]] = {};
        extrasPrices[extrasData[i][2]][extrasData[i][0]] = extrasData[i][3];
    }
    return extrasPrices;
}

const mealCostsDict = {};

const getMealCost = (messId, mealDate, mealTime) => {
    if(!mealCostsDict[messId]) mealCostsDict[messId] = {};
    if(!mealCostsDict[messId][mealDate]) mealCostsDict[messId][mealDate] = {};
    if(!mealCostsDict[messId][mealDate][mealTime]) mealCostsDict[messId][mealDate][mealTime] = plusMinusTwentyPercent(25);
    return mealCostsDict[messId][mealDate][mealTime];
}

export default function insertBills(connection, extrasInMenuArray, extrasDataArray) {
    const studentRolls = getStudentRolls();
    const numRolls = studentRolls.length;
    
    const extrasDict = parseExtrasArray(extrasInMenuArray);
    const extrasPrices = parseExtrasPrices(extrasDataArray);

    for (let d = new Date(firstDate); d <= lastDate; d.setDate(d.getDate() + 1)) {
        for (let time = 0; time < 3; time++) {
            const dateString = dateToSQLDateString(d);
            const basicBillsData = [];
            const extraBillsData = [];

            for (let i = 0; i < numRolls; i++) {
                let mess = Math.ceil(13 * Math.random());
                basicBillsData.push([
                    new Date(d).setHours(hours[time], 0, 0, i),
                    studentRolls[i],
                    mess,
                    dateString,
                    times[time],
                    getMealCost(mess, dateString, time),
                ]);
                if (Math.random() < 0.3) {
                    const mealId = (100 * mess) + (10 * d.getDay()) + time;
                    const itemId = (time == 0)
                                    ? extrasDict[mealId][Math.floor(numBreakfast * Math.random())]
                                    : extrasDict[mealId][Math.floor((numDaily + 1) * Math.random())]
                    extraBillsData.push([
                        new Date(d).setHours(hours[time], 10, 0, i),
                        studentRolls[i],
                        mess,
                        dateString,
                        times[time],
                        itemId,
                        1,
                        true,
                        extrasPrices[mess][itemId],
                    ]);
                }
            }
            const statement1 = "INSERT INTO basic_menu_bills (time_id, roll_number, mess_id, meal_date, meal_time, cost) VALUES ?";
            connection.query(statement1, [basicBillsData], ((date, time) => { return function callback(err) {
                if (err) {
                    console.log("Error while inserting basic menu bills: ", err);
                } else {
                    console.log(`Basic menu Bills inserted successfully: ${date} - ${time}`);
                }
            }})(d, time));

            const statement2 = "INSERT INTO extra_items_bills (time_id, roll_number, mess_id, meal_date, meal_time, item_id, quantity, claimed, cost) VALUES ?";
            connection.query(statement2, [extraBillsData], ((date, time) => { return function callback(err) {
                if (err) {
                    console.log("Error while inserting extra menu bills: ", err);
                } else {
                    console.log(`Extra menu Bills inserted successfully: ${date} - ${time}`);
                }
            }})(d, time));
        }
    }
}
