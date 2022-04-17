const ensureManagerLoggedIn = (req, res, next) => {
    if (req.session.type == "Manager") {
        next();
    } else {
        res.status(401).json({
            message: "User not logged in as manager",
        });
    }
}

const ensureStudentLoggedIn = (req, res, next) => {
    if (req.session.type == "Student") {
        next();
    } else {
        res.status(401).json({
            message: "User not logged in as student",
        });
    }
}

export default {
    ensureManagerLoggedIn,
    ensureStudentLoggedIn,
};
