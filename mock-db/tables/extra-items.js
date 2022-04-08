import extras from '../data/extras.json' assert {type: "json"};

const plusMinusTenPercent = (price) => {
    let randomValue = Math.random();
    if(randomValue < 0.33) {
        return Math.round(0.9 * price);
    } else if (randomValue < 0.67) {
        return  price;
    } else {
        return Math.round(1.1 * price);
    }
}

export default function insertExtraItems(connection) {
    const extrasData = [];
    for (let mess = 1; mess <= 13; mess++) {
        for (let i = 0; i < extras.length; i++) {
            extrasData.push([
                (mess * 100) + i,
                extras[i][0],
                mess,
                plusMinusTenPercent(extras[i][1])
            ]);
        }
    }
    const statement = "INSERT INTO extra_items (item_id, item_name, mess_id, cost_per_item) VALUES ?";
    connection.query(statement, [extrasData], (err) => {
        if (err) {
            console.log("Error while inserting extra items: ", err);
        } else {
            console.log("Extra items inserted successfully");
        }
    });
    return extrasData;
}
