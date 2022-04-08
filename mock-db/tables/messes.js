export default function insertMesses(connection) {
    const messData = [];
    for (let i = 1; i <= 13; i++) {
        messData.push([i, `Hall ${i} Mess`]);
    }
    const statement = "INSERT INTO messes (mess_id, name) VALUES ?";
    connection.query(statement, [messData], (err) => {
        if (err) {
            console.log("Error while inserting messes: ", err);
        } else {
            console.log("Messes inserted successfully");
        }
    });
}
