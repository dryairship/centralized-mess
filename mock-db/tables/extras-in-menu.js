import extras from '../data/extras.json' assert {type: "json"};

const numBreakfast = 10;
const numDaily = 20;
const numAll = extras.length;

const getRandomItem = () => {
    return numDaily + Math.floor((numAll - numDaily)*Math.random());
}

export default function insertExtrasInMenu(connection) {
    const extrasData = [];
    for (let mess = 1; mess <= 13; mess++) {
        for(let day = 0; day < 7; day++) {
            for(let time = 0; time < 3; time++) {
                for(let i = 0; i < numDaily; i++) {
                    if (time == 0 && i >= numBreakfast) {
                        break;
                    }
                    extrasData.push([
                        (mess * 100) + (day * 10) + time,
                        (mess * 100) + i,
                    ]);
                }
                if (time != 0) {
                    extrasData.push([
                        (mess * 100) + (day * 10) + time,
                        (mess * 100) + getRandomItem(),
                    ]);
                }
            }
        }
    }
    const statement = "INSERT INTO extras_in_menu (menu_id, item_id) VALUES ?";
    connection.query(statement, [extrasData], (err) => {
        if (err) {
            console.log("Error while inserting extras in menu: ", err);
        } else {
            console.log("Extras in menu inserted successfully");
        }
    });
    return extrasData;
}
