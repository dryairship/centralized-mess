import extraItemsBillsTable from "../../db/extra-items-bills.js";
import extraItemsTable from "../../db/extra-items.js";

const handleGetUnclaimedExtras = async (req, res) => {
    const rollNumber = req.session.rollNumber;
    const unclaimedExtras = await extraItemsBillsTable.findExtraItemsBillsForStudent(rollNumber);
    res.status(200).json(unclaimedExtras);
}

const handleGetUnclaimedExtrasForMess = async (req, res) => {
    const rollNumber = req.session.rollNumber;
    const messId = req.body.messId;
    const unclaimedExtras = await extraItemsBillsTable.findUnclaimedExtraItemsForStudentAndMess(rollNumber, messId);
    res.status(200).json(unclaimedExtras);
}

const handlePurchaseExtraItems = async (req, res) => {
    const timeId = new Date().getTime();
    const rollNumber = req.session.rollNumber;
    const messId = req.body.messId;
    const mealDate = req.body.mealDate;
    const mealTime = req.body.mealTime;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;
    const claimed = false;
    const item = await extraItemsTable.findExtraItemWithMessAndItemId(messId, itemId);
    if(item.length != 1) {
        res.status(400).json({
            message: "Item not found",
        });
    } else {
        const cost = item[0].cost_per_item * quantity;
        const result = await extraItemsBillsTable.insertExtraItemBill(
            timeId, rollNumber, messId, mealDate, mealTime, itemId, quantity, claimed, cost);
        if (result) {
            res.status(200).json({
                message: "Purchased Extra Item successfully",
            });
        } else {
            res.status(400).json({
                message: "Could not purchase item",
            });
        }
    }
}

const handleDeleteUnclaimedExtraItem = async (req, res) => {
    const timeId = req.body.timeId;
    let bill = await extraItemsBillsTable.findExtraItemBillByTimeId(timeId);
    if(bill.length != 1) {
        res.status(400).json({
            message: "Item not found",
        });
    } else {
        bill = bill[0];
        if (bill.roll_number != req.session.rollNumber) {
            res.status(400).json({
                message: "User unauthorized to delete this item",
            });
        } else if (bill.claimed) {
            res.status(400).json({
                message: "User has claimed this item",
            });
        } else {
            const result = await extraItemsBillsTable.deleteExtraItemBill(timeId);
            if (result) {
                res.status(200).json({
                    message: "Deleted Request successfully",
                });
            } else {
                res.status(400).json({
                    message: "Could not delete item",
                });
            }
        }
    }
}

export default {
    handleGetUnclaimedExtras,
    handleGetUnclaimedExtrasForMess,
    handlePurchaseExtraItems,
    handleDeleteUnclaimedExtraItem,
};
