require("dotenv").config();
const bcrypt = require('bcrypt');
const UserModel = require("../models/UserModel");
const apiResponse = require("../helpers/ApiResponse");

exports.register = async (req, res)=>{
    try{
        const {email, password, mobile} = req.body;
        let user = await UserModel.findOne({email:email, mobile:mobile});

        if(user){
            return apiResponse.errorResponse(req, res, "User already exists");
        }
        else{
            user = new UserModel({
                email,
                password,
                mobile
            })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();
            return apiResponse.successResponseWithData(req, res, "User Created", user);
        }
    }
    catch(err){
        console.log("Error while registering User: "+ err.message);
        return apiResponse.errorResponse(req, res, err.message);
    }
}

exports.login = async (req, res)=>{
    try{
        const {email, mobile, password} = req.body;

        let whereClause = {};

        if(email){
            whereClause.email = email;
        }
        else if(mobile){
            whereClause.mobile = mobile;
        }

        const user = UserModel.findOne({where: whereClause});
        
        if(!user){
            return apiResponse.errorResponse(req, res, "User not found");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return apiResponse.errorResponse(req, res, "Incorrect Password");
        }

        return apiResponse.successResponse(req, res, "Valid User");
    }
    catch(err){
        console.log("Error while loginin the user: "+err.message);

        return apiResponse.errorResponse(req, res, err.message);
    }
}
