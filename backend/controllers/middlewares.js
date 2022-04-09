const ensureManagerLoggedIn = (req, res, next) => {
    req.session = {
        type: 'Manager',
        pfNumber: '4011',
        name: 'Kip Leslie',
        phoneNumber: '+91 5103095279',
        messId: 1,
        email: 'Kip.Leslie39@iitk.ac.in'
    };
    next();
    /*
    if (req.session.type == "Manager") {
        next();
    } else {
        res.status(401).json({
            message: "User not logged in as manager",
        });
    }*/
}

const ensureStudentLoggedIn = (req, res, next) => {
    req.session = {
        type: 'Student',
        rollNumber: '180561',
        name: 'Priydarshi Singh',
        phoneNumber: '+91 5103095279',
        address: 'E-101, Hall 9',
        email: 'darshi@iitk.ac.in'
    };
    next();
    /*
    if (req.session.type == "Student") {
        next();
    } else {
        res.status(401).json({
            message: "User not logged in as student",
        });
    }*/
}

export default {
    ensureManagerLoggedIn,
    ensureStudentLoggedIn,
};
