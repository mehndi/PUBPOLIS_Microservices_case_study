const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

const tokenVerify = (secretKey) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                    return res.json({message: "Token Not Found !", error: err});
                }
                else {
                    console.log(user);
                    req.user = user;
                    next();
                }
            });
        } else {
            res.status(500).json({message: "Token Not Found !"});
        }
    };
};

module.exports = tokenVerify;