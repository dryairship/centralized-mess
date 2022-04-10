import basicMenuBillsTable from "../../db/basic-menu-bills.js";
import extraItemsBillsTable from "../../db/extra-items-bills.js";

const handleGetStudentBills = async (req, res) => {
    const rollNumber = req.session.rollNumber;
    const basicBills = await basicMenuBillsTable.findBasicMenuBillsForStudent(rollNumber);
    const extrasBills = await extraItemsBillsTable.findExtraItemsBillsForStudent(rollNumber);
    res.status(200).json({
        basicBills: basicBills,
        extrasBills: extrasBills,
    });
}
export default {
    handleGetStudentBills,
}
