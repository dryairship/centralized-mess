import utils from "../utils.js";
import extraItemsTable from "../../db/extra-items.js";
import extraItemsBillsTable from "../../db/extra-items-bills.js";

const handleGetMessExtras = async (req, res) => {
    const extraItems = await extraItemsTable.findExtraItemsWithMessId(req.session.messId);
    res.status(200).json(extraItems);
}

const handleGetExtrasRequests = async (req, res) => {
    const requests = await extraItemsBillsTable.findExtraItemsRequestWithMessId(
        req.session.messId, utils.dateToSQLString(new Date(2022, 3, 7)));
    res.status(200).json(requests);
}

export default {
    handleGetMessExtras,
    handleGetExtrasRequests,
};
