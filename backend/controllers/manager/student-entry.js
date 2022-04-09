import basicMenuBillsTable from "../../db/basic-menu-bills.js";
import studentsTable from "../../db/students.js";
import utils from "../utils.js";

const handleGetStudentInfo = async (req, res) => {
    const rollNumber = req.body.rollNumber;
    const result = await studentsTable.findStudentWithRollNumber(rollNumber);
    if (result.length != 1) {
        res.status(404).json({
            message: "Student Not Found",
        });
    } else {
        res.status(200).json({
            rollNumber: result[0].roll_number,
            name: result[0].name,
            phoneNumber: result[0].phone_number,
            address: result[0].address,
            email: result[0].email,
        });
    }
}

const handleAddStudentEntry = async (req, res) => {
    const rollNumber = req.body.rollNumber;
    const currentMealTime = utils.getCurrentMealTime();

    if (!currentMealTime) {
        res.status(400).json({
            message: "Mess is currently closed",
        });
    } else {
        const result = await basicMenuBillsTable.insertBill(
            new Date().getTime(),
            rollNumber,
            req.session.messId,
            utils.getCurrentDate(),
            currentMealTime,
        );
        if (result) {
            res.status(200).json({
                message: "Added Student Entry Successfully",
            });
        } else {
            res.status(400).json({
                message: "Could not add student entry",
            });
        }
    }
}

export default {
    handleGetStudentInfo,
    handleAddStudentEntry,
}
