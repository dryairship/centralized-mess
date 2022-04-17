import mealsTable from "../../db/meals.js";
import extrasInMenuTable from "../../db/extras-in-menu.js";

const handleGetUpcomingMeals = async (req, res) => {
    const meals = await mealsTable.findAllUpcomingMeals(req.body.date, req.body.time);
    for (let i = 0; i < meals.length; i ++) {
        meals[i].extraItems = await extrasInMenuTable.findExtrasInMenuByMenuId(meals[i].menu_id);
    }
    res.status(200).json(meals);
}

const handleGetMealDetails = async (req, res) => {
    let meal = await mealsTable.findMealByMessDateTime(parseInt(req.body.messId), req.body.date, req.body.time);
    if (meal.length == 1) {
        meal = meal[0];
        meal.extraItems = await extrasInMenuTable.findExtrasInMenuByMenuId(meal.menu_id);
        res.status(200).json(meal);
    } else {
        res.status(400).json({
            message: "No meal found for this date & time in this mess",
        });
    }
}

export default {
    handleGetUpcomingMeals,
    handleGetMealDetails,
}
