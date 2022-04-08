import bcrypt from 'bcrypt';
import authDB from '../db/auth.js';

const handleManagerLogin = async (req, res) => {
    const pfNumber = req.body.pfNumber;
    const password = req.body.password;

    let result = await authDB.findManagerWithPFNumber(pfNumber);
    console.log(result);
    if (result.length != 1) {
        res.status(400).json({
            message: "Invalid PF Number",
        });
    } else {
        result = result[0];
        if (bcrypt.compareSync(password, result.password)) {
            const userData = {
                type: "Manager",
                pfNumber: result.pf_number,
                name: result.name,
                phoneNumber: result.phone_number,
                messId: result.mess_id,
                email: result.email,
            }
            req.session = userData;
            res.status(200).json(userData);
        } else {
            req.session = null;
            res.status(400).json({
                message: "Invalid password",
            });
        }
    }
}

export default {
    handleManagerLogin,
};
