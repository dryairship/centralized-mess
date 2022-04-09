import extraItemsTable from "../../db/extra-items.js";

const handleGetMessExtras = async (req, res) => {
    const extraItems = await extraItemsTable.findExtraItemsWithMessId(req.session.messId);
    res.status(200).json(extraItems);
}

export default {
    handleGetMessExtras,
};
