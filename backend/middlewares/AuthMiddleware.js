const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/ApiResponse");

exports.verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token){
        return apiResponse.forbiddenResponse(req, res, "JWT Token not found");
    }

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    }
    catch(err){
        return apiResponse.errorResponse(req, res, err.message);
    }

    return next();
}
