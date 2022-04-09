import menusTable from "../../db/menus.js";

const handleGetMessMenus = async (req, res) => {
    const menus = await menusTable.findMenusWithMessId(req.session.messId);
    res.status(200).json(menus);
}

export default {
    handleGetMessMenus,
};
