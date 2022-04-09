import mealsTable from "../../db/meals.js";
import utils from "../utils.js";

const handleGetMessUpcomingMeals = async (req, res) => {
    const currentDate = utils.getCurrentDate();
    const meals = await mealsTable.findUpcomingMealsWithMessId(req.session.messId, currentDate);
    res.status(200).json(meals);
}

const handleAddMeals = async (req, res) => {
    const mealsData = [];
    const meals = req.body;
    for(let i = 0; i<meals.length; i++) {
        for(let j = 0; j<meals[i].dates.length; j++) {
            mealsData.push([
                meals[i].dates[j],
                req.session.messId,
                meals[i].menuId,
                meals[i].time,
            ]);
        }
    }
    const result = await mealsTable.insertMeals(mealsData);
    if (result) {
        res.status(200).json({
            message: "Added Meals Successfully",
        });
    } else {
        res.status(400).json({
            message: "Could not add Meals",
        });
    }
}

export default {
    handleGetMessUpcomingMeals,
    handleAddMeals,
};
