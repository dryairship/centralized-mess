import menus from '../data/menus.json' assert {type: "json"};

export default function insertMenus(connection) {
    const menusData = [];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const times = ["Breakfast", "Lunch", "Dinner"];
    for (let mess = 1; mess <= 13; mess++) {
        for (let day = 0; day < days.length; day++) {
            for (let time = 0; time < times.length; time++) {
                menusData.push([
                    (mess * 100) + (day * 10) + time,
                    "April " + days[day] + " " + times[time],
                    mess,
                    times[time],
                    menus[times[time]][(day+mess) % menus[times[time]].length],
                ]);
            }
        }
    }
    const statement = "INSERT INTO menus (menu_id, menu_name, mess_id, menu_time, contents) VALUES ?";
    connection.query(statement, [menusData], (err) => {
        if (err) {
            console.log("Error while inserting menus: ", err);
        } else {
            console.log("Menus inserted successfully");
        }
    });
}
