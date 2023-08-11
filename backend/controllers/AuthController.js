require("dotenv").config();
const bcrypt = require('bcrypt');
const UserModel = require("../models/UserModel");
const apiResponse = require("../helpers/ApiResponse");
const jwt = require("jsonwebtoken");

exports.register = async (req, res)=>{
    try{
        const {password, mobile} = req.body;
        let user = await UserModel.findOne({mobile:mobile});
        if(user){
            return apiResponse.errorResponse(req, res, "User already exists");
        }
        else{
            user = new UserModel({
                password,
                mobile
            })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            const token = jwt.sign(
                { user_id: user._id, mobile },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
            );

            user.token = token;

            await user.save();
            
            return apiResponse.successResponseWithData(req, res, "User Created", user);
        }
    }
    catch(err){
        console.log("Error while registering User: "+ err);
        return apiResponse.errorResponse(req, res, err.message);
    }
}

exports.login = async (req, res)=>{
    try{
        const {mobile, password} = req.body;

        const user = await UserModel.findOne({mobile:mobile});
        
        if(!user){
            return apiResponse.errorResponse(req, res, "User not found");
        }
        
        console.log("Password from login body: ", password);

        console.log("Password from User Model: ", mobile);
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return apiResponse.errorResponse(req, res, "Incorrect Password");
        }

        const token = jwt.sign(
            { user_id: user._id, mobile },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
        );

        user.token = token;

        await user.save();


        return apiResponse.successResponseWithData(req, res, "Valid User", user);
    }
    catch(err){
        console.log("Error while loginin the user: "+err);

        return apiResponse.errorResponse(req, res, err.message);
    }
}
