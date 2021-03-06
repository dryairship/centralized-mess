import utils from "../utils.js";
import extraItemsTable from "../../db/extra-items.js";
import extraItemsBillsTable from "../../db/extra-items-bills.js";

const handleGetMessExtras = async (req, res) => {
    const extraItems = await extraItemsTable.findExtraItemsWithMessId(req.session.messId);
    res.status(200).json(extraItems);
}

const handleGetExtrasRequests = async (req, res) => {
    const requests = await extraItemsBillsTable.findExtraItemsRequestWithMessId(req.session.messId);
    res.status(200).json(requests);
}

const handleAddExtraItem = async (req, res) => {
    const messId = req.session.messId;
    const itemName = req.body.itemName;
    const costPerItem = req.body.costPerItem;
    const result = await extraItemsTable.insertExtraItem(messId, itemName, costPerItem);
    if (result) {
        res.status(200).json({
            message: "Inserted Item successfully",
        });
    } else {
        res.status(400).json({
            message: "Could not insert item",
        });
    }
}

const handleDeleteExtraItem = async (req, res) => {
    const messId = req.session.messId;
    const itemId = req.body.itemId;
    const result = await extraItemsTable.deleteExtraItem(messId, itemId);
    if (result) {
        res.status(200).json({
            message: "Deleted item successfully",
        });
    } else {
        res.status(400).json({
            message: "Could not delete item",
        });
    }
}

const handleMarkExtraRequestClaimed = async (req, res) => {
    const messId = req.session.messId;
    const timeId = req.body.timeId;
    const result = await extraItemsBillsTable.markRequestClaimed(messId, timeId);
    if (result) {
        res.status(200).json({
            message: "Marked request successfully",
        });
    } else {
        res.status(400).json({
            message: "Could not mark request as claimed",
        });
    }
}

export default {
    handleGetMessExtras,
    handleGetExtrasRequests,
    handleAddExtraItem,
    handleDeleteExtraItem,
    handleMarkExtraRequestClaimed,
};
