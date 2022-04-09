import menusTable from "../../db/menus.js";
import extrasInMenuTable from "../../db/extras-in-menu.js";

const handleGetMessMenus = async (req, res) => {
    const menus = await menusTable.findMenusWithMessId(req.session.messId);
    res.status(200).json(menus);
}

const handleAddMenus = async (req, res) => {
    const menusData = req.body;
    const menusToInsert = menusData.map((menu) => [
        menu.menuName,
        req.session.messId,
        menu.menuTime, 
        menu.menuContent,
    ]);
    const insertId = await menusTable.insertMenus(menusToInsert);
    if (insertId != -1) {
        const extrasInMenu = [];
        for(let i = 0; i < menusData.length; i++) {
            for(let j = 0; j < menusData[i].extras.length; j++) {
                extrasInMenu.push([insertId+i, menusData[i].extras[j]]);
            }
        }
        const result = await extrasInMenuTable.insertExtrasInMenu(extrasInMenu);
        if (result) {
            res.status(200).json({
                message: "Added Menus Successfully",
            });
        } else {
            res.status(400).json({
                message: "Could not add menus",
            });
        }
    } else {
        res.status(400).json({
            message: "Could not add menus",
        });
    }
}

export default {
    handleGetMessMenus,
    handleAddMenus,
};
