const firstDate = new Date(2022, 0, 1);
const lastDate = new Date(2022, 3, 30);
const times = ["Breakfast", "Lunch", "Dinner"];

const dateToSQLDateString = (date) => {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

export default function insertMeals(connection) {
    const mealsData = [];
    for (let mess = 1; mess <= 13; mess++) {
        for (let d = new Date(firstDate); d <= lastDate; d.setDate(d.getDate() + 1)) {
            for (let time = 0; time < 3; time++) {
                mealsData.push([
                    dateToSQLDateString(d),
                    mess,
                    (100 * mess) + (10 * d.getDay()) + time,
                    times[time],
                    null,
                ]);
            }
        }
    }
    const statement = "INSERT INTO meals (meal_date, mess_id, menu_id, meal_time, total_cost) VALUES ?";
    connection.query(statement, [mealsData], (err) => {
        if (err) {
            console.log("Error while inserting meals: ", err);
        } else {
            console.log("Meals inserted successfully");
        }
    });
}
