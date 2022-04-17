import basicMenuBillsTable from "../../db/basic-menu-bills.js";
import extraItemsBillsTable from "../../db/extra-items-bills.js";
import studentsTable from "../../db/students.js";

const handleGetStudentBills = async (req, res) => {
    const rollNumber = req.body.rollNumber;
    let studentInfo = await studentsTable.findStudentWithRollNumber(rollNumber);
    const basicBills = await basicMenuBillsTable.findBasicMenuBillsForStudentAndMess(rollNumber, req.session.messId);
    const extrasBills = await extraItemsBillsTable.findExtraItemsBillsForStudentAndMess(rollNumber, req.session.messId);
    if (studentInfo.length != 1) {
        res.status(404).json({
            message: "Student Not Found",
        });
    } else {
        studentInfo = studentInfo[0];
        studentInfo.password = undefined;
        res.status(200).json({
            studentInfo: studentInfo,
            basicBills: basicBills,
            extrasBills: extrasBills,
        });
    }
}

const handleGetExtrasCosts = async (req, res) => {
    const messId = req.session.messId;
    const mealDate = req.body.mealDate;
    const mealTime = req.body.mealTime;
    let extras = [];
    if(mealTime == 'All') {
        extras = await extraItemsBillsTable.findGroupedExtraItemBillsForMessAndDate(messId, mealDate);
    } else {
        extras = await extraItemsBillsTable.findGroupedExtraItemBillsForMessDateAndTime(messId, mealDate, mealTime);
    }
    res.status(200).json(extras);
}

const handleGetMealsRecords = async (req, res) => {
    const messId = req.session.messId;
    const mealDate = req.body.mealDate;
    const mealTime = req.body.mealTime;
    const records = await basicMenuBillsTable.findRecordsForMeal(messId, mealDate, mealTime);
    res.status(200).json(records);
}

const handleGetExtrasRecords = async (req, res) => {
    const messId = req.session.messId;
    const mealDate = req.body.mealDate;
    const mealTime = req.body.mealTime;
    const records = await extraItemsBillsTable.findExtrasRecordsForMeal(messId, mealDate, mealTime);
    res.status(200).json(records);
}

export default {
    handleGetStudentBills,
    handleGetExtrasCosts,
    handleGetMealsRecords,
    handleGetExtrasRecords,
};
