import basicMenuBillsTable from "../../db/basic-menu-bills.js";
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

const handleGetMessCompletedMeals = async (req, res) => {
    const currentDate = utils.getCurrentDate();
    const meals = await mealsTable.findCompletedMealsWithMessId(req.session.messId, currentDate);
    res.status(200).json(meals);
}

const handleAddMealCost = async (req, res) => {
    const messId = req.session.messId;
    const mealDate = req.body.mealDate;
    const mealTime = req.body.mealTime;
    const totalCost = req.body.totalCost;
    let count = await basicMenuBillsTable.countStudentsForMeal(messId, mealDate, mealTime);
    if (count.length != 1) {
        res.status(400).json({
            message: "Meal not found"
        });
    } else {
        count = count[0].cnt;
        const avgCost = totalCost / count;
        const result1 = await mealsTable.addTotalMealCost(messId, mealDate, mealTime, totalCost);
        if(result1) {
            const result2 = await basicMenuBillsTable.addAverageMealCost(messId, mealDate, mealTime, avgCost);
            if(result2) {
                res.status(200).json({
                    message: "Meal cost added successfully"
                });
            } else {
                res.status(400).json({
                    message: "Could not add average meal cost"
                });
            }
        } else {
            res.status(200).json({
                message: "Could not add total meal cost"
            });
        }
    }
    
}

export default {
    handleGetMessUpcomingMeals,
    handleAddMeals,
    handleGetMessCompletedMeals,
    handleAddMealCost,
};
